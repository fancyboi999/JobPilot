/**
  * UI模块：面板界面 - 复古描边风
  */
const UI = {
    // 页面类型常量
    PAGE_TYPES: {
        JOB_LIST: 'jobList',
        CHAT: 'chat'
    },

    // 当前页面类型
    currentPageType: null,

    // UI状态
    isReady: false,

    // 初始化UI
    init(isLoading = false) {
        this.currentPageType = location.pathname.includes('/chat')
            ? this.PAGE_TYPES.CHAT
            : this.PAGE_TYPES.JOB_LIST;
        this._applyTheme();
        this.createControlPanel(isLoading);
        this.createMiniIcon();
    },

    // 设置为就绪状态
    setReady() {
        this.isReady = true;
        this._enableControlButton();
    },

    // 创建主控制面板
    createControlPanel(isLoading = false) {
        if (document.getElementById('boss-pro-panel')) {
            document.getElementById('boss-pro-panel').remove();
        }

        elements.panel = this._createPanel();

        const header = this._createHeader();
        const controls = this._createPageControls(isLoading);
        elements.log = this._createLogger();
        const footer = this._createFooter();

        elements.panel.append(header, controls, elements.log, footer);
        document.body.appendChild(elements.panel);
        this._makeDraggable(elements.panel);
    },

    // 应用主题配置 - 复古描边风
    _applyTheme() {
        CONFIG.COLORS = this.currentPageType === this.PAGE_TYPES.JOB_LIST
            ? this.THEMES.JOB_LIST
            : this.THEMES.CHAT;

        // 将颜色配置应用到CSS变量
        document.documentElement.style.setProperty('--primary-color', CONFIG.COLORS.primary);
        document.documentElement.style.setProperty('--secondary-color', CONFIG.COLORS.secondary);
        document.documentElement.style.setProperty('--accent-color', CONFIG.COLORS.accent);
        document.documentElement.style.setProperty('--neutral-color', CONFIG.COLORS.neutral);
    },

    // 复古 颜色主题配置
    THEMES: {
        JOB_LIST: {
            primary: '#6FC2FF',    // 品牌蓝
            secondary: '#F4EFEA',  // 奶油色
            accent: '#383838',     // 墨黑
            neutral: '#A1A1A1'     // 中性灰
        },
        CHAT: {
            primary: '#53DBC9',    // 品牌绿
            secondary: '#F4EFEA',  // 奶油色
            accent: '#383838',     // 墨黑
            neutral: '#A1A1A1'     // 中性灰
        }
    },

    // 创建面板容器 - 复古描边风
    _createPanel() {
        const panel = document.createElement('div');
        panel.id = 'boss-pro-panel';
        panel.className = this.currentPageType === this.PAGE_TYPES.JOB_LIST
            ? 'boss-joblist-panel'
            : 'boss-chat-panel';

        // 复古描边风样式
        const baseStyles = `
            position: fixed;
            top: 40px;
            right: 30px;
            width: clamp(320px, 90vw, 420px);
            border-radius: 2px;
            padding: 0;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            z-index: 2147483647;
            display: flex;
            flex-direction: column;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            background: #FFFFFF;
            box-shadow: 0 10px 25px rgba(56, 56, 56, 0.2);
            border: 2px solid #383838;
            cursor: default;
        `;

        panel.style.cssText = baseStyles;

        // 设置RGB颜色变量
        const rgbColor = this._hexToRgb(CONFIG.COLORS.primary);
        document.documentElement.style.setProperty('--primary-rgb', rgbColor);

        return panel;
    },

    // 创建头部 - 复古描边风
    _createHeader() {
        const header = document.createElement('div');
        header.className = this.currentPageType === this.PAGE_TYPES.JOB_LIST
            ? 'boss-header'
            : 'boss-chat-header';

        header.style.cssText = `
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 16px;
            background: #F4EFEA;
            border-bottom: 2px solid #383838;
            cursor: move;
        `;

        const title = this._createTitle();

        // 创建按钮容器
        const buttonContainer = document.createElement('div');
        buttonContainer.style.cssText = `
            display: flex;
            gap: 8px;
        `;

        // 添加清空日志按钮
        const clearLogBtn = this._createIconButton('🗑', () => {
            elements.log.innerHTML = `<div style="color:var(--neutral-color); margin-bottom:8px;">🚢 欢迎使用 JobPilot 海投助手！</div>`;
        }, this.currentPageType === this.PAGE_TYPES.JOB_LIST
            ? '清空日志'
            : '清空聊天记录');

        // 添加设置按钮
        const settingsBtn = this._createIconButton('⚙', () => {
            showSettingsDialog();
        }, this.currentPageType === this.PAGE_TYPES.JOB_LIST
            ? '插件设置'
            : 'AI人设设置');

        // 添加最小化按钮
        const closeBtn = this._createIconButton('−', () => {
            state.isMinimized = true;
            elements.panel.style.transform = 'translateY(-120%)';
            elements.miniIcon.style.display = 'flex';
        }, this.currentPageType === this.PAGE_TYPES.JOB_LIST
            ? '最小化海投面板'
            : '最小化聊天面板');

        buttonContainer.append(clearLogBtn, settingsBtn, closeBtn);

        header.append(title, buttonContainer);
        return header;
    },

    // 创建标题 - 复古描边风
    _createTitle() {
        const title = document.createElement('div');
        title.style.display = 'flex';
        title.style.alignItems = 'center';
        title.style.gap = '12px';

        // 复古描边风图标
        const icon = document.createElement('div');
        icon.style.cssText = `
            width: 44px;
            height: 44px;
            background: var(--primary-color);
            border: 2px solid #383838;
            border-radius: 2px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 24px;
        `;
        icon.textContent = '🚢';

        const titleText = document.createElement('div');

        const mainTitle = document.createElement('h3');
        mainTitle.style.cssText = `
            margin: 0;
            font-family: 'Monaco', 'Consolas', monospace;
            font-size: 18px;
            font-weight: 400;
            text-transform: uppercase;
            letter-spacing: 0.02em;
            color: #383838;
            line-height: 1.2;
        `;
        mainTitle.innerHTML = this.currentPageType === this.PAGE_TYPES.JOB_LIST
            ? 'BOSS <span style="color:var(--primary-color);">海投</span> 助手'
            : 'BOSS <span style="color:var(--primary-color);">智能</span> 聊天';

        const subTitle = document.createElement('p');
        subTitle.style.cssText = `
            margin: 2px 0 0 0;
            font-size: 12px;
            font-weight: 300;
            color: var(--neutral-color);
        `;
        subTitle.textContent = this.currentPageType === this.PAGE_TYPES.JOB_LIST
            ? 'Automate your job search'
            : 'AI-powered conversations';

        titleText.appendChild(mainTitle);
        titleText.appendChild(subTitle);
        title.appendChild(icon);
        title.appendChild(titleText);

        return title;
    },

    // 创建页面控制区域
    _createPageControls(isLoading = false) {
        if (this.currentPageType === this.PAGE_TYPES.JOB_LIST) {
            return this._createJobListControls(isLoading);
        } else {
            return this._createChatControls(isLoading);
        }
    },

    // 创建职位列表页面控制区域
    _createJobListControls(isLoading = false) {
        const container = document.createElement('div');
        container.className = 'boss-joblist-controls';
        container.style.cssText = `
            padding: 16px;
            background: #FFFFFF;
        `;

        // 筛选条件区域
        const filterContainer = this._createFilterContainer();

        elements.controlBtn = this._createTextButton(
            isLoading ? '初始化中...' : '启动海投',
            isLoading ? '#A1A1A1' : 'var(--primary-color)',
            () => {
                if (this.isReady) toggleProcess();
            },
            isLoading
        );

        // 居中控制按钮
        const btnContainer = document.createElement('div');
        btnContainer.style.cssText = `
            display: flex;
            justify-content: center;
            width: 100%;
        `;
        btnContainer.appendChild(elements.controlBtn);

        container.append(filterContainer, btnContainer);
        return container;
    },

    // 创建聊天页面控制区域
    _createChatControls(isLoading = false) {
        const container = document.createElement('div');
        container.className = 'boss-chat-controls';
        container.style.cssText = `
            padding: 16px;
            background: #FFFFFF;
        `;

        // 人设和模板选择
        const configRow = document.createElement('div');
        configRow.style.cssText = `
            display: flex;
            gap: 12px;
            margin-bottom: 16px;
        `;

        // 动态获取AI人设选项
        const getPersonaOptions = () => {
            const defaultOptions = [
                { value: 'default', text: '默认' }
            ];
            const customPersonas = settings.customPersonas || [];
            return [...defaultOptions, ...customPersonas];
        };

        const personaCol = this._createSelectControl('AI人设：', 'ai-persona-selector', getPersonaOptions());
        const templateCol = this._createSelectControl('仅回复岗位包含：', 'reply-template-selector', [
            { value: 'standard', text: '标准' },
            { value: 'brief', text: '简洁' },
            { value: 'detailed', text: '详细' }
        ]);

        elements.personaSelector = personaCol.querySelector('select');
        configRow.append(personaCol, templateCol);

        // 按钮容器 - 使用Grid布局优化美观度
        const btnContainer = document.createElement('div');
        btnContainer.style.cssText = `
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
            width: 100%;
        `;

        // 1. 发常用语按钮
        const greetingsBtn = this._createTextButton(
            '发常用语',
            'var(--primary-color)',
            () => {
                if (this.isReady) startSendGreetings();
            },
            isLoading
        );
        greetingsBtn.id = 'btn-greetings';
        greetingsBtn.style.maxWidth = '100%'; // 填满网格
        elements.greetingsBtn = greetingsBtn; // 保存引用

        // 2. 发图片简历按钮
        const resumeBtn = this._createTextButton(
            '发图片简历',
            'var(--primary-color)',
            () => {
                if (this.isReady) startSendImageResume();
            },
            isLoading
        );
        resumeBtn.id = 'btn-image-resume';
        resumeBtn.style.maxWidth = '100%'; // 填满网格
        elements.resumeBtn = resumeBtn; // 保存引用

        // 3. AI回复按钮 - 占据两列
        const aiBtn = this._createTextButton(
            'AI回复',
            'var(--primary-color)',
            () => {
                if (this.isReady) startAiReply();
            },
            isLoading
        );
        aiBtn.id = 'btn-ai-reply';
        aiBtn.style.gridColumn = 'span 2'; // 占据整行
        aiBtn.style.maxWidth = '100%'; // 填满网格
        elements.aiBtn = aiBtn; // 保存引用

        btnContainer.append(greetingsBtn, resumeBtn, aiBtn);

        container.append(configRow, btnContainer);
        return container;
    },

    // 创建筛选容器 - 复古描边风
    _createFilterContainer() {
        const filterContainer = document.createElement('div');
        filterContainer.style.cssText = `
            background: #F4EFEA;
            border: 2px solid #383838;
            border-radius: 2px;
            padding: 16px;
            margin-bottom: 16px;
        `;

        const filterRow = document.createElement('div');
        filterRow.style.cssText = `
            display: flex;
            gap: 12px;
            margin-bottom: 12px;
        `;

        const includeFilterCol = this._createInputControl('职位名包含：', 'include-filter', '如：前端,开发');
        const locationFilterCol = this._createInputControl('工作地包含：', 'location-filter', '如：杭州,滨江');

        elements.includeInput = includeFilterCol.querySelector('input');
        elements.locationInput = locationFilterCol.querySelector('input');

        filterRow.append(includeFilterCol, locationFilterCol);

        filterContainer.append(filterRow);
        return filterContainer;
    },

    // 创建输入控件 - 复古描边风
    _createInputControl(labelText, id, placeholder) {
        const controlCol = document.createElement('div');
        controlCol.style.cssText = 'flex: 1;';

        const label = document.createElement('label');
        label.textContent = labelText;
        label.style.cssText = `
            display: block;
            margin-bottom: 8px;
            font-family: 'Monaco', 'Consolas', monospace;
            font-size: 12px;
            font-weight: 400;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: #383838;
        `;

        const input = document.createElement('input');
        input.id = id;
        input.placeholder = placeholder;
        input.style.cssText = `
            width: 100%;
            padding: 12px 16px;
            border: 2px solid #383838;
            border-radius: 2px;
            font-family: 'Inter', sans-serif;
            font-size: 14px;
            font-weight: 300;
            background: #FFFFFF;
            transition: all 0.2s ease;
        `;

        input.addEventListener('focus', () => {
            input.style.outline = '2px solid #2BA5FF';
            input.style.outlineOffset = '0';
            input.style.borderColor = '#2BA5FF';
        });

        input.addEventListener('blur', () => {
            input.style.outline = 'none';
            input.style.borderColor = '#383838';
        });

        controlCol.append(label, input);
        return controlCol;
    },

    // 创建选择控件 - 复古描边风
    _createSelectControl(labelText, id, options) {
        const controlCol = document.createElement('div');
        controlCol.style.cssText = 'flex: 1;';

        const label = document.createElement('label');
        label.textContent = labelText;
        label.style.cssText = `
            display: block;
            margin-bottom: 8px;
            font-family: 'Monaco', 'Consolas', monospace;
            font-size: 12px;
            font-weight: 400;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: #383838;
        `;

        const select = document.createElement('select');
        select.id = id;
        select.style.cssText = `
            width: 100%;
            padding: 12px 16px;
            border: 2px solid #383838;
            border-radius: 2px;
            font-family: 'Inter', sans-serif;
            font-size: 14px;
            background: #FFFFFF;
            color: #383838;
            transition: all 0.2s ease;
        `;

        options.forEach(option => {
            const opt = document.createElement('option');
            opt.value = option.value;
            opt.textContent = option.text;
            select.appendChild(opt);
        });

        select.addEventListener('focus', () => {
            select.style.outline = '2px solid #2BA5FF';
            select.style.outlineOffset = '0';
        });

        select.addEventListener('blur', () => {
            select.style.outline = 'none';
        });

        controlCol.append(label, select);
        return controlCol;
    },

    // 日志区域 - 复古描边风
    _createLogger() {
        const log = document.createElement('div');
        log.id = 'pro-log';
        log.className = this.currentPageType === this.PAGE_TYPES.JOB_LIST
            ? 'boss-joblist-log'
            : 'boss-chat-log';

        const height = this.currentPageType === this.PAGE_TYPES.JOB_LIST ? '300px' : '300px';

        log.style.cssText = `
            height: ${height};
            overflow-y: auto;
            background: #F4EFEA;
            border-top: 2px solid #383838;
            padding: 16px;
            font-family: 'Consolas', 'Monaco', monospace;
            font-size: 13px;
            line-height: 1.6;
            transition: all 0.3s ease;
            user-select: text;
        `;

        // 自定义滚动条
        const style = document.createElement('style');
        style.textContent = `
            #pro-log::-webkit-scrollbar {
                width: 8px;
            }
            #pro-log::-webkit-scrollbar-track {
                background: #F8F8F7;
            }
            #pro-log::-webkit-scrollbar-thumb {
                background: #A1A1A1;
                border-radius: 0;
            }
            #pro-log::-webkit-scrollbar-thumb:hover {
                background: #383838;
            }
        `;
        document.head.appendChild(style);

        return log;
    },

    // 面板页脚 - 复古描边风
    _createFooter() {
        const footer = document.createElement('div');
        footer.className = this.currentPageType === this.PAGE_TYPES.JOB_LIST
            ? 'boss-joblist-footer'
            : 'boss-chat-footer';

        footer.style.cssText = `
            padding: 12px 16px;
            background: #383838;
            color: #FFFFFF;
            font-size: 11px;
            font-weight: 300;
            text-align: center;
            border-top: 2px solid #383838;
        `;

        footer.textContent = 'JobPilot · © 2025 fancyboi999';
        return footer;
    },

    // 文本按钮 - 复古描边风
    _createTextButton(text, bgColor, onClick, isDisabled = false) {
        const btn = document.createElement('button');
        btn.className = 'boss-btn';
        btn.textContent = text;
        btn.disabled = isDisabled;

        const baseCursor = isDisabled ? 'not-allowed' : 'pointer';
        const baseOpacity = isDisabled ? '0.6' : '1';

        btn.style.cssText = `
            width: 100%;
            max-width: 360px;
            margin: 0 auto; /* 居中显示 */
            padding: 12px 20px;
            background: ${bgColor};
            color: #383838;
            border: 2px solid #383838;
            border-radius: 2px;
            cursor: ${baseCursor};
            font-family: 'Monaco', 'Consolas', monospace;
            font-size: 14px;
            font-weight: 400;
            text-transform: uppercase;
            letter-spacing: 0.02em;
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
            display: flex;
            justify-content: center;
            align-items: center;
            opacity: ${baseOpacity};
        `;

        if (!isDisabled) {
            btn.addEventListener('mouseenter', () => {
                btn.style.background = '#2BA5FF';
                btn.style.transform = 'translate(7px, -7px)';
                btn.style.boxShadow = '-7px 7px 0 #383838';
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.background = bgColor;
                btn.style.transform = 'translate(0, 0)';
                btn.style.boxShadow = 'none';
            });

            btn.addEventListener('mousedown', () => {
                btn.style.transform = 'translate(0, 0)';
                btn.style.boxShadow = 'none';
            });
        }

        btn.addEventListener('click', onClick);

        return btn;
    },

    // 启用控制按钮
    _enableControlButton() {
        if (this.currentPageType === this.PAGE_TYPES.JOB_LIST) {
            if (!elements.controlBtn) return;

            const newBgColor = 'var(--primary-color)';
            elements.controlBtn.disabled = false;
            elements.controlBtn.textContent = '启动海投';
            elements.controlBtn.style.cursor = 'pointer';
            elements.controlBtn.style.opacity = '1';
            elements.controlBtn.style.background = newBgColor;
            elements.controlBtn.style.animation = 'pulse-ready 0.6s ease-out';

            // 绑定事件
            this._bindButtonEffects(elements.controlBtn, newBgColor);
        } else {
            // 聊天页面启用三个按钮
            const buttons = [elements.greetingsBtn, elements.resumeBtn, elements.aiBtn];
            const newBgColor = 'var(--primary-color)';

            buttons.forEach(btn => {
                if (btn) {
                    btn.disabled = false;
                    btn.style.cursor = 'pointer';
                    btn.style.opacity = '1';
                    btn.style.background = newBgColor;
                    btn.style.animation = 'pulse-ready 0.6s ease-out';
                    this._bindButtonEffects(btn, newBgColor);
                }
            });
        }

        // 添加动画样式
        if (!document.getElementById('button-ready-animation')) {
            const style = document.createElement('style');
            style.id = 'button-ready-animation';
            style.textContent = `
                @keyframes pulse-ready {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.05); box-shadow: -7px 7px 0 #383838, 0 0 20px rgba(111, 194, 255, 0.6); }
                    100% { transform: scale(1); }
                }
            `;
            document.head.appendChild(style);
        }
    },

    // 绑定按钮特效
    _bindButtonEffects(btn, bgColor) {
        btn.onmouseenter = () => {
            btn.style.background = '#2BA5FF';
            btn.style.transform = 'translate(7px, -7px)';
            btn.style.boxShadow = '-7px 7px 0 #383838';
        };

        btn.onmouseleave = () => {
            btn.style.background = bgColor;
            btn.style.transform = 'translate(0, 0)';
            btn.style.boxShadow = 'none';
        };

        btn.onmousedown = () => {
            btn.style.transform = 'translate(0, 0)';
            btn.style.boxShadow = 'none';
        };
    },

    // 图标按钮 - 复古描边风
    _createIconButton(icon, onClick, title) {
        const btn = document.createElement('button');
        btn.className = 'boss-icon-btn';
        btn.innerHTML = icon;
        btn.title = title;
        btn.style.cssText = `
            width: 32px;
            height: 32px;
            border-radius: 2px;
            border: 2px solid #383838;
            background: #FFFFFF;
            cursor: pointer;
            font-size: 14px;
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
            display: flex;
            justify-content: center;
            align-items: center;
            color: #383838;
        `;

        btn.addEventListener('click', onClick);

        btn.addEventListener('mouseenter', () => {
            btn.style.background = '#F4EFEA';
            btn.style.transform = 'translate(3px, -3px)';
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.background = '#FFFFFF';
            btn.style.transform = 'translate(0, 0)';
        });

        btn.addEventListener('mousedown', () => {
            btn.style.background = '#2BA5FF';
            btn.style.color = '#FFFFFF';
            btn.style.transform = 'translate(0, 0)';
        });

        btn.addEventListener('mouseup', () => {
            btn.style.background = '#F4EFEA';
            btn.style.color = '#383838';
        });

        return btn;
    },

    // 设置面板可拖动功能
    _makeDraggable(panel) {
        const header = panel.querySelector('.boss-header, .boss-chat-header');

        if (!header) return;

        header.style.cursor = 'move';

        let isDragging = false;
        let startX = 0, startY = 0;
        let initialX = panel.offsetLeft, initialY = panel.offsetTop;

        header.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            initialX = panel.offsetLeft;
            initialY = panel.offsetTop;
            panel.style.transition = 'none';
            panel.style.zIndex = '2147483647';
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;

            const dx = e.clientX - startX;
            const dy = e.clientY - startY;

            panel.style.left = `${initialX + dx}px`;
            panel.style.top = `${initialY + dy}px`;
            panel.style.right = 'auto';
        });

        document.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                panel.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
                panel.style.zIndex = '2147483646';
            }
        });
    },

    // 最小化图标 - 复古描边风
    createMiniIcon() {
        elements.miniIcon = document.createElement('div');
        elements.miniIcon.style.cssText = `
            width: 60px;
            height: 60px;
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: var(--primary-color);
            border: 2px solid #383838;
            border-radius: 50%;
            box-shadow: 0 10px 25px rgba(56, 56, 56, 0.2);
            cursor: pointer;
            display: none;
            justify-content: center;
            align-items: center;
            color: #383838;
            font-size: 28px;
            z-index: 2147483647;
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        `;

        elements.miniIcon.textContent = '🚢';

        elements.miniIcon.addEventListener('mouseenter', () => {
            elements.miniIcon.style.background = '#2BA5FF';
            elements.miniIcon.style.transform = 'translate(5px, -5px) scale(1.1)';
            elements.miniIcon.style.boxShadow = '-5px 5px 0 #383838, 0 10px 25px rgba(56, 56, 56, 0.2)';
        });

        elements.miniIcon.addEventListener('mouseleave', () => {
            elements.miniIcon.style.background = 'var(--primary-color)';
            elements.miniIcon.style.transform = 'scale(1)';
            elements.miniIcon.style.boxShadow = '0 10px 25px rgba(56, 56, 56, 0.2)';
        });

        elements.miniIcon.addEventListener('click', () => {
            state.isMinimized = false;
            elements.panel.style.transform = 'translateY(0)';
            elements.miniIcon.style.display = 'none';
        });

        document.body.appendChild(elements.miniIcon);
    },

    // 十六进制颜色转RGB
    _hexToRgb(hex) {
        hex = hex.replace('#', '');
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        return `${r}, ${g}, ${b}`;
    }
};

// 导出到全局
window.UI = UI;
