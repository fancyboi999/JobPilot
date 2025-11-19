const GUIDE_THEME = {
    ink: '#383838',
    cream: '#F4EFEA',
    paper: '#FFFFFF',
    accent: '#6FC2FF',
    accentDark: '#2BA5FF',
    neutral: '#A1A1A1',
    warning: '#FF7169'
};

const guide = {
    steps: [
        {
            target: 'div.city-label.active',
            content: '👋 海投前，先在BOSS<span class="highlight">筛选出岗位</span>！\n\n助手会先滚动收集界面上显示的岗位，\n随后依次进行沟通~',
            highlightColor: '#4285f4', // 主蓝色
            arrowPosition: 'bottom',
            defaultPosition: { left: '50%', top: '20%', transform: 'translateX(-50%)' }
        },
        {
            target: 'a[ka="header-jobs"]',
            content: '🚀 <span class="highlight">职位页操作流程</span>：\n\n1️⃣ 扫描职位卡片\n2️⃣ 点击"立即沟通"（需开启“自动打招呼”）\n3️⃣ 留在当前页，继续沟通下一个职位\n\n全程无需手动干预，高效投递！',
            highlightColor: '#3367d6', // 主蓝加深10%
            arrowPosition: 'bottom',
            defaultPosition: { left: '25%', top: '80px' }
        },
        {
            target: 'a[ka="header-message"]',
            content: '💬 <span class="highlight">海投建议</span>！\n\n✅ HR与您沟通，HR需要付费给平台\n因此您尽可能先自我介绍以提高效率 \n\n✅ HR查看附件简历，HR也要付费给平台\n所以尽量先发送`图片简历`给HR',
            highlightColor: '#2a56c6', // 主蓝加深15%
            arrowPosition: 'left',
            defaultPosition: { right: '150px', top: '100px' }
        },
        {
            target: 'div.logo',
            content: '🤖 <span class="highlight">您需要打开两个浏览器窗口</span>：\n\n左侧窗口自动打招呼发起沟通\n右侧发送自我介绍和图片简历\n\n您只需专注于挑选offer！',
            highlightColor: '#1a73e8', // 主蓝加深20%
            arrowPosition: 'right',
            defaultPosition: { left: '200px', top: '20px' }
        },
        {
            target: 'div.logo',
            content: '❗ <span class="highlight">特别注意</span>：\n\n1. <span class="warning">BOSS直聘每日打招呼上限为150次</span>\n2. 聊天页仅处理最上方的最新对话\n3. 打招呼后对方会显示在聊天页\n4. <span class="warning">投递操作过于频繁有封号风险!</span>',
            highlightColor: '#0d47a1', // 主蓝加深30%
            arrowPosition: 'bottom',
            defaultPosition: { left: '50px', top: '80px' }
        }
    ],
    currentStep: 0,
    guideElement: null,
    overlay: null,
    highlightElements: [],
    chatUrl: 'https://www.zhipin.com/web/geek/chat', // 聊天页面URL

    showGuideToUser() {
        // 创建遮罩层
        this.overlay = document.createElement('div');
        this.overlay.id = 'guide-overlay';
        this.overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(244, 239, 234, 0.9);
            backdrop-filter: blur(3px);
            mix-blend-mode: multiply;
            z-index: 99997;
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        document.body.appendChild(this.overlay);

        // 创建引导卡片
        this.guideElement = document.createElement('div');
        this.guideElement.id = 'guide-tooltip';
        this.guideElement.style.cssText = `
            position: fixed;
            z-index: 99999;
            width: 340px;
            background: ${GUIDE_THEME.cream};
            border-radius: 2px;
            border: 2px solid ${GUIDE_THEME.ink};
            box-shadow: -12px 12px 0 ${GUIDE_THEME.ink}, 0 18px 35px rgba(56, 56, 56, 0.25);
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            overflow: hidden;
            opacity: 0;
            transform: translateY(10px);
            transition: opacity 0.3s ease, transform 0.3s ease;
        `;
        document.body.appendChild(this.guideElement);

        // 显示遮罩层
        setTimeout(() => {
            this.overlay.style.opacity = '1';

            // 延迟显示第一步，增强视觉层次感
            setTimeout(() => {
                this.showStep(0);
            }, 300);
        }, 100);
    },

    showStep(stepIndex) {
        const step = this.steps[stepIndex];
        if (!step) return;

        this.clearHighlights();
        const target = document.querySelector(step.target);
        const accentColor = step.highlightColor || GUIDE_THEME.accent;

        if (target) {
            // 创建高亮区域
            const rect = target.getBoundingClientRect();
            const highlight = document.createElement('div');
            highlight.className = 'guide-highlight';
            highlight.style.cssText = `
                position: fixed;
                top: ${rect.top}px;
                left: ${rect.left}px;
                width: ${rect.width}px;
                height: ${rect.height}px;
                background: rgba(244, 239, 234, 0.25);
                border-radius: 2px;
                z-index: 99998;
                border: 2px dashed ${GUIDE_THEME.ink};
                box-shadow: -6px 6px 0 ${GUIDE_THEME.ink}, 0 0 0 6px ${accentColor}33;
                animation: guide-outline 1.8s infinite;
            `;
            document.body.appendChild(highlight);
            this.highlightElements.push(highlight);

            // 计算提示框位置（基于目标元素）
            this.setGuidePositionFromTarget(step, rect);
        } else {
            console.warn('引导目标元素未找到，使用默认位置:', step.target);
            // 使用默认位置显示提示框
            this.setGuidePositionFromDefault(step);
        }

        // 设置引导提示框内容
        let buttonsHtml = '';
        const buttonBaseStyle = `
            padding: 12px 22px;
            border: 2px solid ${GUIDE_THEME.ink};
            font-size: 13px;
            font-family: 'Monaco', 'Consolas', monospace;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            cursor: pointer;
            box-shadow: -4px 4px 0 ${GUIDE_THEME.ink};
            transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
        `;

        // 根据是否为最后一步生成不同的按钮
        if (stepIndex === this.steps.length - 1) {
            buttonsHtml = `
                <div class="guide-buttons" style="display: flex; justify-content: center; padding: 18px 20px; border-top: 2px solid ${GUIDE_THEME.ink}; background: ${GUIDE_THEME.paper};">
                    <button id="guide-finish-btn" style="${buttonBaseStyle} background: ${accentColor}; color: ${GUIDE_THEME.ink};">
                        完成
                    </button>
                </div>
            `;
        } else {
            buttonsHtml = `
                <div class="guide-buttons" style="display: flex; justify-content: flex-end; padding: 18px 20px; border-top: 2px solid ${GUIDE_THEME.ink}; background: ${GUIDE_THEME.paper}; gap: 12px;">
                    <button id="guide-skip-btn" style="${buttonBaseStyle} background: ${GUIDE_THEME.paper}; color: ${GUIDE_THEME.ink};">
                        跳过
                    </button>
                    <button id="guide-next-btn" style="${buttonBaseStyle} background: ${accentColor}; color: ${GUIDE_THEME.ink};">
                        下一步
                    </button>
                </div>
            `;
        }

        this.guideElement.innerHTML = `
            <div style="height: 8px; background: ${accentColor}; border-bottom: 2px solid ${GUIDE_THEME.ink};"></div>
            <div class="guide-header" style="padding: 18px 20px; background: ${GUIDE_THEME.paper}; display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid ${GUIDE_THEME.ink};">
                <div class="guide-title" style="font-size: 14px; font-family: 'Monaco', 'Consolas', monospace; letter-spacing: 0.08em; text-transform: uppercase; color: ${GUIDE_THEME.ink};">JobPilot 海投指北</div>
                <div class="guide-step" style="font-size: 12px; letter-spacing: 0.08em; color: ${GUIDE_THEME.ink};">步骤 ${stepIndex + 1}/${this.steps.length}</div>
            </div>
            <div class="guide-content" style="padding: 20px; font-size: 14px; line-height: 1.6; color: ${GUIDE_THEME.ink}; background: ${GUIDE_THEME.cream}; border-bottom: 2px solid ${GUIDE_THEME.ink};">
                <div style="white-space: pre-wrap; font-family: 'Inter', sans-serif; margin: 0;">${step.content}</div>
            </div>
            ${buttonsHtml}
        `;

        // 重新绑定按钮事件
        if (stepIndex === this.steps.length - 1) {
            const finishBtn = document.getElementById('guide-finish-btn');
            finishBtn.addEventListener('click', () => this.endGuide(true));
            this.bindGuideButtonHover(finishBtn, {
                defaultBg: accentColor,
                hoverBg: this.darkenColor(accentColor, 10)
            });
        } else {
            const nextBtn = document.getElementById('guide-next-btn');
            const skipBtn = document.getElementById('guide-skip-btn');
            nextBtn.addEventListener('click', () => this.nextStep());
            skipBtn.addEventListener('click', () => this.endGuide());

            this.bindGuideButtonHover(nextBtn, {
                defaultBg: accentColor,
                hoverBg: this.darkenColor(accentColor, 10)
            });
            this.bindGuideButtonHover(skipBtn, {
                defaultBg: GUIDE_THEME.paper,
                hoverBg: GUIDE_THEME.cream
            });
        }

        // 显示提示框
        this.guideElement.style.opacity = '1';
        this.guideElement.style.transform = 'translateY(0)';
    },

    // 根据目标元素计算提示框位置
    setGuidePositionFromTarget(step, rect) {
        let left, top;
        const guideWidth = 320;
        const guideHeight = 240;

        // 根据箭头方向调整位置
        switch (step.arrowPosition) {
            case 'top':
                left = rect.left + rect.width / 2 - guideWidth / 2;
                top = rect.top - guideHeight - 20;
                break;
            case 'bottom':
                left = rect.left + rect.width / 2 - guideWidth / 2;
                top = rect.bottom + 20;
                break;
            case 'left':
                left = rect.left - guideWidth - 20;
                top = rect.top + rect.height / 2 - guideHeight / 2;
                break;
            case 'right':
                left = rect.right + 20;
                top = rect.top + rect.height / 2 - guideHeight / 2;
                break;
            default:
                left = rect.right + 20;
                top = rect.top;
        }

        // 确保提示框不超出屏幕
        left = Math.max(10, Math.min(left, window.innerWidth - guideWidth - 10));
        top = Math.max(10, Math.min(top, window.innerHeight - guideHeight - 10));

        // 设置位置
        this.guideElement.style.left = `${left}px`;
        this.guideElement.style.top = `${top}px`;
        this.guideElement.style.transform = 'translateY(0)';
    },

    // 使用默认位置显示提示框
    setGuidePositionFromDefault(step) {
        const position = step.defaultPosition || { left: '50%', top: '50%', transform: 'translate(-50%, -50%)' };

        // 应用默认位置样式
        Object.assign(this.guideElement.style, {
            left: position.left,
            top: position.top,
            right: position.right || 'auto',
            bottom: position.bottom || 'auto',
            transform: position.transform || 'none'
        });
    },

    nextStep() {
        // 清除当前步骤的事件监听
        const currentStep = this.steps[this.currentStep];
        if (currentStep) {
            const target = document.querySelector(currentStep.target);
            if (target) {
                target.removeEventListener('click', this.nextStep);
            }
        }

        this.currentStep++;
        if (this.currentStep < this.steps.length) {
            // 隐藏当前提示框，显示下一步
            this.guideElement.style.opacity = '0';
            this.guideElement.style.transform = 'translateY(10px)';

            setTimeout(() => {
                this.showStep(this.currentStep);
            }, 300);
        } else {
            this.endGuide(true); // 传递true表示引导已完成
        }
    },

    clearHighlights() {
        this.highlightElements.forEach(el => el.remove());
        this.highlightElements = [];
    },

    endGuide(isCompleted = false) {
        // 清除高亮和事件
        this.clearHighlights();

        // 淡出提示框和遮罩
        this.guideElement.style.opacity = '0';
        this.guideElement.style.transform = 'translateY(10px)';
        this.overlay.style.opacity = '0';

        // 延迟移除元素
        setTimeout(() => {
            if (this.overlay && this.overlay.parentNode) {
                this.overlay.parentNode.removeChild(this.overlay);
            }
            if (this.guideElement && this.guideElement.parentNode) {
                this.guideElement.parentNode.removeChild(this.guideElement);
            }

            // 当引导完成时打开聊天页面
            if (isCompleted && this.chatUrl) {
                window.open(this.chatUrl, '_blank');
            }
        }, 300);

        // 触发引导结束事件
        document.dispatchEvent(new Event('guideEnd'));
    },

    bindGuideButtonHover(button, { defaultBg, hoverBg } = {}) {
        if (!button) return;
        const baseBackground = defaultBg || button.style.background || GUIDE_THEME.paper;
        const hoverBackground = hoverBg || GUIDE_THEME.cream;
        button.style.background = baseBackground;
        button.style.boxShadow = `-4px 4px 0 ${GUIDE_THEME.ink}`;

        button.addEventListener('mouseenter', () => {
            button.style.background = hoverBackground;
            button.style.transform = 'translate(4px, -4px)';
            button.style.boxShadow = `-4px 4px 0 ${GUIDE_THEME.ink}`;
        });

        button.addEventListener('mouseleave', () => {
            button.style.background = baseBackground;
            button.style.transform = 'translate(0, 0)';
            button.style.boxShadow = `-4px 4px 0 ${GUIDE_THEME.ink}`;
        });

        button.addEventListener('mousedown', () => {
            button.style.transform = 'translate(0, 0)';
            button.style.boxShadow = 'none';
        });

        button.addEventListener('mouseup', () => {
            button.style.transform = 'translate(4px, -4px)';
            button.style.boxShadow = `-4px 4px 0 ${GUIDE_THEME.ink}`;
        });
    },

    // 辅助函数：颜色加深
    darkenColor(color, percent) {
        let R = parseInt(color.substring(1, 3), 16);
        let G = parseInt(color.substring(3, 5), 16);
        let B = parseInt(color.substring(5, 7), 16);

        R = parseInt(R * (100 - percent) / 100);
        G = parseInt(G * (100 - percent) / 100);
        B = parseInt(B * (100 - percent) / 100);

        R = (R < 255) ? R : 255;
        G = (G < 255) ? G : 255;
        B = (B < 255) ? B : 255;

        R = Math.round(R);
        G = Math.round(G);
        B = Math.round(B);

        const RR = ((R.toString(16).length === 1) ? "0" + R.toString(16) : R.toString(16));
        const GG = ((G.toString(16).length === 1) ? "0" + G.toString(16) : G.toString(16));
        const BB = ((B.toString(16).length === 1) ? "0" + B.toString(16) : B.toString(16));

        return `#${RR}${GG}${BB}`;
    }
};

// 添加脉冲动画样式和高亮样式
const style = document.createElement('style');
style.textContent = `
    @keyframes guide-outline {
        0% { box-shadow: 0 0 0 0 rgba(111, 194, 255, 0.6); }
        100% { box-shadow: 0 0 0 12px rgba(111, 194, 255, 0); }
    }

    .guide-content .highlight {
        font-weight: 700;
        color: ${GUIDE_THEME.accentDark};
        font-family: 'Monaco', 'Consolas', monospace;
        text-transform: uppercase;
    }

    .guide-content .warning {
        font-weight: 700;
        color: ${GUIDE_THEME.warning};
    }
`;
document.head.appendChild(style);

// 导出到全局
window.guide = guide;
