
const Core = {
    basicInterval: parseInt(localStorage.getItem('basicInterval')) || CONFIG.BASIC_INTERVAL,
    operationInterval: parseInt(localStorage.getItem('operationInterval')) || CONFIG.OPERATION_INTERVAL,
    messageObserver: null,
    lastProcessedMessage: null,
    processingMessage: false,

    async startProcessing() {
        // 如果是在岗位列表页面，先自动滚动加载所有岗位
        if (location.pathname.includes('/jobs')) await this.autoScrollJobList();

        while (state.isRunning) {
            // 如果是在岗位列表页面，一个一个点击岗位列表中的岗位卡片
            if (location.pathname.includes('/jobs')) await this.processJobList();
            // 如果是在聊天页面，处理最顶部的聊天
            else if (location.pathname.includes('/chat')) await this.handleChatPage();
            await this.delay(this.basicInterval);
        }
    },

    async autoScrollJobList() {
        // 自动滚动加载所有岗位卡片，直到页面底部
        return new Promise((resolve) => {
            const cardSelector = 'li.job-card-box';
            const maxHistory = 3;
            const waitTime = this.basicInterval;
            let cardCountHistory = [];
            let isStopped = false;

            const scrollStep = async () => {
                if (isStopped) return;

                window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
                await this.delay(waitTime);

                const cards = document.querySelectorAll(cardSelector);
                const currentCount = cards.length;
                cardCountHistory.push(currentCount);

                if (cardCountHistory.length > maxHistory) cardCountHistory.shift();

                if (cardCountHistory.length === maxHistory && new Set(cardCountHistory).size === 1) {
                    this.log("当前页面岗位加载完成，开始沟通");
                    resolve(cards);
                    return;
                }

                scrollStep();
            };

            scrollStep();

            this.stopAutoScroll = () => {
                isStopped = true;
                resolve(null);
            };
        });
    },

    async processJobList() {
        // 点击岗位列表中的岗位卡片, operationInterval控制点击卡片的时间间隔
        const excludeHeadhunters = JSON.parse(localStorage.getItem('excludeHeadhunters') || 'false');
        const activeStatusFilter = JSON.parse(localStorage.getItem('recruiterActivityStatus') || '["不限"]');

        // 使用新的包含关键词筛选逻辑
        state.jobList = Array.from(document.querySelectorAll('li.job-card-box')).filter(card => {
            const title = card.querySelector('.job-name')?.textContent?.toLowerCase() || '';
            // 优先从卡片内取地址，兜底从常见位置类名取
            const addressText = (
                card.querySelector('.job-address-desc')?.textContent ||
                card.querySelector('.company-location')?.textContent ||
                card.querySelector('.job-area')?.textContent ||
                ''
            ).toLowerCase().trim();
            const headhuntingElement = card.querySelector('.job-tag-icon');
            const altText = headhuntingElement ? headhuntingElement.alt : '';

            // 职位名包含（空数组表示不限制）
            const includeMatch = state.includeKeywords.length === 0 ||
                state.includeKeywords.some(kw => kw && title.includes(kw.trim()));

            // 工作地包含（空数组表示不限制）
            const locationMatch = state.locationKeywords.length === 0 ||
                state.locationKeywords.some(kw => kw && addressText.includes(kw.trim()));

            const excludeHeadhunterMatch = !excludeHeadhunters || !altText.includes("猎头");

            return includeMatch && locationMatch && excludeHeadhunterMatch;
        });

        if (!state.jobList.length) {
            this.log('没有符合条件的职位');
            toggleProcess();
            return;
        }

        if (state.currentIndex >= state.jobList.length) {
            this.resetCycle();
            return;
        }

        const currentCard = state.jobList[state.currentIndex];
        currentCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        currentCard.click();

        await this.delay(this.operationInterval * 2);

        let activeTime = '未知';
        const onlineTag = document.querySelector('.boss-online-tag');
        if (onlineTag && onlineTag.textContent.trim() === '在线') {
            activeTime = '在线';
        } else {
            const activeTimeElement = document.querySelector('.boss-active-time');
            activeTime = activeTimeElement?.textContent?.trim() || '未知';
        }

        const isActiveStatusMatch = activeStatusFilter.includes('不限') || activeStatusFilter.includes(activeTime);

        if (!isActiveStatusMatch) {
            this.log(`跳过: 招聘者状态 "${activeTime}"`);
            state.currentIndex++;
            return;
        }

        const includeLog = state.includeKeywords.length ? `职位名包含[${state.includeKeywords.join('、')}]` : '职位名不限';
        const locationLog = state.locationKeywords.length ? `工作地包含[${state.locationKeywords.join('、')}]` : '工作地不限';
        this.log(`正在沟通：${++state.currentIndex}/${state.jobList.length}，${includeLog}，${locationLog}，招聘者"${activeTime}"`);

        const chatBtn = document.querySelector('a.op-btn-chat');
        if (chatBtn) {
            const btnText = chatBtn.textContent.trim();
            if (btnText === '立即沟通') {
                chatBtn.click();
                await this.handleGreetingModal();
            }
        }
    },

    async handleGreetingModal() {
        await this.delay(this.operationInterval * 4);

        const btn = [...document.querySelectorAll('.default-btn.cancel-btn')]
            .find(b => b.textContent.trim() === '留在此页');

        if (btn) {
            btn.click();
            await this.delay(this.operationInterval * 2);
        }
    },

    async handleChatPage() {
        this.resetMessageState();

        if (this.messageObserver) {
            this.messageObserver.disconnect();
            this.messageObserver = null;
        }

        const latestChatLi = await this.waitForElement(this.getLatestChatLi);
        if (!latestChatLi) return;

        const nameEl = latestChatLi.querySelector('.name-text');
        const companyEl = latestChatLi.querySelector('.name-box span:nth-child(2)');
        const name = (nameEl?.textContent || '未知').trim();
        const company = (companyEl?.textContent || '').trim();
        const hrKey = `${name}-${company}`.toLowerCase();

        if (!latestChatLi.classList.contains('last-clicked')) {
            await this.simulateClick(latestChatLi.querySelector('.figure'));
            latestChatLi.classList.add('last-clicked');
            state.hrInteractions.currentTopHRKey = hrKey;

            await this.delay(this.operationInterval);
            await HRInteractionManager.handleHRInteraction(hrKey);
        }

        await this.setupMessageObserver(hrKey);
    },

    resetMessageState() {
        this.lastProcessedMessage = null;
        this.processingMessage = false;
    },

    async setupMessageObserver(hrKey) {
        const chatContainer = await this.waitForElement('.chat-message .im-list');
        if (!chatContainer) return;

        this.messageObserver = new MutationObserver(async (mutations) => {
            let hasNewFriendMessage = false;
            for (const mutation of mutations) {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    hasNewFriendMessage = Array.from(mutation.addedNodes).some(node =>
                        node.classList?.contains('item-friend')
                    );
                    if (hasNewFriendMessage) break;
                }
            }

            if (hasNewFriendMessage) {
                await this.handleNewMessage(hrKey);
            }
        });

        this.messageObserver.observe(chatContainer, { childList: true, subtree: true });
    },

    async handleNewMessage(hrKey) {
        if (!state.isRunning) return;

        // 如果处于特定模式且不是AI回复模式，不处理新消息
        if (state.chatMode && state.chatMode !== 'AI_REPLY') return;

        if (this.processingMessage) return;

        this.processingMessage = true;

        try {
            await this.delay(this.operationInterval);

            const lastMessage = await this.getLastFriendMessageText();
            if (!lastMessage) return;

            const cleanedMessage = this.cleanMessage(lastMessage);
            const shouldSendResumeOnly = cleanedMessage.includes('简历');

            if (cleanedMessage === this.lastProcessedMessage) return;

            this.lastProcessedMessage = cleanedMessage;
            this.log(`对方: ${lastMessage}`);

            await this.delay(200);
            const updatedMessage = await this.getLastFriendMessageText();
            if (updatedMessage && this.cleanMessage(updatedMessage) !== cleanedMessage) {
                await this.handleNewMessage(hrKey);
                return;
            }

            const autoSendResume = JSON.parse(localStorage.getItem('useAutoSendResume') || 'true');
            const autoReplyEnabled = JSON.parse(localStorage.getItem('autoReply') || 'true');

            if (shouldSendResumeOnly && autoSendResume) {
                this.log('对方提到"简历"，正在发送简历');
                const sent = await HRInteractionManager.sendResume();
                if (sent) {
                    state.hrInteractions.sentResumeHRs.add(hrKey);
                    StatePersistence.saveState();
                    this.log(`已向 ${hrKey} 发送简历`);
                }
            } else if (autoReplyEnabled) {
                await HRInteractionManager.handleHRInteraction(hrKey);
            }

            await this.delay(200);
            const postReplyMessage = await this.getLastFriendMessageText();
        } catch (error) {
            this.log(`处理消息出错: ${error.message}`);
        } finally {
            this.processingMessage = false;
        }
    },

    cleanMessage(message) {
        if (!message) return '';

        let clean = message.replace(/<[^>]*>/g, '');
        clean = clean.trim().replace(/\s+/g, ' ').replace(/[\u200B-\u200D\uFEFF]/g, '');
        return clean;
    },

    getLatestChatLi() {
        return document.querySelector('li[role="listitem"][class]:has(.friend-content-warp)');
    },

    async aiReply() {
        if (!state.isRunning) return;
        try {
            const autoReplyEnabled = JSON.parse(localStorage.getItem('autoReply') || 'true');
            if (!autoReplyEnabled) {
                return false;
            }

            if (!state.ai.useAiReply) {
                return false;
            }

            const lastMessage = await this.getLastFriendMessageText();
            if (!lastMessage) return false;

            const today = new Date().toISOString().split('T')[0];
            if (state.ai.lastAiDate !== today) {
                state.ai.replyCount = 0;
                state.ai.lastAiDate = today;
                StatePersistence.saveState();
            }

            const maxReplies = state.user.isPremiumUser ? CONFIG.AI.MAX_REPLIES_PREMIUM : CONFIG.AI.MAX_REPLIES_FREE;
            if (state.ai.replyCount >= maxReplies) {
                this.log(`AI回复已达上限，充值即可继续使用`);
                return false;
            }

            const aiReplyText = await this.requestAi(lastMessage);
            if (!aiReplyText) return false;

            this.log(`AI回复: ${aiReplyText.slice(0, 30)}...`);
            state.ai.replyCount++;
            StatePersistence.saveState();

            const inputBox = await this.waitForElement('#chat-input');
            if (!inputBox) return false;

            inputBox.textContent = '';
            inputBox.focus();
            document.execCommand('insertText', false, aiReplyText);
            await this.delay(this.operationInterval / 10);

            const sendButton = document.querySelector('.btn-send');
            if (sendButton) {
                await this.simulateClick(sendButton);
            } else {
                const enterKeyEvent = new KeyboardEvent('keydown', {
                    key: 'Enter', keyCode: 13, code: 'Enter', which: 13, bubbles: true
                });
                inputBox.dispatchEvent(enterKeyEvent);
            }

            return true;
        } catch (error) {
            this.log(`AI回复出错: ${error.message}`);
            return false;
        }
    },

    async requestAi(message) {
        const authToken = (function () {
            const c = [0x73, 0x64, 0x56, 0x45, 0x44, 0x41, 0x42, 0x6a, 0x5a, 0x65, 0x49, 0x6b, 0x77,
                0x58, 0x4e, 0x42, 0x46, 0x4e, 0x42, 0x73, 0x3a, 0x43, 0x71, 0x4d, 0x58, 0x6a,
                0x71, 0x65, 0x50, 0x56, 0x43, 0x4a, 0x62, 0x55, 0x59, 0x4a, 0x50, 0x63, 0x69, 0x70, 0x4a
            ];
            return c.map(d => String.fromCharCode(d)).join('');
        })();

        const apiUrl = (function () {
            const e = '68747470733a2f2f737061726b2d6170692d6f70656e2e78662d79756e2e636f6d2f76312f636861742f636f6d706c6574696f6e73';
            return e.replace(/../g, f => String.fromCharCode(parseInt(f, 16)));
        })();

        const requestBody = {
            model: 'lite',
            messages: [
                { role: 'system', content: localStorage.getItem('aiRole') || '你是有经验的求职者，你会用口语化的表达（如“行”、“呃”）和语气词（如“啊”、“吗”）使对话自然。你回复对方很肯定且言简意赅，不会发送段落和长句子。' },
                { role: 'user', content: message }
            ],
            temperature: 0.9, top_p: 0.8, max_tokens: 512
        };

        return new Promise((resolve, reject) => {
            GM_xmlhttpRequest({
                method: 'POST', url: apiUrl,
                headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + authToken },
                data: JSON.stringify(requestBody),
                onload: (response) => {
                    try {
                        const result = JSON.parse(response.responseText);
                        if (result.code !== 0) throw new Error('API错误: ' + result.message + '（Code: ' + result.code + '）');
                        resolve(result.choices[0].message.content.trim());
                    } catch (error) {
                        reject(new Error('响应解析失败: ' + error.message + '\n原始响应: ' + response.responseText));
                    }
                },
                onerror: (error) => reject(new Error('网络请求失败: ' + error))
            });
        });
    },

    async getLastFriendMessageText() {
        try {
            const chatContainer = document.querySelector('.chat-message .im-list');
            if (!chatContainer) return null;

            const friendMessages = Array.from(chatContainer.querySelectorAll('li.message-item.item-friend'));
            if (friendMessages.length === 0) return null;

            const lastMessageEl = friendMessages[friendMessages.length - 1];
            const textEl = lastMessageEl.querySelector('.text span');
            return textEl?.textContent?.trim() || null;
        } catch (error) {
            this.log(`获取消息出错: ${error.message}`);
            return null;
        }
    },

    async simulateClick(element) {
        if (!element) return;

        const rect = element.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;

        const dispatchMouseEvent = (type, options = {}) => {
            const event = new MouseEvent(type, {
                bubbles: true, cancelable: true, view: document.defaultView, clientX: x, clientY: y, ...options
            });
            element.dispatchEvent(event);
        };

        dispatchMouseEvent('mouseover'); await this.delay(30);
        dispatchMouseEvent('mousemove'); await this.delay(30);
        dispatchMouseEvent('mousedown', { button: 0 }); await this.delay(30);
        dispatchMouseEvent('mouseup', { button: 0 }); await this.delay(30);
        dispatchMouseEvent('click', { button: 0 });
    },

    async waitForElement(selectorOrFunction, timeout = 5000) {
        return new Promise((resolve) => {
            let element;
            if (typeof selectorOrFunction === 'function') element = selectorOrFunction();
            else element = document.querySelector(selectorOrFunction);

            if (element) return resolve(element);

            const timeoutId = setTimeout(() => { observer.disconnect(); resolve(null); }, timeout);
            const observer = new MutationObserver(() => {
                if (typeof selectorOrFunction === 'function') element = selectorOrFunction();
                else element = document.querySelector(selectorOrFunction);
                if (element) { clearTimeout(timeoutId); observer.disconnect(); resolve(element); }
            });
            observer.observe(document.body, { childList: true, subtree: true });
        });
    },

    async delay(ms) { return new Promise(resolve => setTimeout(resolve, ms)); },

    resetCycle() {
        toggleProcess();
        this.log('所有岗位沟通完成，恭喜您即将找到理想工作！');
        state.currentIndex = 0;
        state.operation.lastMessageTime = 0;
    },

    log(message) {
        const logEntry = `[${new Date().toLocaleTimeString()}] ${message}`;
        const logPanel = document.querySelector('#pro-log');
        if (logPanel) {
            const logItem = document.createElement('div');
            logItem.className = 'log-item';
            logItem.textContent = logEntry;
            logPanel.appendChild(logItem);
            logPanel.scrollTop = logPanel.scrollHeight;
        }
    }
};


window.Core = Core;