// ==UserScript==
// @name         JobPilot 海投助手
// @name:en      JobPilot Helper for BOSS
// @namespace    https://github.com/fancyboi999/JobPilot
// @version      1.0.0
// @description  BOSS 直聘批量沟通 + 图片简历 + AI 回复的一站式脚本，装好即可开启自动求职流程。
// @description:en  All-in-one automation helper for BOSS Zhipin (auto apply, image resume, AI replies).
// @author       fancyboi999
// @match        https://www.zhipin.com/web/*
// @grant        GM_xmlhttpRequest
// @run-at       document-idle
// @supportURL   https://github.com/fancyboi999/JobPilot/issues
// @homepageURL  https://github.com/fancyboi999/JobPilot
// @downloadURL  https://raw.githubusercontent.com/fancyboi999/JobPilot/refs/heads/main/JOBPILOT.user.js
// @updateURL    https://raw.githubusercontent.com/fancyboi999/JobPilot/refs/heads/main/JOBPILOT.user.js
// @license      AGPL-3.0-or-later
// @icon         https://static.zhipin.com/favicon.ico
// @connect      zhipin.com
// @connect      spark-api-open.xf-yun.com
// @noframes
// ==/UserScript==

(function () {
    'use strict';

    const STORAGE = {
        LETTER: 'letterLastShown',
        GUIDE: 'shouldShowGuide',
        AI_COUNT: 'aiReplyCount',
        AI_DATE: 'lastAiDate'
    };

    function getToday() {
        return new Date().toISOString().split('T')[0];
    }

    // 立即显示UI（加载中状态）
    function initUIFast() {
        try {
            // 立即初始化UI面板（禁用状态）
            UI.init(true); // 传入true表示加载中状态
            document.body.style.position = 'relative';
        } catch (error) {
            console.error('UI快速初始化失败:', error);
        }
    }

    // DOM就绪后启用功能
    function enableFeatures() {
        try {
            const midnight = new Date();
            midnight.setDate(midnight.getDate() + 1);
            midnight.setHours(0, 0, 0, 0);
            setTimeout(() => {
                localStorage.removeItem(STORAGE.AI_COUNT);
                localStorage.removeItem(STORAGE.AI_DATE);
                localStorage.removeItem(STORAGE.LETTER);
            }, midnight - Date.now());

            // 启用UI功能
            UI.setReady();

            const today = getToday();
            if (location.pathname.includes('/jobs')) {
                if (localStorage.getItem(STORAGE.LETTER) !== today) {
                    letter.showLetterToUser();
                    localStorage.setItem(STORAGE.LETTER, today);
                } else if (localStorage.getItem(STORAGE.GUIDE) !== 'true') {
                    guide.showGuideToUser();
                    localStorage.setItem(STORAGE.GUIDE, 'true');
                    Core.delay(800)
                    window.open('https://www.zhipin.com/web/geek/notify-set?ka=notify-set', '_blank');
                }
                Core.log('欢迎使用海投助手，我将自动投递岗位！');
            } else if (location.pathname.includes('/chat')) {
                Core.log('欢迎使用海投助手，我将自动发送简历！');
            } else if (location.pathname.includes('/notify-set')) {
                Core.log('请将常用语换为自我介绍来引起HR的注意！');

                const targetSelector = 'h3.normal.title';

                const observer = new MutationObserver((mutations, obs) => {
                    const targetElement = document.querySelector(targetSelector);
                    if (targetElement) {
                        targetElement.textContent = '把常用语换为自我介绍，并设图片简历; 招呼语功能必须启用。';
                        obs.disconnect();
                    }
                });

                observer.observe(document.body, {
                    childList: true,
                    subtree: true
                });
            } else {
                Core.log('当前页面暂不支持，请移步至职位页面！');
            }
        } catch (error) {
            console.error('功能启用失败:', error);
            if (UI.notify) UI.notify('功能启用失败', 'error');
        }
    }

    // 立即执行UI初始化
    initUIFast();

    // DOM完全加载后启用功能
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', enableFeatures);
    } else {
        // DOM已经就绪，立即启用
        enableFeatures();
    }
})();
