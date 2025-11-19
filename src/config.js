// 基本配置设置内容
const CONFIG = {
    BASIC_INTERVAL: 1000,
    OPERATION_INTERVAL: 1500,
    CARD_STYLE: {
        BACKGROUND: '#ffffff',
        SHADOW: '0 6px 18px rgba(0,0,0,0.12)',
        BORDER: '1px solid #e4e7ed'
    },
    COLORS: {
        PRIMARY: '#2196f3',
        SECONDARY: '#ff5722',
        NEUTRAL: '#95a5a6'
    },
    MINI_ICON_SIZE: 40,
    SELECTORS: {
        JOB_CARD: 'li.job-card-box',
        CHAT_BTN: 'a.op-btn-chat',
        CHAT_LIST: 'ul[data-v-8e790d94=""]',
        CHAT_INPUT: '#chat-input',
        SEND_BUTTON: '.btn-send',
        FRIEND_MESSAGE: '.item-friend .text span',
        COMMON_PHRASE_BTN: '.btn-dict',
        RESUME_BTN: '.toolbar-btn:contains("发简历")',
        CONFIRM_SEND: 'span.btn-sure-v2',
        IMAGE_SEND_BTN: '.toolbar-btn-content.icon.btn-sendimg input[type="file"]'
    },
    AI: {
        MAX_REPLIES_FREE: 10,
        MAX_REPLIES_PREMIUM: 25,
        DEFAULT_ROLE: '你是个正在积极寻找工作机会的求职者，回复礼貌简短、言简意赅且避免大段文字，突出优势和能力展现专业素养。'
    },
    MESSAGES: {
        JOB_MATCHED: '找到匹配岗位: ',
        JOB_NOT_FOUND: '没有找到符合条件的岗位',
        START_PROCESSING: '开始自动处理...',
        STOP_PROCESSING: '已停止自动处理',
        RESUME_SENT: '简历已发送',
        AI_REPLYING: 'AI 正在回复...',
        MAX_REPLIES_REACHED: '今日 AI 回复次数已达上限'
    },
    STORAGE_KEYS: {
        PROCESSED_HRS: 'processedHRs',
        AI_REPLY_COUNT: 'aiReplyCount',
        LAST_AI_DATE: 'lastAiDate',
        AI_ROLE: 'aiRole',
        LETTER_LAST_SHOWN: 'letterLastShown'
    }
};

window.CONFIG = CONFIG;