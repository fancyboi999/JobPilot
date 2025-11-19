// ==UserScript==
// @name         JobPilot 海投助手
// @name:en      JobPilot Helper for BOSS
// @namespace    https://github.com/fancyboi999/JobPilot
// @version      1.0.0
// @description  BOSS 直聘批量沟通 + 图片简历 + AI 回复的一站式脚本，装好即可开启自动求职流程。
// @description:en  All-in-one automation helper for BOSS Zhipin (auto apply, image resume, AI replies).
// @author       fancyboi999
// @match        https://www.zhipin.com/web/*
// @icon         https://static.zhipin.com/favicon.ico
// @grant        GM_xmlhttpRequest
// @run-at       document-idle
// @license      AGPL-3.0-or-later
// @homepageURL  https://github.com/fancyboi999/JobPilot
// @supportURL   https://github.com/fancyboi999/JobPilot/issues
// @downloadURL  https://raw.githubusercontent.com/fancyboi999/JobPilot/refs/heads/main/JOBPILOT.user.js
// @updateURL    https://raw.githubusercontent.com/fancyboi999/JobPilot/refs/heads/main/JOBPILOT.user.js
// @connect      zhipin.com
// @connect      spark-api-open.xf-yun.com
// @require      https://raw.githubusercontent.com/fancyboi999/JobPilot/refs/heads/main/JOBPILOT.js
// ==/UserScript==

(function jobPilotEntry() {
    'use strict';
    if (!window.JobPilotLoaded) {
        window.JobPilotLoaded = true;
    }
})();
