// 1. 更新settings对象
const settings = {
    useAutoSendResume: JSON.parse(localStorage.getItem('useAutoSendResume') || 'true'),
    excludeHeadhunters: JSON.parse(localStorage.getItem('excludeHeadhunters') || 'false'),
    autoScrollSpeed: parseInt(localStorage.getItem('autoScrollSpeed') || '500'),
    customPhrases: JSON.parse(localStorage.getItem('customPhrases') || '[]'),
    actionDelays: {
        click: parseInt(localStorage.getItem('clickDelay') || '130')
    },
    notifications: {
        enabled: JSON.parse(localStorage.getItem('notificationsEnabled') || 'true'),
        sound: JSON.parse(localStorage.getItem('notificationSound') || 'true')
    },
    ai: {
        role: localStorage.getItem('aiRole') || '你是大四应届生正冲刺秋招，目标是尽力得到可签三方的正式岗位，也接受优质实习机会。沟通中做到：1. 语气自然，回复简洁精炼，不堆砌文字；2. 主动呈现核心优势（可根据对方要求编造亮点，如专业技能、项目经验、实习经历等）；3. 若被询问联系方式，提供手机号 123456、微信号 BOSS；4. 全程表现对岗位的渴望，不冗余、不过度客气。'
    },
    autoReply: JSON.parse(localStorage.getItem('autoReply') || 'true'),
    autoApply: JSON.parse(localStorage.getItem('autoApply') || 'true'),
    intervals: {
        basic: parseInt(localStorage.getItem('basicInterval') || '1000'),
        operation: parseInt(localStorage.getItem('operationInterval') || '800')
    },
    recruiterActivityStatus: JSON.parse(localStorage.getItem('recruiterActivityStatus') || '["不限"]'),
    // 自动发送图片简历相关配置
    useAutoSendImageResume: JSON.parse(localStorage.getItem('useAutoSendImageResume') || 'false'),
    imageResumePath: localStorage.getItem('imageResumePath') || '',
    imageResumeData: localStorage.getItem('imageResumeData') || null
};

// 面板主题的一致色板
const PANEL_THEME = {
    ink: '#383838',
    cream: '#F4EFEA',
    paper: '#FFFFFF',
    primary: '#6FC2FF',
    primaryHover: '#2BA5FF',
    secondary: '#53DBC9',
    neutral: '#A1A1A1',
    subtle: '#F8F8F7'
};

// 2. saveSettings函数，保存配置
function saveSettings() {
    localStorage.setItem('useAutoSendResume', settings.useAutoSendResume.toString());
    localStorage.setItem('excludeHeadhunters', settings.excludeHeadhunters.toString());
    localStorage.setItem('autoScrollSpeed', settings.autoScrollSpeed.toString());
    localStorage.setItem('customPhrases', JSON.stringify(settings.customPhrases));
    localStorage.setItem('clickDelay', settings.actionDelays.click.toString());
    localStorage.setItem('notificationsEnabled', settings.notifications.enabled.toString());
    localStorage.setItem('notificationSound', settings.notifications.sound.toString());
    localStorage.setItem('aiRole', settings.ai.role);
    localStorage.setItem('autoReply', settings.autoReply.toString());
    localStorage.setItem('autoApply', settings.autoApply.toString());
    localStorage.setItem('basicInterval', settings.intervals.basic.toString());
    localStorage.setItem('operationInterval', settings.intervals.operation.toString());
    localStorage.setItem('recruiterActivityStatus', JSON.stringify(settings.recruiterActivityStatus));
    // 保存图片简历配置
    localStorage.setItem('useAutoSendImageResume', settings.useAutoSendImageResume.toString());
    localStorage.setItem('imageResumePath', settings.imageResumePath);
    // 存储图片数据
    if (settings.imageResumeData) {
        localStorage.setItem('imageResumeData', settings.imageResumeData);
    } else {
        localStorage.removeItem('imageResumeData');
    }
}

// 3. loadSettings函数加载配置
function loadSettings() {
    settings.useAutoSendResume = JSON.parse(localStorage.getItem('useAutoSendResume') || 'true');
    settings.excludeHeadhunters = JSON.parse(localStorage.getItem('excludeHeadhunters') || 'false');
    settings.autoScrollSpeed = parseInt(localStorage.getItem('autoScrollSpeed') || '500');
    settings.customPhrases = JSON.parse(localStorage.getItem('customPhrases') || '[]');
    settings.actionDelays.click = parseInt(localStorage.getItem('clickDelay') || '130');
    settings.notifications.enabled = JSON.parse(localStorage.getItem('notificationsEnabled') || 'true');
    settings.notifications.sound = JSON.parse(localStorage.getItem('notificationSound') || 'true');
    settings.ai.role = localStorage.getItem('aiRole') || '你是大四应届生正冲刺秋招，目标是尽力得到可签三方的正式岗位，也接受优质实习机会。沟通中做到：1. 语气自然，回复简洁精炼，不堆砌文字；2. 主动呈现核心优势（可根据对方要求编造亮点，如专业技能、项目经验、实习经历等）；3. 若被询问联系方式，提供手机号 123456、微信号 BOSS；4. 全程表现对岗位的渴望，不冗余、不过度客气。';
    settings.autoReply = JSON.parse(localStorage.getItem('autoReply') || 'true');
    settings.autoApply = JSON.parse(localStorage.getItem('autoApply') || 'true');
    settings.intervals.basic = parseInt(localStorage.getItem('basicInterval') || '1000');
    settings.intervals.operation = parseInt(localStorage.getItem('operationInterval') || '800');
    settings.recruiterActivityStatus = JSON.parse(localStorage.getItem('recruiterActivityStatus') || '["不限"]');
    // 加载图片简历配置
    settings.useAutoSendImageResume = JSON.parse(localStorage.getItem('useAutoSendImageResume') || 'false');
    settings.imageResumePath = localStorage.getItem('imageResumePath') || '';
    settings.imageResumeData = localStorage.getItem('imageResumeData') || null;
}

// 4. createSettingsDialog函数添加新UI元素
function createSettingsDialog() {
    const dialog = document.createElement('div');
    dialog.id = 'boss-settings-dialog';
    dialog.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -60%);
        width: clamp(340px, 92vw, 620px);
        height: min(85vh, 720px);
        background: ${PANEL_THEME.cream};
        border-radius: 2px;
        border: 2px solid ${PANEL_THEME.ink};
        box-shadow: -18px 18px 0 ${PANEL_THEME.ink}, 0 20px 45px rgba(56, 56, 56, 0.25);
        z-index: 2147483646;
        display: none;
        flex-direction: column;
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        overflow: hidden;
        transition: transform 0.3s ease, opacity 0.3s ease;
        background-image: linear-gradient(120deg, rgba(255,255,255,0.9) 0%, rgba(244,239,234,0.95) 100%);
    `;

    dialog.innerHTML += `
        <style>
            #boss-settings-dialog {
                opacity: 0;
                transform: translate(-50%, -60%) scale(0.97);
            }
            #boss-settings-dialog.active {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1);
            }
            .setting-item {
                transition: transform 0.2s ease, box-shadow 0.2s ease;
            }
            .setting-item:hover {
                transform: translate(3px, -3px);
                box-shadow: -4px 4px 0 ${PANEL_THEME.ink};
            }
            .multi-select-container {
                position: relative;
                width: 100%;
                margin-top: 10px;
            }
            .multi-select-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 12px;
                border-radius: 2px;
                border: 2px solid ${PANEL_THEME.ink};
                background: ${PANEL_THEME.paper};
                cursor: pointer;
                transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
            }
            .multi-select-header:hover {
                background: ${PANEL_THEME.cream};
                transform: translate(3px, -3px);
                box-shadow: -4px 4px 0 ${PANEL_THEME.ink};
            }
            .multi-select-options {
                position: absolute;
                top: calc(100% + 8px);
                left: 0;
                right: 0;
                max-height: 200px;
                overflow-y: auto;
                border-radius: 2px;
                border: 2px solid ${PANEL_THEME.ink};
                background: ${PANEL_THEME.paper};
                z-index: 100;
                box-shadow: -8px 8px 0 ${PANEL_THEME.ink}, 0 12px 25px rgba(56,56,56,0.2);
                display: none;
            }
            .multi-select-option {
                padding: 12px 14px;
                cursor: pointer;
                transition: background 0.2s ease;
                font-family: 'Inter', sans-serif;
                font-size: 14px;
                color: ${PANEL_THEME.ink};
            }
            .multi-select-option:hover {
                background-color: ${PANEL_THEME.cream};
            }
            .multi-select-option.selected {
                background-color: rgba(111, 194, 255, 0.25);
            }
            .multi-select-clear {
                color: ${PANEL_THEME.neutral};
                cursor: pointer;
                margin-left: 5px;
                font-size: 16px;
                line-height: 1;
            }
            .multi-select-clear:hover {
                color: ${PANEL_THEME.ink};
            }
        </style>
    `;

    const dialogHeader = createDialogHeader('海投助手·BOSS设置');

    const dialogContent = document.createElement('div');
    dialogContent.style.cssText = `
        padding: 20px 24px 24px;
        flex: 1;
        overflow-y: auto;
        scrollbar-width: thin;
        scrollbar-color: ${PANEL_THEME.primary} rgba(0, 0, 0, 0);
    `;

    dialogContent.innerHTML += `
    <style>
        #boss-settings-dialog ::-webkit-scrollbar {
            width: 6px;
            height: 6px;
        }
        #boss-settings-dialog ::-webkit-scrollbar-track {
            background: transparent;
            margin: 10px 0;
        }
        #boss-settings-dialog ::-webkit-scrollbar-thumb {
            background: ${PANEL_THEME.primary};
            border-radius: 2px;
            border: 2px solid ${PANEL_THEME.ink};
            box-shadow: -2px 2px 0 ${PANEL_THEME.ink};
            transition: background 0.2s ease;
        }
        #boss-settings-dialog ::-webkit-scrollbar-thumb:hover {
            background: ${PANEL_THEME.primaryHover};
        }
    </style>
    `;

    const tabsContainer = document.createElement('div');
    tabsContainer.style.cssText = `
        display: flex;
        border-bottom: 2px solid ${PANEL_THEME.ink};
        margin-bottom: 16px;
        gap: 8px;
    `;

    const aiTab = document.createElement('button');
    aiTab.textContent = 'AI人设';
    aiTab.className = 'settings-tab active';
    aiTab.style.cssText = `
        padding: 10px 18px;
        background: ${PANEL_THEME.paper};
        color: ${PANEL_THEME.ink};
        border: 2px solid ${PANEL_THEME.ink};
        border-radius: 2px 2px 0 0;
        font-weight: 500;
        cursor: pointer;
        transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
        font-family: 'Monaco', 'Consolas', monospace;
        text-transform: uppercase;
        letter-spacing: 0.05em;
    `;

    const advancedTab = document.createElement('button');
    advancedTab.textContent = '高级设置';
    advancedTab.className = 'settings-tab';
    advancedTab.style.cssText = `
        padding: 10px 18px;
        background: ${PANEL_THEME.paper};
        color: ${PANEL_THEME.ink};
        border: 2px solid ${PANEL_THEME.ink};
        border-radius: 2px 2px 0 0;
        font-weight: 500;
        cursor: pointer;
        transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
        font-family: 'Monaco', 'Consolas', monospace;
        text-transform: uppercase;
        letter-spacing: 0.05em;
    `;

    const intervalTab = document.createElement('button');
    intervalTab.textContent = '间隔设置';
    intervalTab.className = 'settings-tab';
    intervalTab.style.cssText = `
        padding: 10px 18px;
        background: ${PANEL_THEME.paper};
        color: ${PANEL_THEME.ink};
        border: 2px solid ${PANEL_THEME.ink};
        border-radius: 2px 2px 0 0;
        font-weight: 500;
        cursor: pointer;
        transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
        font-family: 'Monaco', 'Consolas', monospace;
        text-transform: uppercase;
        letter-spacing: 0.05em;
    `;

    tabsContainer.append(aiTab, advancedTab, intervalTab);

    const aiSettingsPanel = document.createElement('div');
    aiSettingsPanel.id = 'ai-settings-panel';

    const roleSettingResult = createSettingItem(
        'AI角色定位',
        '定义AI在对话中的角色和语气特点',
        () => document.getElementById('ai-role-input')
    );

    const roleSetting = roleSettingResult.settingItem;

    const roleInput = document.createElement('textarea');
    roleInput.id = 'ai-role-input';
    roleInput.rows = 5;
    roleInput.style.cssText = `
        width: 100%;
        padding: 12px 14px;
        border-radius: 2px;
        border: 2px solid ${PANEL_THEME.ink};
        background: ${PANEL_THEME.paper};
        color: ${PANEL_THEME.ink};
        resize: vertical;
        font-size: 14px;
        transition: box-shadow 0.2s ease, background 0.2s ease;
        margin-top: 12px;
    `;

    addFocusBlurEffects(roleInput);
    roleSetting.append(roleInput);

    const presetRoleSettingResult = createSettingItem(
        '预设角色',
        '选择预设的AI角色模板',
        () => document.getElementById('ai-preset-select')
    );

    const presetRoleSetting = presetRoleSettingResult.settingItem;

    const presetSelect = document.createElement('select');
    presetSelect.id = 'ai-preset-select';
    presetSelect.style.cssText = `
        width: 100%;
        padding: 12px 14px;
        border-radius: 2px;
        border: 2px solid ${PANEL_THEME.ink};
        font-size: 14px;
        background: ${PANEL_THEME.paper};
        color: ${PANEL_THEME.ink};
        margin-top: 12px;
        transition: box-shadow 0.2s ease, background 0.2s ease;
    `;

    const presets = [
        { value: 'default', text: '默认角色' }
    ];

    presets.forEach(preset => {
        const option = document.createElement('option');
        option.value = preset.value;
        option.textContent = preset.text;
        presetSelect.appendChild(option);
    });

    presetSelect.addEventListener('change', () => {
        if (presetSelect.value !== 'custom') {
            const presetValues = {
                'default': '你是大四应届生正冲刺秋招，目标是尽力得到可签三方的正式岗位，也接受优质实习机会。沟通中做到：1. 语气自然，回复简洁精炼，不堆砌文字；2. 主动呈现核心优势（可根据对方要求编造亮点，如专业技能、项目经验、实习经历等）；3. 若被询问联系方式，提供手机号 123456、微信号 BOSS；4. 全程表现对岗位的渴望，不冗余、不过度客气。'
            };
            roleInput.value = presetValues[presetSelect.value];
        }
    });

    presetRoleSetting.append(presetSelect);
    aiSettingsPanel.append(roleSetting, presetRoleSetting);

    const advancedSettingsPanel = document.createElement('div');
    advancedSettingsPanel.id = 'advanced-settings-panel';
    advancedSettingsPanel.style.display = 'none';

    const autoReplySettingResult = createSettingItem(
        'Ai回复模式',
        '开启后Ai将自动回复消息',
        () => document.querySelector('#toggle-auto-reply-mode input')
    );

    const autoReplySetting = autoReplySettingResult.settingItem;
    const autoReplyDescriptionContainer = autoReplySettingResult.descriptionContainer;

    const autoReplyToggle = createToggleSwitch(
        'auto-reply-mode',
        settings.autoReply,
        (checked) => { settings.autoReply = checked; }
    );

    autoReplyDescriptionContainer.append(autoReplyToggle);

    const autoSendResumeSettingResult = createSettingItem(
        '自动发送简历',
        '开启后系统将自动发送简历给HR',
        () => document.querySelector('#toggle-auto-send-resume input')
    );

    const autoSendResumeSetting = autoSendResumeSettingResult.settingItem;
    const autoSendResumeDescriptionContainer = autoSendResumeSettingResult.descriptionContainer;

    const autoSendResumeToggle = createToggleSwitch(
        'auto-send-resume',
        settings.useAutoSendResume,
        (checked) => { settings.useAutoSendResume = checked; }
    );

    autoSendResumeDescriptionContainer.append(autoSendResumeToggle);

    const excludeHeadhuntersSettingResult = createSettingItem(
        '投递时排除猎头',
        '开启后将不会向猎头职位自动投递简历',
        () => document.querySelector('#toggle-exclude-headhunters input')
    );

    const excludeHeadhuntersSetting = excludeHeadhuntersSettingResult.settingItem;
    const excludeHeadhuntersDescriptionContainer = excludeHeadhuntersSettingResult.descriptionContainer;

    const excludeHeadhuntersToggle = createToggleSwitch(
        'exclude-headhunters',
        settings.excludeHeadhunters,
        (checked) => { settings.excludeHeadhunters = checked; }
    );

    excludeHeadhuntersDescriptionContainer.append(excludeHeadhuntersToggle);

    // 改进后的自动发送图片简历设置
    const imageResumeSettingResult = createSettingItem(
        '自动发送图片简历',
        '开启后将根据岗位智能选择发送图片简历给HR（最多添加3个）',
        () => document.querySelector('#toggle-auto-send-image-resume input')
    );

    const imageResumeSetting = imageResumeSettingResult.settingItem;
    const imageResumeDescriptionContainer = imageResumeSettingResult.descriptionContainer;

    // 确保全局state中的imageResumes数组已初始化
    if (!state.settings.imageResumes) {
        state.settings.imageResumes = [];
    }

    // 多图片简历上传容器
    const fileUploadsContainer = document.createElement('div');
    fileUploadsContainer.style.cssText = `
        display: flex;
        flex-direction: column;
        gap: 10px;
        width: 100%;
        margin-top: 10px;
    `;

    // 创建添加简历按钮
    const addResumeBtn = document.createElement('button');
    addResumeBtn.id = 'add-image-resume-btn';
    addResumeBtn.textContent = '添加图片简历（最多3个）';
    addResumeBtn.style.cssText = `
        padding: 12px 18px;
        border-radius: 2px;
        border: 2px solid ${PANEL_THEME.ink};
        background: ${PANEL_THEME.paper};
        color: ${PANEL_THEME.ink};
        cursor: pointer;
        font-size: 14px;
        font-family: 'Monaco', 'Consolas', monospace;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
        align-self: flex-start;
    `;

    addResumeBtn.addEventListener('mouseenter', () => {
        addResumeBtn.style.background = PANEL_THEME.cream;
        addResumeBtn.style.transform = 'translate(4px, -4px)';
        addResumeBtn.style.boxShadow = `-4px 4px 0 ${PANEL_THEME.ink}`;
    });

    addResumeBtn.addEventListener('mouseleave', () => {
        addResumeBtn.style.background = PANEL_THEME.paper;
        addResumeBtn.style.transform = 'translate(0, 0)';
        addResumeBtn.style.boxShadow = 'none';
    });

    // 创建隐藏的文件输入
    const hiddenFileInput = document.createElement('input');
    hiddenFileInput.type = 'file';
    hiddenFileInput.accept = 'image/*';
    hiddenFileInput.style.display = 'none';

    // 显示已上传简历的容器
    const uploadedResumesContainer = document.createElement('div');
    uploadedResumesContainer.id = 'uploaded-resumes-container';
    uploadedResumesContainer.style.cssText = `
        display: flex;
        flex-direction: column;
        gap: 8px;
        width: 100%;
    `;

    // 更新按钮状态
    function updateAddButtonState() {
        addResumeBtn.disabled = state.settings.imageResumes.length >= 3;
        addResumeBtn.style.opacity = state.settings.imageResumes.length >= 3 ? '0.5' : '1';
        addResumeBtn.style.cursor = state.settings.imageResumes.length >= 3 ? 'not-allowed' : 'pointer';
        addResumeBtn.textContent = state.settings.imageResumes.length >= 3 ? '已达最大限制（3个）' : '添加图片简历';
    }

    // 渲染简历项
    function renderResumeItem(index, resume) {
        const resumeItem = document.createElement('div');
        resumeItem.id = `resume-item-${index}`;
        resumeItem.style.cssText = `
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 10px 12px;
            border-radius: 2px;
            border: 2px solid ${PANEL_THEME.ink};
            background: ${PANEL_THEME.paper};
            width: 100%;
            box-shadow: -4px 4px 0 ${PANEL_THEME.ink};
        `;

        const fileNameSpan = document.createElement('span');
        fileNameSpan.style.cssText = `
            flex: 1;
            color: ${PANEL_THEME.ink};
            font-size: 14px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        `;
        fileNameSpan.textContent = resume.path;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = '删除';
        removeBtn.style.cssText = `
            padding: 6px 14px;
            border-radius: 2px;
            border: 2px solid #ff7169;
            background: rgba(255, 113, 105, 0.15);
            color: #A11D12;
            cursor: pointer;
            font-size: 12px;
            font-family: 'Monaco', 'Consolas', monospace;
            text-transform: uppercase;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
        `;

        removeBtn.addEventListener('mouseenter', () => {
            removeBtn.style.transform = 'translate(2px, -2px)';
            removeBtn.style.boxShadow = '-2px 2px 0 #A11D12';
        });

        removeBtn.addEventListener('mouseleave', () => {
            removeBtn.style.transform = 'translate(0, 0)';
            removeBtn.style.boxShadow = 'none';
        });

        // 删除简历
        removeBtn.addEventListener('click', () => {
            state.settings.imageResumes.splice(index, 1);
            resumeItem.remove();
            updateAddButtonState();
            updateToggleState();
            StatePersistence.saveState();
        });

        resumeItem.append(fileNameSpan, removeBtn);
        return resumeItem;
    }

    // 更新开关状态
    function updateToggleState() {
        const hasResumes = state.settings.imageResumes && state.settings.imageResumes.length > 0;
        const toggleInput = document.querySelector('#toggle-auto-send-image-resume input');

        if (!hasResumes) {
            state.settings.useAutoSendImageResume = false;
            if (toggleInput) {
                toggleInput.checked = false;
                toggleInput.dispatchEvent(new Event('change'));
            }
        }
    }

    // 初始渲染已上传的简历
    if (state.settings.imageResumes && state.settings.imageResumes.length > 0) {
        state.settings.imageResumes.forEach((resume, index) => {
            const resumeItem = renderResumeItem(index, resume);
            uploadedResumesContainer.appendChild(resumeItem);
        });
    }

    // 修改后的 createToggleSwitch 调用
    const autoSendImageResumeToggle = (() => {
        // 检查是否有简历，但保留用户的设置状态
        const hasResumes = state.settings.imageResumes && state.settings.imageResumes.length > 0;
        // UI上显示的状态是设置为true且有简历时才为true
        const displayState = hasResumes && state.settings.useAutoSendImageResume;

        return createToggleSwitch(
            'auto-send-image-resume',
            displayState,
            (checked) => {
                const hasResumes = state.settings.imageResumes && state.settings.imageResumes.length > 0;
                if (checked && !hasResumes) {
                    showNotification('请先添加至少一个图片简历', 'error');

                    return false; // 阻止后续处理
                }
                state.settings.useAutoSendImageResume = checked;
                StatePersistence.saveState(); // 保存设置
                return true;
            }
        );
    })();

    // 添加简历按钮点击事件
    addResumeBtn.addEventListener('click', () => {
        if (state.settings.imageResumes.length < 3) {
            hiddenFileInput.click();
        }
    });

    // 文件选择变化事件
    hiddenFileInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];

            // 检查是否已存在同名文件
            const isDuplicate = state.settings.imageResumes.some(resume => resume.path === file.name);
            if (isDuplicate) {
                showNotification('该文件名已存在', 'error');
                return;
            }

            // 读取图片并转换为Base64
            const reader = new FileReader();
            reader.onload = function (event) {
                const newResume = {
                    path: file.name,
                    data: event.target.result
                };

                state.settings.imageResumes.push(newResume);

                // 添加到UI
                const index = state.settings.imageResumes.length - 1;
                const resumeItem = renderResumeItem(index, newResume);
                uploadedResumesContainer.appendChild(resumeItem);

                // 更新按钮状态
                updateAddButtonState();

                // 自动启用开关
                if (!state.settings.useAutoSendImageResume) {
                    state.settings.useAutoSendImageResume = true;
                    const toggleInput = document.querySelector('#toggle-auto-send-image-resume input');
                    toggleInput.checked = true;
                    toggleInput.dispatchEvent(new Event('change'));
                }

                // 保存设置
                StatePersistence.saveState();
            };
            reader.readAsDataURL(file);
        }
    });

    // 初始化按钮状态
    updateAddButtonState();

    fileUploadsContainer.append(addResumeBtn, uploadedResumesContainer, hiddenFileInput);
    imageResumeDescriptionContainer.append(autoSendImageResumeToggle);
    imageResumeSetting.append(fileUploadsContainer);

    const recruiterStatusSettingResult = createSettingItem(
        '投递招聘者状态',
        '筛选活跃状态符合要求的招聘者进行投递',
        () => document.querySelector('#recruiter-status-select .select-header')
    );

    const recruiterStatusSetting = recruiterStatusSettingResult.settingItem;

    const statusSelect = document.createElement('div');
    statusSelect.id = 'recruiter-status-select';
    statusSelect.className = 'custom-select';
    statusSelect.style.cssText = `
        position: relative;
        width: 100%;
        margin-top: 10px;
    `;

    const statusHeader = document.createElement('div');
    statusHeader.className = 'select-header';
    statusHeader.style.cssText = `
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 16px;
        border-radius: 2px;
        border: 2px solid ${PANEL_THEME.ink};
        background: ${PANEL_THEME.paper};
        cursor: pointer;
        transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
        min-height: 48px;
    `;

    const statusDisplay = document.createElement('div');
    statusDisplay.className = 'select-value';
    statusDisplay.style.cssText = `
        flex: 1;
        text-align: left;
        color: ${PANEL_THEME.ink};
        font-size: 14px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    `;
    statusDisplay.textContent = getStatusDisplayText();

    const statusIcon = document.createElement('div');
    statusIcon.className = 'select-icon';
    statusIcon.innerHTML = '&#9660;';
    statusIcon.style.cssText = `
        margin-left: 10px;
        color: ${PANEL_THEME.ink};
        transition: transform 0.2s ease;
    `;

    const statusClear = document.createElement('button');
    statusClear.className = 'select-clear';
    statusClear.innerHTML = '×';
    statusClear.style.cssText = `
        background: none;
        border: none;
        color: ${PANEL_THEME.neutral};
        cursor: pointer;
        font-size: 16px;
        margin-left: 8px;
        display: none;
        transition: color 0.2s ease;
    `;

    statusHeader.append(statusDisplay, statusClear, statusIcon);

    const statusOptions = document.createElement('div');
    statusOptions.className = 'select-options';
    statusOptions.style.cssText = `
        position: absolute;
        top: calc(100% + 6px);
        left: 0;
        right: 0;
        max-height: 240px;
        overflow-y: auto;
        border-radius: 2px;
        border: 2px solid ${PANEL_THEME.ink};
        background: ${PANEL_THEME.paper};
        z-index: 100;
        box-shadow: -8px 8px 0 ${PANEL_THEME.ink}, 0 12px 25px rgba(56,56,56,0.2);
        display: none;
        transition: all 0.2s ease;
        scrollbar-width: thin;
        scrollbar-color: ${PANEL_THEME.primary} ${PANEL_THEME.cream};
    `;

    statusOptions.innerHTML += `
        <style>
            .select-options::-webkit-scrollbar {
                width: 6px;
            }
            .select-options::-webkit-scrollbar-track {
                background: ${PANEL_THEME.cream};
            }
            .select-options::-webkit-scrollbar-thumb {
                background: ${PANEL_THEME.primary};
                border-radius: 2px;
                border: 2px solid ${PANEL_THEME.ink};
            }
            .select-options::-webkit-scrollbar-thumb:hover {
                background: ${PANEL_THEME.primaryHover};
            }
            .select-options .select-option.selected {
                background: rgba(111, 194, 255, 0.2);
            }
        </style>
    `;

    const statusOptionsList = [
        { value: '不限', text: '不限' },
        { value: '在线', text: '在线' },
        { value: '刚刚活跃', text: '刚刚活跃' },
        { value: '今日活跃', text: '今日活跃' },
        { value: '3日内活跃', text: '3日内活跃' },
        { value: '本周活跃', text: '本周活跃' },
        { value: '本月活跃', text: '本月活跃' },
        { value: '半年前活跃', text: '半年前活跃' }
    ];

    statusOptionsList.forEach(option => {
        const statusOption = document.createElement('div');
        statusOption.className = 'select-option' + (settings.recruiterActivityStatus.includes(option.value) ? ' selected' : '');
        statusOption.dataset.value = option.value;
        statusOption.style.cssText = `
            padding: 12px 16px;
            cursor: pointer;
            transition: background 0.2s ease;
            display: flex;
            align-items: center;
            font-size: 14px;
            color: ${PANEL_THEME.ink};
        `;

        const checkIcon = document.createElement('span');
        checkIcon.className = 'check-icon';
        checkIcon.innerHTML = '✓';
        checkIcon.style.cssText = `
            margin-right: 8px;
            color: ${PANEL_THEME.primary};
            font-weight: bold;
            display: ${settings.recruiterActivityStatus.includes(option.value) ? 'inline' : 'none'};
        `;

        const textSpan = document.createElement('span');
        textSpan.textContent = option.text;

        statusOption.append(checkIcon, textSpan);

        statusOption.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleStatusOption(option.value);
        });

        statusOptions.appendChild(statusOption);
    });

    statusHeader.addEventListener('click', () => {
        statusOptions.style.display = statusOptions.style.display === 'block' ? 'none' : 'block';
        statusIcon.style.transform = statusOptions.style.display === 'block' ? 'rotate(180deg)' : 'rotate(0)';
    });

    statusClear.addEventListener('click', (e) => {
        e.stopPropagation();
        settings.recruiterActivityStatus = [];
        updateStatusOptions();
    });

    document.addEventListener('click', (e) => {
        if (!statusSelect.contains(e.target)) {
            statusOptions.style.display = 'none';
            statusIcon.style.transform = 'rotate(0)';
        }
    });

    statusHeader.addEventListener('mouseenter', () => {
        statusHeader.style.background = PANEL_THEME.cream;
        statusHeader.style.transform = 'translate(4px, -4px)';
        statusHeader.style.boxShadow = `-4px 4px 0 ${PANEL_THEME.ink}`;
    });

    statusHeader.addEventListener('mouseleave', () => {
        if (!statusHeader.contains(document.activeElement)) {
            statusHeader.style.background = PANEL_THEME.paper;
            statusHeader.style.transform = 'translate(0, 0)';
            statusHeader.style.boxShadow = 'none';
        }
    });

    statusHeader.addEventListener('focus', () => {
        statusHeader.style.background = PANEL_THEME.cream;
        statusHeader.style.transform = 'translate(4px, -4px)';
        statusHeader.style.boxShadow = `-4px 4px 0 ${PANEL_THEME.ink}`;
    });

    statusHeader.addEventListener('blur', () => {
        statusHeader.style.background = PANEL_THEME.paper;
        statusHeader.style.transform = 'translate(0, 0)';
        statusHeader.style.boxShadow = 'none';
    });

    statusSelect.append(statusHeader, statusOptions);
    recruiterStatusSetting.append(statusSelect);

    advancedSettingsPanel.append(autoReplySetting, autoSendResumeSetting, excludeHeadhuntersSetting, imageResumeSetting, recruiterStatusSetting);

    const intervalSettingsPanel = document.createElement('div');
    intervalSettingsPanel.id = 'interval-settings-panel';
    intervalSettingsPanel.style.display = 'none';

    const basicIntervalSettingResult = createSettingItem(
        '基本间隔',
        '滚动、检查新聊天等间隔时间（毫秒）',
        () => document.getElementById('basic-interval-input')
    );

    const basicIntervalSetting = basicIntervalSettingResult.settingItem;

    const basicIntervalInput = document.createElement('input');
    basicIntervalInput.id = 'basic-interval-input';
    basicIntervalInput.type = 'number';
    basicIntervalInput.min = 500;
    basicIntervalInput.max = 10000;
    basicIntervalInput.step = 100;
    basicIntervalInput.style.cssText = `
        width: 100%;
        padding: 12px 14px;
        border-radius: 2px;
        border: 2px solid ${PANEL_THEME.ink};
        font-size: 14px;
        margin-top: 12px;
        background: ${PANEL_THEME.paper};
        color: ${PANEL_THEME.ink};
        transition: box-shadow 0.2s ease;
    `;

    addFocusBlurEffects(basicIntervalInput);
    basicIntervalSetting.append(basicIntervalInput);

    const operationIntervalSettingResult = createSettingItem(
        '操作间隔',
        '点击沟通按钮之间的间隔时间（毫秒）',
        () => document.getElementById('operation-interval-input')
    );

    const operationIntervalSetting = operationIntervalSettingResult.settingItem;

    const operationIntervalInput = document.createElement('input');
    operationIntervalInput.id = 'operation-interval-input';
    operationIntervalInput.type = 'number';
    operationIntervalInput.min = 100;
    operationIntervalInput.max = 2000;
    operationIntervalInput.step = 50;
    operationIntervalInput.style.cssText = `
        width: 100%;
        padding: 12px 14px;
        border-radius: 2px;
        border: 2px solid ${PANEL_THEME.ink};
        font-size: 14px;
        margin-top: 12px;
        background: ${PANEL_THEME.paper};
        color: ${PANEL_THEME.ink};
        transition: box-shadow 0.2s ease;
    `;

    addFocusBlurEffects(operationIntervalInput);
    operationIntervalSetting.append(operationIntervalInput);

    const scrollSpeedSettingResult = createSettingItem(
        '自动滚动速度',
        '页面自动滚动的速度 (毫秒/像素)',
        () => document.getElementById('scroll-speed-input')
    );

    const scrollSpeedSetting = scrollSpeedSettingResult.settingItem;

    const scrollSpeedInput = document.createElement('input');
    scrollSpeedInput.id = 'scroll-speed-input';
    scrollSpeedInput.type = 'number';
    scrollSpeedInput.min = 100;
    scrollSpeedInput.max = 2000;
    scrollSpeedInput.step = 50;
    scrollSpeedInput.style.cssText = `
        width: 100%;
        padding: 12px 14px;
        border-radius: 2px;
        border: 2px solid ${PANEL_THEME.ink};
        font-size: 14px;
        margin-top: 12px;
        background: ${PANEL_THEME.paper};
        color: ${PANEL_THEME.ink};
        transition: box-shadow 0.2s ease;
    `;

    addFocusBlurEffects(scrollSpeedInput);
    scrollSpeedSetting.append(scrollSpeedInput);

    intervalSettingsPanel.append(basicIntervalSetting, operationIntervalSetting, scrollSpeedSetting);

    aiTab.style.background = 'var(--primary-color)';
    aiTab.style.color = PANEL_THEME.ink;
    aiTab.style.transform = 'translate(4px, -4px)';
    aiTab.style.boxShadow = `-4px 4px 0 ${PANEL_THEME.ink}`;

    aiTab.addEventListener('click', () => {
        setActiveTab(aiTab, aiSettingsPanel);
    });

    advancedTab.addEventListener('click', () => {
        setActiveTab(advancedTab, advancedSettingsPanel);
    });

    intervalTab.addEventListener('click', () => {
        setActiveTab(intervalTab, intervalSettingsPanel);
    });

    const dialogFooter = document.createElement('div');
    dialogFooter.style.cssText = `
        padding: 16px 24px;
        border-top: 2px solid ${PANEL_THEME.ink};
        display: flex;
        justify-content: flex-end;
        gap: 12px;
        background: ${PANEL_THEME.paper};
    `;

    const cancelBtn = createTextButton(
        '取消',
        PANEL_THEME.paper,
        () => {
            dialog.classList.remove('active');
            setTimeout(() => {
                dialog.style.display = 'none';
            }, 150);
        }
    );

    const saveBtn = createTextButton(
        '保存设置',
        'var(--primary-color)',
        () => {
            try {
                const aiRoleInput = document.getElementById('ai-role-input');
                settings.ai.role = aiRoleInput ? aiRoleInput.value : '';

                const basicIntervalInput = document.getElementById('basic-interval-input');
                const basicIntervalValue = basicIntervalInput ? parseInt(basicIntervalInput.value) : settings.intervals.basic;
                settings.intervals.basic = isNaN(basicIntervalValue) ? settings.intervals.basic : basicIntervalValue;

                const operationIntervalInput = document.getElementById('operation-interval-input');
                const operationIntervalValue = operationIntervalInput ? parseInt(operationIntervalInput.value) : settings.intervals.operation;
                settings.intervals.operation = isNaN(operationIntervalValue) ? settings.intervals.operation : operationIntervalValue;

                const scrollSpeedInput = document.getElementById('scroll-speed-input');
                const scrollSpeedValue = scrollSpeedInput ? parseInt(scrollSpeedInput.value) : settings.autoScrollSpeed;
                settings.autoScrollSpeed = isNaN(scrollSpeedValue) ? settings.autoScrollSpeed : scrollSpeedValue;

                saveSettings();

                showNotification('设置已保存');
                dialog.classList.remove('active');
                setTimeout(() => {
                    dialog.style.display = 'none';
                }, 150);
            } catch (error) {
                showNotification('保存失败: ' + error.message, 'error');
                console.error('保存设置失败:', error);
            }
        }
    );

    dialogFooter.append(cancelBtn, saveBtn);

    dialogContent.append(tabsContainer, aiSettingsPanel, advancedSettingsPanel, intervalSettingsPanel);
    dialog.append(dialogHeader, dialogContent, dialogFooter);

    dialog.addEventListener('click', (e) => {
        if (e.target === dialog) {
            dialog.classList.remove('active');
            setTimeout(() => {
                dialog.style.display = 'none';
            }, 150);
        }
    });

    return dialog;
}

function showSettingsDialog() {
    let dialog = document.getElementById('boss-settings-dialog');
    if (!dialog) {
        dialog = createSettingsDialog();
        document.body.appendChild(dialog);
    }

    dialog.style.display = 'flex';

    setTimeout(() => {
        dialog.classList.add('active');
        setTimeout(loadSettingsIntoUI, 100);
    }, 10);
}

function toggleStatusOption(value) {
    if (value === '不限') {
        settings.recruiterActivityStatus = settings.recruiterActivityStatus.includes('不限') ? [] : ['不限'];
    } else {
        if (settings.recruiterActivityStatus.includes('不限')) {
            settings.recruiterActivityStatus = [value];
        } else {
            if (settings.recruiterActivityStatus.includes(value)) {
                settings.recruiterActivityStatus = settings.recruiterActivityStatus.filter(v => v !== value);
            } else {
                settings.recruiterActivityStatus.push(value);
            }

            if (settings.recruiterActivityStatus.length === 0) {
                settings.recruiterActivityStatus = ['不限'];
            }
        }
    }

    updateStatusOptions();
}

function updateStatusOptions() {
    const options = document.querySelectorAll('#recruiter-status-select .select-option');
    options.forEach(option => {
        const isSelected = settings.recruiterActivityStatus.includes(option.dataset.value);
        option.className = 'select-option' + (isSelected ? ' selected' : '');
        option.querySelector('.check-icon').style.display = isSelected ? 'inline' : 'none';

        if (option.dataset.value === '不限') {
            if (isSelected) {
                options.forEach(opt => {
                    if (opt.dataset.value !== '不限') {
                        opt.className = 'select-option';
                        opt.querySelector('.check-icon').style.display = 'none';
                    }
                });
            }
        }
    });

    document.querySelector('#recruiter-status-select .select-value').textContent = getStatusDisplayText();

    document.querySelector('#recruiter-status-select .select-clear').style.display =
        settings.recruiterActivityStatus.length > 0 && !settings.recruiterActivityStatus.includes('不限') ? 'inline' : 'none';
}

function getStatusDisplayText() {
    if (settings.recruiterActivityStatus.includes('不限')) {
        return '不限';
    }

    if (settings.recruiterActivityStatus.length === 0) {
        return '请选择';
    }

    if (settings.recruiterActivityStatus.length <= 2) {
        return settings.recruiterActivityStatus.join('、');
    }

    return `${settings.recruiterActivityStatus[0]}、${settings.recruiterActivityStatus[1]}等${settings.recruiterActivityStatus.length}项`;
}

function loadSettingsIntoUI() {
    const aiRoleInput = document.getElementById('ai-role-input');
    if (aiRoleInput) {
        aiRoleInput.value = settings.ai.role;
    }

    const autoReplyInput = document.querySelector('#toggle-auto-reply-mode input');
    if (autoReplyInput) {
        autoReplyInput.checked = settings.autoReply;
    }

    const autoSendResumeInput = document.querySelector('#toggle-auto-send-resume input');
    if (autoSendResumeInput) {
        autoSendResumeInput.checked = settings.useAutoSendResume;
    }

    const excludeHeadhuntersInput = document.querySelector('#toggle-exclude-headhunters input');
    if (excludeHeadhuntersInput) {
        excludeHeadhuntersInput.checked = settings.excludeHeadhunters;
    }

    const basicIntervalInput = document.getElementById('basic-interval-input');
    if (basicIntervalInput) {
        basicIntervalInput.value = settings.intervals.basic.toString();
    }

    const operationIntervalInput = document.getElementById('operation-interval-input');
    if (operationIntervalInput) {
        operationIntervalInput.value = settings.intervals.operation.toString();
    }

    const scrollSpeedInput = document.getElementById('scroll-speed-input');
    if (scrollSpeedInput) {
        scrollSpeedInput.value = settings.autoScrollSpeed.toString();
    }

    // 加载图片简历设置
    const autoSendImageResumeInput = document.querySelector('#toggle-auto-send-image-resume input');
    if (autoSendImageResumeInput) {
        // 只有在有图片文件时才允许开启
        autoSendImageResumeInput.checked = settings.useAutoSendImageResume && settings.imageResumePath;
    }

    const fileNameDisplay = document.getElementById('image-resume-filename');
    if (fileNameDisplay) {
        fileNameDisplay.textContent = settings.imageResumePath || '未选择文件';
    }

    updateStatusOptions();
}

function createDialogHeader(title) {
    const header = document.createElement('div');
    header.style.cssText = `
        padding: 18px 24px;
        background: ${PANEL_THEME.paper};
        color: ${PANEL_THEME.ink};
        font-size: 18px;
        font-weight: 500;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 2px solid ${PANEL_THEME.ink};
    `;

    const titleElement = document.createElement('div');
    titleElement.textContent = title;
    titleElement.style.cssText = `
        font-family: 'Monaco', 'Consolas', monospace;
        letter-spacing: 0.08em;
        text-transform: uppercase;
    `;

    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '✕';
    closeBtn.title = '关闭设置';
    closeBtn.style.cssText = `
        width: 36px;
        height: 36px;
        background: ${PANEL_THEME.paper};
        color: ${PANEL_THEME.ink};
        border-radius: 2px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
        border: 2px solid ${PANEL_THEME.ink};
        font-size: 16px;
    `;

    closeBtn.addEventListener('mouseenter', () => {
        closeBtn.style.transform = 'translate(3px, -3px)';
        closeBtn.style.boxShadow = `-3px 3px 0 ${PANEL_THEME.ink}`;
    });

    closeBtn.addEventListener('mouseleave', () => {
        closeBtn.style.transform = 'translate(0, 0)';
        closeBtn.style.boxShadow = 'none';
    });

    closeBtn.addEventListener('click', () => {
        const dialog = document.getElementById('boss-settings-dialog');
        if (dialog) {
            dialog.classList.remove('active');
            setTimeout(() => {
                dialog.style.display = 'none';
            }, 150);
        }
    });

    header.append(titleElement, closeBtn);
    return header;
}

function createSettingItem(title, description, controlGetter) {
    const settingItem = document.createElement('div');
    settingItem.className = 'setting-item';
    settingItem.style.cssText = `
        padding: 18px 20px;
        border-radius: 2px;
        margin-bottom: 16px;
        background: ${PANEL_THEME.paper};
        box-shadow: -6px 6px 0 ${PANEL_THEME.ink};
        border: 2px solid ${PANEL_THEME.ink};
        display: flex;
        flex-direction: column;
        gap: 10px;
    `;

    const titleElement = document.createElement('h4');
    titleElement.textContent = title;
    titleElement.style.cssText = `
        margin: 0;
        color: ${PANEL_THEME.ink};
        font-size: 15px;
        font-weight: 500;
        letter-spacing: 0.05em;
        text-transform: uppercase;
    `;

    const descElement = document.createElement('p');
    descElement.textContent = description;
    descElement.style.cssText = `
        margin: 4px 0 0;
        color: ${PANEL_THEME.neutral};
        font-size: 13px;
        line-height: 1.5;
    `;

    const descriptionContainer = document.createElement('div');
    descriptionContainer.style.cssText = `
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        gap: 12px;
    `;

    const textContainer = document.createElement('div');
    textContainer.append(titleElement, descElement);

    descriptionContainer.append(textContainer);

    settingItem.append(descriptionContainer);

    settingItem.addEventListener('click', () => {
        const control = controlGetter();
        if (control && typeof control.focus === 'function') {
            control.focus();
        }
    });

    return {
        settingItem,
        descriptionContainer
    };
}

function createToggleSwitch(id, isChecked, onChange) {
    const container = document.createElement('div');
    container.className = 'toggle-container';
    container.style.cssText = 'display: flex; justify-content: space-between; align-items: center;';

    const switchContainer = document.createElement('div');
    switchContainer.className = 'toggle-switch';
    switchContainer.style.cssText = `
        position: relative;
        width: 64px;
        height: 28px;
        border-radius: 2px;
        border: 2px solid ${PANEL_THEME.ink};
        background: ${isChecked ? 'var(--primary-color)' : PANEL_THEME.paper};
        transition: background 0.2s ease;
        cursor: pointer;
    `;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = `toggle-${id}`;
    checkbox.checked = isChecked;
    checkbox.style.display = 'none';

    const slider = document.createElement('span');
    slider.className = 'toggle-slider';
    slider.style.cssText = `
        position: absolute;
        top: 2px;
        left: ${isChecked ? '34px' : '2px'};
        width: 24px;
        height: 24px;
        border-radius: 2px;
        background-color: ${PANEL_THEME.paper};
        border: 2px solid ${PANEL_THEME.ink};
        box-shadow: -2px 2px 0 ${PANEL_THEME.ink};
        transition: left 0.2s ease;
    `;

    // 新增强制状态同步函数
    const forceUpdateUI = (checked) => {
        checkbox.checked = checked;
        switchContainer.style.background = checked ? 'var(--primary-color)' : PANEL_THEME.paper;
        slider.style.left = checked ? '34px' : '2px';
    };

    checkbox.addEventListener('change', () => {
        let allowChange = true;

        if (onChange) {
            // 回调函数可通过返回 false 阻断状态更新
            allowChange = onChange(checkbox.checked) !== false;
        }

        if (!allowChange) {
            // 非法操作时立即恢复原状态（不触发动画）
            forceUpdateUI(!checkbox.checked);
            return;
        }

        // 正常操作更新UI
        forceUpdateUI(checkbox.checked);
    });

    switchContainer.addEventListener('click', () => {
        // 直接触发状态变化（不再通过模拟事件）
        const newState = !checkbox.checked;

        if (onChange) {
            if (onChange(newState) !== false) {
                forceUpdateUI(newState);
            }
        } else {
            forceUpdateUI(newState);
        }
    });

    switchContainer.append(checkbox, slider);
    container.append(switchContainer);

    return container;
}

function createTextButton(text, backgroundColor, onClick) {
    const button = document.createElement('button');
    button.textContent = text;
    const defaultBackground = backgroundColor || PANEL_THEME.paper;
    const isAccentButton = defaultBackground !== PANEL_THEME.paper;
    button.style.cssText = `
        padding: 12px 22px;
        border-radius: 2px;
        border: 2px solid ${PANEL_THEME.ink};
        font-size: 13px;
        font-weight: 500;
        cursor: pointer;
        transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
        background: ${defaultBackground};
        color: ${PANEL_THEME.ink};
        font-family: 'Monaco', 'Consolas', monospace;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        box-shadow: -4px 4px 0 ${PANEL_THEME.ink};
        min-width: 120px;
    `;

    button.addEventListener('mouseenter', () => {
        button.style.background = isAccentButton ? PANEL_THEME.primaryHover : PANEL_THEME.cream;
        button.style.transform = 'translate(4px, -4px)';
        button.style.boxShadow = `-4px 4px 0 ${PANEL_THEME.ink}`;
    });

    button.addEventListener('mouseleave', () => {
        button.style.background = defaultBackground;
        button.style.transform = 'translate(0, 0)';
        button.style.boxShadow = '-4px 4px 0 ' + PANEL_THEME.ink;
    });

    button.addEventListener('mousedown', () => {
        button.style.transform = 'translate(0, 0)';
        button.style.boxShadow = 'none';
    });

    button.addEventListener('mouseup', () => {
        button.style.transform = 'translate(4px, -4px)';
        button.style.boxShadow = `-4px 4px 0 ${PANEL_THEME.ink}`;
    });

    button.addEventListener('click', onClick);

    return button;
}

function addFocusBlurEffects(element) {
    element.addEventListener('focus', () => {
        element.style.borderColor = 'var(--primary-color)';
        element.style.boxShadow = `-4px 4px 0 ${PANEL_THEME.ink}`;
    });

    element.addEventListener('blur', () => {
        element.style.borderColor = PANEL_THEME.ink;
        element.style.boxShadow = 'none';
    });
}

function setActiveTab(tab, panel) {
    const tabs = document.querySelectorAll('.settings-tab');
    const panels = [
        document.getElementById('ai-settings-panel'),
        document.getElementById('advanced-settings-panel'),
        document.getElementById('interval-settings-panel')
    ];

    tabs.forEach(t => {
        t.classList.remove('active');
        t.style.background = PANEL_THEME.paper;
        t.style.color = PANEL_THEME.ink;
        t.style.transform = 'translate(0, 0)';
        t.style.boxShadow = 'none';
    });

    panels.forEach(p => {
        if (p) {
            p.style.display = 'none';
        }
    });

    tab.classList.add('active');
    tab.style.background = 'var(--primary-color)';
    tab.style.color = PANEL_THEME.ink;
    tab.style.transform = 'translate(4px, -4px)';
    tab.style.boxShadow = `-4px 4px 0 ${PANEL_THEME.ink}`;

    if (panel) {
        panel.style.display = 'block';
    }
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    const bgColor = type === 'success' ? PANEL_THEME.secondary : '#FF7169';

    notification.style.cssText = `
        position: fixed;
        top: 24px;
        left: 50%;
        transform: translateX(-50%);
        background: ${bgColor};
        color: ${PANEL_THEME.ink};
        padding: 12px 20px;
        border-radius: 2px;
        border: 2px solid ${PANEL_THEME.ink};
        box-shadow: -6px 6px 0 ${PANEL_THEME.ink};
        z-index: 9999999;
        opacity: 0;
        transition: opacity 0.3s ease;
        font-family: 'Monaco', 'Consolas', monospace;
        text-transform: uppercase;
        letter-spacing: 0.05em;
    `;

    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => notification.style.opacity = '1', 10);
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => document.body.removeChild(notification), 300);
    }, 2000);
}

function filterJobsByKeywords(jobDescriptions) {
    const excludeKeywords = [];
    const includeKeywords = [];

    return jobDescriptions.filter(description => {
        for (const keyword of excludeKeywords) {
            if (description.includes(keyword)) {
                return false;
            }
        }

        if (includeKeywords.length > 0) {
            return includeKeywords.some(keyword => description.includes(keyword));
        }

        return true;
    });
}

// 导出到全局
window.showSettingsDialog = showSettingsDialog;
window.settings = settings;
