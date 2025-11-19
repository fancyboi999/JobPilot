// 状态管理
const state = {
    // 运行状态
    isRunning: false,
    chatMode: null, // 'GREETINGS', 'IMAGE_RESUME', 'AI_REPLY'
    currentIndex: 0,

    // 筛选条件 - 职位名/工作地关键词
    includeKeywords: [],  // 职位名包含关键词
    locationKeywords: [], // 工作地包含关键词

    // 数据缓存
    jobList: [],

    // UI 状态
    ui: {
        isMinimized: false,
        theme: localStorage.getItem('theme') || 'light',
        showWelcomeMessage: JSON.parse(localStorage.getItem('showWelcomeMessage') || 'true')
    },

    // HR交互状态
    hrInteractions: {
        processedHRs: new Set(JSON.parse(localStorage.getItem('processedHRs') || '[]')),
        currentTopHRKey: null,
        sentGreetingsHRs: new Set(JSON.parse(localStorage.getItem('sentGreetingsHRs') || '[]')),
        sentResumeHRs: new Set(JSON.parse(localStorage.getItem('sentResumeHRs') || '[]')),
        sentImageResumeHRs: new Set(JSON.parse(localStorage.getItem('sentImageResumeHRs') || '[]')) // 已发送图片简历的HR
    },

    // AI 功能
    ai: {
        replyCount: JSON.parse(localStorage.getItem('aiReplyCount') || '0'),
        lastAiDate: localStorage.getItem('lastAiDate') || '',
        useAiReply: true
    },

    // 操作记录
    operation: {
        lastMessageTime: 0,
        processedJobsCount: 0,
        lastProcessedDate: localStorage.getItem('lastProcessedDate') || '',
        dailyJobLimit: 50
    },

    // 用户权限
    user: {
        isPremiumUser: localStorage.getItem('isPremiumUser') === 'true'
    },

    // 应用设置
    settings: {
        useAutoSendResume: JSON.parse(localStorage.getItem('useAutoSendResume') || 'true'),
        useAutoSendImageResume: JSON.parse(localStorage.getItem('useAutoSendImageResume') || 'false'), // 自动发送图片简历
        imageResumes: JSON.parse(localStorage.getItem('imageResumes') || '[]'), // 图片简历数组，最多3个，格式：[{path: 'xxx.jpg', data: 'base64data'}]
        autoScrollSpeed: parseInt(localStorage.getItem('autoScrollSpeed') || '500'),
        customPhrases: JSON.parse(localStorage.getItem('customPhrases') || '[]'),
        actionDelays: {
            click: parseInt(localStorage.getItem('clickDelay') || '130'),  // 发送常用语的速度
        },
        notifications: {
            enabled: JSON.parse(localStorage.getItem('notificationsEnabled') || 'true'),
            sound: JSON.parse(localStorage.getItem('notificationSound') || 'true')
        }
    }
};

// DOM 元素引用 - 更新为新的输入框引用
const elements = {
    panel: null,
    controlBtn: null,
    log: null,
    includeInput: null,   // 职位名包含输入框
    locationInput: null,  // 工作地包含输入框
    miniIcon: null,
    aiRoleInput: null,
    themeToggle: null,
    settingsPanel: null,
    greetingsBtn: null,
    resumeBtn: null,
    aiBtn: null
};

// 状态持久化工具类
class StatePersistence {
    /**
     * 保存所有状态到localStorage
     */
    static saveState() {
        // 保存HR交互状态
        localStorage.setItem('processedHRs', JSON.stringify([...state.hrInteractions.processedHRs]));
        localStorage.setItem('sentGreetingsHRs', JSON.stringify([...state.hrInteractions.sentGreetingsHRs]));
        localStorage.setItem('sentResumeHRs', JSON.stringify([...state.hrInteractions.sentResumeHRs]));
        localStorage.setItem('sentImageResumeHRs', JSON.stringify([...state.hrInteractions.sentImageResumeHRs]));

        // 保存AI状态
        localStorage.setItem('aiReplyCount', state.ai.replyCount);
        localStorage.setItem('lastAiDate', state.ai.lastAiDate);

        // 保存操作记录
        localStorage.setItem('lastProcessedDate', state.operation.lastProcessedDate);

        // 保存用户设置
        localStorage.setItem('showWelcomeMessage', state.ui.showWelcomeMessage);
        localStorage.setItem('isPremiumUser', state.user.isPremiumUser);
        localStorage.setItem('useAiReply', state.ai.useAiReply);
        localStorage.setItem('useAutoSendResume', state.settings.useAutoSendResume);
        localStorage.setItem('useAutoSendImageResume', state.settings.useAutoSendImageResume);

        // 更新：保存多图片简历数据，单独存储以处理大型Base64数据
        if (state.settings.imageResumes && Array.isArray(state.settings.imageResumes)) {
            // 过滤无效数据并限制最多3个
            const validResumes = state.settings.imageResumes
                .filter(resume => resume && typeof resume === 'object' && resume.path && resume.data)
                .slice(0, 3);
            localStorage.setItem('imageResumes', JSON.stringify(validResumes));
        }

        // 清理旧的单图片简历数据
        localStorage.removeItem('imageResumePath');
        localStorage.removeItem('imageResumeData');

        localStorage.setItem('autoScrollSpeed', state.settings.autoScrollSpeed);
        localStorage.setItem('customPhrases', JSON.stringify(state.settings.customPhrases));

        // 保存UI设置
        localStorage.setItem('theme', state.ui.theme);

        // 保存操作延迟
        localStorage.setItem('clickDelay', state.settings.actionDelays.click);

        // 保存通知设置
        localStorage.setItem('notificationsEnabled', state.settings.notifications.enabled);
        localStorage.setItem('notificationSound', state.settings.notifications.sound);

        // 新增：保存筛选条件
        localStorage.setItem('includeKeywords', JSON.stringify(state.includeKeywords));
        localStorage.setItem('locationKeywords', JSON.stringify(state.locationKeywords));
    }

    /**
     * 从localStorage加载状态
     */
    static loadState() {
        // 初始化加载已在 state 对象定义中完成

        // 加载筛选条件（兼容旧版 excludeKeywords -> 迁移为 locationKeywords）
        const includeKeywords = JSON.parse(localStorage.getItem('includeKeywords') || '[]');
        const locationKeywords = JSON.parse(
            localStorage.getItem('locationKeywords') ||
            localStorage.getItem('excludeKeywords') || '[]'
        );

        if (Array.isArray(includeKeywords)) state.includeKeywords = includeKeywords;
        if (Array.isArray(locationKeywords)) state.locationKeywords = locationKeywords;

        // 执行图片简历数据迁移
        this.migrateImageResumeData();
    }

    /**
     * 迁移旧版的单个图片简历数据到新版的多图片简历数组
     */
    static migrateImageResumeData() {
        try {
            // 检查是否有旧版数据且新版数据为空
            const hasOldData = localStorage.getItem('imageResumePath') || localStorage.getItem('imageResumeData');
            const imageResumesStr = localStorage.getItem('imageResumes');
            let hasNewData = false;

            if (imageResumesStr) {
                try {
                    const imageResumes = JSON.parse(imageResumesStr);
                    hasNewData = Array.isArray(imageResumes) && imageResumes.length > 0;
                } catch (e) {
                    // 解析失败，视为无新数据
                }
            }

            // 如果有旧数据且无新数据，执行迁移
            if (hasOldData && !hasNewData) {
                console.log('执行图片简历数据迁移...');

                const oldResume = {
                    path: localStorage.getItem('imageResumePath') || 'legacy_resume.jpg',
                    data: localStorage.getItem('imageResumeData')
                };

                // 只有在有数据的情况下才迁移
                if (oldResume.data) {
                    state.settings.imageResumes = [oldResume];
                    localStorage.setItem('imageResumes', JSON.stringify(state.settings.imageResumes));
                    console.log('图片简历数据迁移完成');
                }

                // 清理旧数据
                localStorage.removeItem('imageResumePath');
                localStorage.removeItem('imageResumeData');
            }
        } catch (error) {
            console.error('图片简历数据迁移失败:', error);
        }
    }
}

// HR交互管理类
class HRInteractionManager {
    /**
     * 根据HR状态执行相应操作
     * @param {string} hrKey - HR标识（如："姓名-公司名"）
     */
    static async handleHRInteraction(hrKey) {
        // 根据当前模式执行特定操作
        if (state.chatMode === 'GREETINGS') {
            if (!state.hrInteractions.sentGreetingsHRs.has(hrKey)) {
                Core.log(`正在发送常用语: ${hrKey}`);
                const sent = await this.sendGreetings();
                if (sent) {
                    state.hrInteractions.sentGreetingsHRs.add(hrKey);
                    StatePersistence.saveState();
                    Core.log(`常用语发送成功`);
                }
            } else {
                Core.log(`已发送过常用语，跳过`);
            }
            return;
        }

        if (state.chatMode === 'IMAGE_RESUME') {
            if (!state.hrInteractions.sentImageResumeHRs.has(hrKey)) {
                Core.log(`正在发送图片简历: ${hrKey}`);
                const sentImageResume = await this.sendImageResume();
                if (sentImageResume) {
                    state.hrInteractions.sentImageResumeHRs.add(hrKey);
                    StatePersistence.saveState();
                    Core.log(`图片简历发送成功`);
                }
            } else {
                Core.log(`已发送过图片简历，跳过`);
            }
            return;
        }

        if (state.chatMode === 'AI_REPLY') {
            Core.log(`正在进行AI回复: ${hrKey}`);
            await Core.aiReply();
            return;
        }

        // 原有的智能逻辑（如果chatMode为null或SMART，虽然现在UI上没有入口了，但保留逻辑以防万一）
        // ... (保留原有逻辑或直接返回)
        // 由于用户明确要求拆分，且UI已更改，这里可以简化或保留作为兜底

        // 检查HR是否已发送消息
        const hasResponded = await this.hasHRResponded();

        // ... (原有逻辑)
        if (!state.hrInteractions.sentGreetingsHRs.has(hrKey)) {
            // ...
            return;
        }
        // ...
    }

    /**
     * 检查HR是否已回复消息
     */
    static async hasHRResponded() {
        await Core.delay(state.settings.actionDelays.click);

        const chatContainer = document.querySelector('.chat-message .im-list');
        if (!chatContainer) return false;

        const friendMessages = Array.from(chatContainer.querySelectorAll('li.message-item.item-friend'));
        return friendMessages.length > 0;
    }

    /**
     * 发送常用语
     */
    static async sendGreetings() {
        try {
            // await Core.delay(state.settings.actionDelays.click);

            // 点击“常用语”按钮
            const dictBtn = await Core.waitForElement('.btn-dict');
            if (!dictBtn) {
                Core.log('未找到常用语按钮');
                return false;
            }
            await Core.simulateClick(dictBtn);
            await Core.delay(state.settings.actionDelays.click);

            // 等待0.3秒，确保常用语列表加载完成
            await Core.delay(300);

            // 查找常用语列表
            const dictList = await Core.waitForElement('ul[data-v-1d93a2d5=""]');
            if (!dictList) {
                Core.log('未找到常用语列表');
                return false;
            }

            const dictItems = dictList.querySelectorAll('li');
            if (!dictItems || dictItems.length === 0) {
                Core.log('常用语列表为空');
                return false;
            }

            // 遍历并点击每条常用语
            for (let i = 0; i < dictItems.length; i++) {
                const item = dictItems[i];
                Core.log(`发送常用语（自我介绍）：第${i + 1}条/共${dictItems.length}条`);
                await Core.simulateClick(item);
                await Core.delay(state.settings.actionDelays.click);
            }

            return true;
        } catch (error) {
            Core.log(`发送常用语出错: ${error.message}`);
            return false;
        }
    }

    /**
     * 发送简历
     */
    /**
     * 从岗位名称中提取连续的两个字作为关键词
     * @param {string} positionName - 岗位名称
     * @returns {Array} 双字关键词数组
     */
    static _extractTwoCharKeywords(positionName) {
        const keywords = [];
        // 确保中文处理正确，过滤掉标点符号和空格
        const cleanedName = positionName.replace(/[\s,，.。:：;；""''\[\]\(\)\{\}]/g, '');

        // 提取连续的两个字
        for (let i = 0; i < cleanedName.length - 1; i++) {
            keywords.push(cleanedName.substring(i, i + 2));
        }

        return keywords;
    }

    /**
     * 根据双字关键词查找匹配的简历
     * @param {Array} resumeItems - 简历项数组
     * @param {string} positionName - 岗位名称
     * @returns {HTMLElement|null} 匹配的简历项或null
     */
    static _findMatchingResume(resumeItems, positionName) {
        try {
            // 转换为小写用于匹配
            const positionNameLower = positionName.toLowerCase();

            // 提取双字关键词
            const twoCharKeywords = this._extractTwoCharKeywords(positionNameLower);

            // 按关键词优先级（从左到右）遍历
            for (const keyword of twoCharKeywords) {
                // 查找包含当前关键词的简历
                for (const item of resumeItems) {
                    const resumeNameElement = item.querySelector('.resume-name');
                    if (!resumeNameElement) continue;

                    const resumeName = resumeNameElement.textContent.trim().toLowerCase();

                    // 检查简历名称是否包含当前关键词
                    if (resumeName.includes(keyword)) {
                        const resumeNameText = resumeNameElement.textContent.trim();
                        Core.log(`找到匹配简历: "${resumeNameText}" 匹配关键词: "${keyword}"`);
                        return item;
                    }
                }
            }

            // 如果没有找到匹配的简历，返回null（将在主方法中使用第一个简历）
            return null;
        } catch (error) {
            Core.log(`简历匹配出错: ${error.message}`);
            return null;
        }
    }

    static async sendResume() {
        try {
            // 查找"发简历"按钮
            const resumeBtn = await Core.waitForElement(() => {
                return [...document.querySelectorAll('.toolbar-btn')].find(
                    el => el.textContent.trim() === '发简历'
                );
            });

            if (!resumeBtn) {
                Core.log('无法发送简历，未找到发简历按钮');
                return false;
            }

            if (resumeBtn.classList.contains('unable')) {
                Core.log('对方未回复，您无权发送简历');
                return false;
            }

            // 获取当前岗位名称
            let positionName = '';
            try {
                // 尝试从职位卡片获取岗位名称
                const positionNameElement = document.querySelector('.position-name') ||
                    document.querySelector('.job-name') ||
                    document.querySelector('[class*="position-content"] .left-content .position-name');

                if (positionNameElement) {
                    positionName = positionNameElement.textContent.trim();
                    Core.log(`当前岗位: ${positionName}`);
                } else {
                    Core.log('未找到岗位名称元素');
                }
            } catch (e) {
                Core.log(`获取岗位名称出错: ${e.message}`);
            }

            // 点击"发简历"
            await Core.simulateClick(resumeBtn);
            await Core.delay(state.settings.actionDelays.click);

            // 等待1秒，确保简历列表加载完成
            await Core.delay(1000);

            // 查找简历列表
            const resumeList = await Core.waitForElement('ul.resume-list');
            if (!resumeList) {
                Core.log('未找到简历列表');
                return false;
            }

            // 获取所有简历项
            const resumeItems = Array.from(resumeList.querySelectorAll('li.list-item'));
            if (resumeItems.length === 0) {
                Core.log('未找到简历列表项');
                return false;
            }

            // 选择简历：优先根据岗位名称匹配，否则选择第一个
            let selectedResumeItem = null;
            if (positionName) {
                // 根据双字关键词匹配简历
                selectedResumeItem = this._findMatchingResume(resumeItems, positionName);
            }

            // 如果没有找到匹配的简历，使用第一个
            if (!selectedResumeItem) {
                selectedResumeItem = resumeItems[0];
                const resumeName = selectedResumeItem.querySelector('.resume-name').textContent.trim();
                Core.log('使用第一个简历: "' + resumeName + '"');
            }

            // 点击选中的简历项
            await Core.simulateClick(selectedResumeItem);
            await Core.delay(state.settings.actionDelays.click);

            // 等待0.5秒，确保选择生效
            await Core.delay(500);

            // 查找发送按钮（注意：按钮可能初始为disabled状态）
            const sendBtn = await Core.waitForElement('button.btn-v2.btn-sure-v2.btn-confirm');
            if (!sendBtn) {
                Core.log('未找到发送按钮');
                return false;
            }

            // 检查按钮是否可用
            if (sendBtn.disabled) {
                Core.log('发送按钮不可用，可能简历未正确选择');
                return false;
            }

            await Core.simulateClick(sendBtn);
            return true;
        } catch (error) {
            Core.log(`发送简历出错: ${error.message}`);
            return false;
        }
    }

    /**
     * 根据岗位名称智能选择合适的图片简历
     * @returns {Object|null} 选中的图片简历对象，格式: {path, data}
     */
    static selectImageResume() {
        if (!state.settings.imageResumes || state.settings.imageResumes.length === 0) {
            return null;
        }

        // 获取当前岗位名称
        let positionName = '';
        try {
            const positionNameElement = document.querySelector('.position-name') ||
                document.querySelector('.job-name') ||
                document.querySelector('[class*="position-content"] .left-content .position-name');

            if (positionNameElement) {
                positionName = positionNameElement.textContent.trim();
                Core.log(`当前岗位: ${positionName}`);
            }
        } catch (e) {
            Core.log(`获取岗位名称出错: ${e.message}`);
        }

        // 如果只有一个简历，直接返回
        if (state.settings.imageResumes.length === 1) {
            const selectedResume = state.settings.imageResumes[0];
            Core.log(`只有一个图片简历，选择: ${selectedResume.path}`);
            return selectedResume;
        }

        // 智能匹配算法：根据简历文件名和岗位名称的相似度进行匹配
        const positionLower = positionName.toLowerCase();
        let bestMatch = null;
        let highestScore = -1;

        state.settings.imageResumes.forEach(resume => {
            const resumeNameLower = resume.path.toLowerCase();
            let score = 0;

            // 检查文件名是否包含岗位关键词
            // 提取简历文件名（不含扩展名）
            const resumeName = resume.path.substring(0, resume.path.lastIndexOf('.'));

            // 检查简历名中是否有与岗位相关的关键词
            const commonKeywords = ['前端', '后端', '全栈', '开发', '工程师', '程序', '软件',
                'frontend', 'backend', 'fullstack', 'developer', 'engineer'];

            commonKeywords.forEach(keyword => {
                if (positionLower.includes(keyword) && resumeNameLower.includes(keyword)) {
                    score += 1;
                }
            });

            // 根据文件名长度调整匹配策略
            if (positionName && resumeName) {
                // 计算简单的字符匹配度
                const matchingChars = Array.from(positionLower).filter(char =>
                    resumeNameLower.includes(char)
                ).length;

                // 计算匹配率（避免除零错误）
                const matchRate = resumeNameLower.length > 0 ?
                    matchingChars / resumeNameLower.length : 0;
                score += matchRate * 2;
            }

            // 记录最高分的简历
            if (score > highestScore) {
                highestScore = score;
                bestMatch = resume;
            }
        });

        // 如果找到匹配的简历，返回它，否则返回第一个简历
        const selectedResume = bestMatch || state.settings.imageResumes[0];
        Core.log(`智能选择图片简历: ${selectedResume.path}`);
        return selectedResume;
    }

    /**
     * 发送图片简历
     */
    static async sendImageResume() {
        try {
            if (!state.settings.useAutoSendImageResume || !state.settings.imageResumes ||
                state.settings.imageResumes.length === 0) {
                return false;
            }

            // 智能选择图片简历
            const selectedResume = this.selectImageResume();
            if (!selectedResume) {
                return false;
            }

            // 找到图片发送按钮
            const imageSendBtn = await Core.waitForElement('.toolbar-btn-content.icon.btn-sendimg input[type="file"]');
            if (!imageSendBtn) {
                Core.log('未找到图片发送按钮');
                return false;
            }

            // 创建一个Blob对象
            const byteCharacters = atob(selectedResume.data.split(',')[1]);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: 'image/jpeg' });

            // 创建一个File对象
            const file = new File([blob], selectedResume.path, {
                type: 'image/jpeg',
                lastModified: new Date().getTime()
            });

            // 创建一个DataTransfer对象来模拟文件选择
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);

            // 设置文件输入的值
            imageSendBtn.files = dataTransfer.files;

            // 触发change事件
            const event = new Event('change', { bubbles: true });
            imageSendBtn.dispatchEvent(event);
            return true;
        } catch (error) {
            Core.log(`发送图片简历出错: ${error.message}`);
            return false;
        }
    }
}


// 初始化加载状态
StatePersistence.loadState();

// 导出状态和工具类
window.state = state;
window.elements = elements;
window.StatePersistence = StatePersistence;
window.HRInteractionManager = HRInteractionManager;
