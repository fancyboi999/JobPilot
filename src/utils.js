function toggleProcess() {
    state.isRunning = !state.isRunning;

    if (state.isRunning) {
        // 获取职位名包含与工作地包含关键词
        state.includeKeywords = elements.includeInput.value.trim().toLowerCase().split(',').filter(keyword => keyword.trim() !== '');
        state.locationKeywords = (elements.locationInput?.value || '').trim().toLowerCase().split(',').filter(keyword => keyword.trim() !== '');

        elements.controlBtn.textContent = '停止海投';
        elements.controlBtn.style.background = `linear-gradient(45deg, ${CONFIG.COLORS.SECONDARY}, #f44336)`;

        const startTime = new Date();
        Core.log(`开始自动海投，时间：${startTime.toLocaleTimeString()}`);
        Core.log(`筛选条件：职位名包含【${state.includeKeywords.join('、') || '无'}】，工作地包含【${state.locationKeywords.join('、') || '无'}】`);

        Core.startProcessing();
    } else {
        elements.controlBtn.textContent = '启动海投';
        elements.controlBtn.style.background = `linear-gradient(45deg, ${CONFIG.COLORS.PRIMARY}, #4db6ac)`;

        state.isRunning = false;

        const stopTime = new Date();
        Core.log(`停止自动海投，时间：${stopTime.toLocaleTimeString()}`);
        Core.log(`本次共沟通 ${state.currentIndex} 个岗位`);

        state.currentIndex = 0;
    }
}

function startSendGreetings() {
    if (state.isRunning) {
        stopChatProcess();
        return;
    }

    state.isRunning = true;
    state.chatMode = 'GREETINGS';

    // 更新按钮状态
    updateChatButtonsState(true, 'greetings');

    const startTime = new Date();
    Core.log(`开始发送常用语，时间：${startTime.toLocaleTimeString()}`);

    Core.startProcessing();
}

function startSendImageResume() {
    if (state.isRunning) {
        stopChatProcess();
        return;
    }

    state.isRunning = true;
    state.chatMode = 'IMAGE_RESUME';

    updateChatButtonsState(true, 'imageResume');

    const startTime = new Date();
    Core.log(`开始发送图片简历，时间：${startTime.toLocaleTimeString()}`);

    Core.startProcessing();
}

function startAiReply() {
    if (state.isRunning) {
        stopChatProcess();
        return;
    }

    state.isRunning = true;
    state.chatMode = 'AI_REPLY';

    updateChatButtonsState(true, 'aiReply');

    const startTime = new Date();
    Core.log(`开始AI回复，时间：${startTime.toLocaleTimeString()}`);

    Core.startProcessing();
}

function stopChatProcess() {
    state.isRunning = false;
    state.chatMode = null;

    updateChatButtonsState(false);

    // 断开消息监听
    if (Core.messageObserver) {
        Core.messageObserver.disconnect();
        Core.messageObserver = null;
    }

    const stopTime = new Date();
    Core.log(`停止操作，时间：${stopTime.toLocaleTimeString()}`);
}

function updateChatButtonsState(isRunning, activeMode = null) {
    const greetingsBtn = document.getElementById('btn-greetings');
    const resumeBtn = document.getElementById('btn-image-resume');
    const aiBtn = document.getElementById('btn-ai-reply');

    if (!greetingsBtn || !resumeBtn || !aiBtn) return;

    if (isRunning) {
        // 禁用所有按钮，除了当前运行的按钮变为"停止"
        greetingsBtn.disabled = activeMode !== 'greetings';
        resumeBtn.disabled = activeMode !== 'imageResume';
        aiBtn.disabled = activeMode !== 'aiReply';

        if (activeMode === 'greetings') {
            greetingsBtn.textContent = '停止发送';
            greetingsBtn.style.background = `linear-gradient(45deg, ${CONFIG.COLORS.SECONDARY}, #f44336)`;
        } else if (activeMode === 'imageResume') {
            resumeBtn.textContent = '停止发送';
            resumeBtn.style.background = `linear-gradient(45deg, ${CONFIG.COLORS.SECONDARY}, #f44336)`;
        } else if (activeMode === 'aiReply') {
            aiBtn.textContent = '停止回复';
            aiBtn.style.background = `linear-gradient(45deg, ${CONFIG.COLORS.SECONDARY}, #f44336)`;
        }
    } else {
        // 恢复所有按钮
        greetingsBtn.disabled = false;
        resumeBtn.disabled = false;
        aiBtn.disabled = false;

        greetingsBtn.textContent = '发常用语';
        resumeBtn.textContent = '发图片简历';
        aiBtn.textContent = 'AI回复';

        greetingsBtn.style.background = 'var(--primary-color)';
        resumeBtn.style.background = 'var(--primary-color)';
        aiBtn.style.background = 'var(--primary-color)';
    }
}

function showCustomAlert(message) {
    const overlay = document.createElement('div');
    overlay.id = 'custom-alert-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        backdrop-filter: blur(3px);
        animation: fadeIn 0.3s ease-out;
    `;

    const dialog = document.createElement('div');
    dialog.id = 'custom-alert-dialog';
    dialog.style.cssText = `
        background: white;
        border-radius: 16px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        width: 90%;
        max-width: 400px;
        overflow: hidden;
        transform: scale(0.95);
        animation: scaleIn 0.3s ease-out forwards;
    `;

    const header = document.createElement('div');
    header.style.cssText = `
        padding: 16px 24px;
        background: ${CONFIG.COLORS.PRIMARY};
        color: white;
        font-size: 18px;
        font-weight: 500;
        display: flex;
        justify-content: space-between;
        align-items: center;
    `;
    header.innerHTML = `<span>JOBPILOT 投递助手</span><i class="fa fa-info-circle ml-2"></i>`;

    const content = document.createElement('div');
    content.style.cssText = `
        padding: 24px;
        font-size: 16px;
        line-height: 1.8;
        color: #333;
    `;
    content.innerHTML = message.replace(/\n/g, '<br>');

    const footer = document.createElement('div');
    footer.style.cssText = `
        padding: 12px 24px;
        display: flex;
        justify-content: center;
        border-top: 1px solid #eee;
    `;

    const confirmBtn = document.createElement('button');
    confirmBtn.style.cssText = `
        background: ${CONFIG.COLORS.PRIMARY};
        color: white;
        border: none;
        border-radius: 8px;
        padding: 10px 24px;
        font-size: 16px;
        cursor: pointer;
        transition: all 0.3s;
        box-shadow: 0 4px 12px rgba(33, 150, 243, 0.4);
    `;
    confirmBtn.textContent = '确定';

    confirmBtn.addEventListener('click', () => {
        overlay.remove();
    });

    confirmBtn.addEventListener('mouseenter', () => {
        confirmBtn.style.transform = 'translateY(-2px)';
        confirmBtn.style.boxShadow = '0 6px 16px rgba(33, 150, 243, 0.5)';
    });

    confirmBtn.addEventListener('mouseleave', () => {
        confirmBtn.style.transform = 'translateY(0)';
        confirmBtn.style.boxShadow = '0 4px 12px rgba(33, 150, 243, 0.4)';
    });

    footer.appendChild(confirmBtn);

    dialog.appendChild(header);
    dialog.appendChild(content);
    dialog.appendChild(footer);

    overlay.appendChild(dialog);

    document.body.appendChild(overlay);

    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        @keyframes scaleIn {
            from {
                transform: scale(0.95);
                opacity: 0;
            }
            to {
                transform: scale(1);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
}

function showConfirmDialog(message, confirmCallback, cancelCallback) {
    const overlay = document.createElement('div');
    overlay.id = 'custom-confirm-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        backdrop-filter: blur(3px);
        animation: fadeIn 0.3s ease-out;
    `;

    const dialog = document.createElement('div');
    dialog.id = 'custom-confirm-dialog';
    dialog.style.cssText = `
        background: white;
        border-radius: 16px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        width: 90%;
        max-width: 400px;
        overflow: hidden;
        transform: scale(0.95);
        animation: scaleIn 0.3s ease-out forwards;
    `;

    const header = document.createElement('div');
    header.style.cssText = `
        padding: 16px 24px;
        background: ${CONFIG.COLORS.PRIMARY};
        color: white;
        font-size: 18px;
        font-weight: 500;
        display: flex;
        justify-content: space-between;
        align-items: center;
    `;
    header.innerHTML = `<span>JOBPILOT 投递助手</span><i class="fa fa-question-circle ml-2"></i>`;

    const content = document.createElement('div');
    content.style.cssText = `
        padding: 24px;
        font-size: 16px;
        line-height: 1.8;
        color: #333;
    `;
    content.textContent = message;

    const buttonArea = document.createElement('div');
    buttonArea.style.cssText = `
        padding: 12px 24px;
        display: flex;
        justify-content: space-around;
        border-top: 1px solid #eee;
    `;

    const confirmBtn = document.createElement('button');
    confirmBtn.style.cssText = `
        background: ${CONFIG.COLORS.PRIMARY};
        color: white;
        border: none;
        border-radius: 8px;
        padding: 10px 24px;
        font-size: 16px;
        cursor: pointer;
        transition: all 0.3s;
        box-shadow: 0 4px 12px rgba(33, 150, 243, 0.4);
    `;
    confirmBtn.textContent = '确认';

    confirmBtn.addEventListener('click', () => {
        if (typeof confirmCallback === 'function') {
            confirmCallback();
        }
        overlay.remove();
    });

    const cancelBtn = document.createElement('button');
    cancelBtn.style.cssText = `
        background: #f0f0f0;
        color: #666;
        border: none;
        border-radius: 8px;
        padding: 10px 24px;
        font-size: 16px;
        cursor: pointer;
        transition: all 0.3s;
    `;
    cancelBtn.textContent = '取消';

    cancelBtn.addEventListener('click', () => {
        if (typeof cancelCallback === 'function') {
            cancelCallback();
        }
        overlay.remove();
    });

    buttonArea.appendChild(cancelBtn);
    buttonArea.appendChild(confirmBtn);

    dialog.appendChild(header);
    dialog.appendChild(content);
    dialog.appendChild(buttonArea);

    overlay.appendChild(dialog);

    document.body.appendChild(overlay);

    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        @keyframes scaleIn {
            from {
                transform: scale(0.95);
                opacity: 0;
            }
            to {
                transform: scale(1);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
}

function showProgress(message, progress) {
    let progressContainer = document.getElementById('progress-container');
    let progressBar = document.getElementById('progress-bar');
    let progressText = document.getElementById('progress-text');

    if (!progressContainer) {
        progressContainer = document.createElement('div');
        progressContainer.id = 'progress-container';
        progressContainer.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            padding: 24px;
            width: 90%;
            max-width: 400px;
            z-index: 99999;
            display: flex;
            flex-direction: column;
            gap: 16px;
        `;

        progressText = document.createElement('div');
        progressText.id = 'progress-text';
        progressText.style.cssText = `
            font-size: 16px;
            color: #333;
            text-align: center;
        `;

        const progressBackground = document.createElement('div');
        progressBackground.style.cssText = `
            height: 12px;
            background: #f0f0f0;
            border-radius: 6px;
            overflow: hidden;
        `;

        progressBar = document.createElement('div');
        progressBar.id = 'progress-bar';
        progressBar.style.cssText = `
            height: 100%;
            background: linear-gradient(90deg, ${CONFIG.COLORS.PRIMARY}, #4db6ac);
            border-radius: 6px;
            transition: width 0.3s ease;
            width: 0%;
        `;

        progressBackground.appendChild(progressBar);
        progressContainer.appendChild(progressText);
        progressContainer.appendChild(progressBackground);

        document.body.appendChild(progressContainer);
    }

    progressText.textContent = message;
    progressBar.style.width = `${progress}%`;

    if (progress >= 100) {
        setTimeout(() => {
            if (progressContainer && progressContainer.parentNode) {
                progressContainer.parentNode.removeChild(progressContainer);
            }
        }, 1000);
    }
}


window.toggleProcess = toggleProcess;
window.startSendGreetings = startSendGreetings;
window.startSendImageResume = startSendImageResume;
window.startAiReply = startAiReply;
window.showCustomAlert = showCustomAlert;
window.showConfirmDialog = showConfirmDialog;
window.showProgress = showProgress;
