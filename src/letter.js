const letter = {
    showLetterToUser: function () {
        const COLORS = {
            ink: '#383838',
            cream: '#F4EFEA',
            paper: '#FFFFFF',
            accent: '#6FC2FF',
            accentDark: '#2BA5FF',
            neutral: '#A1A1A1'
        };

        const overlay = document.createElement('div');
        overlay.id = 'letter-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(244, 239, 234, 0.95);
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 24px;
            z-index: 2147483646;
            border: 2px solid ${COLORS.ink};
            animation: md-overlay-in 0.3s ease forwards;
        `;

        const card = document.createElement('div');
        card.id = 'motherduck-letter-card';
        card.style.cssText = `
            width: clamp(320px, 90vw, 640px);
            background: ${COLORS.cream};
            border: 2px solid ${COLORS.ink};
            border-radius: 2px;
            box-shadow: -18px 18px 0 ${COLORS.ink}, 0 25px 45px rgba(56, 56, 56, 0.25);
            padding: 32px;
            position: relative;
            font-family: 'Inter', sans-serif;
            animation: md-letter-enter 0.4s ease forwards;
        `;

        const ribbon = document.createElement('div');
        ribbon.style.cssText = `
            position: absolute;
            top: -24px;
            left: 32px;
            background: ${COLORS.accent};
            color: ${COLORS.ink};
            border: 2px solid ${COLORS.ink};
            padding: 6px 18px;
            font-family: 'Monaco', 'Consolas', monospace;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            box-shadow: -6px 6px 0 ${COLORS.ink};
        `;
        ribbon.textContent = 'FIELD NOTE';

        const header = document.createElement('div');
        header.style.cssText = `
            display: flex;
            align-items: center;
            gap: 16px;
            margin-bottom: 20px;
        `;

        const icon = document.createElement('div');
        icon.textContent = '🚢';
        icon.style.cssText = `
            width: 64px;
            height: 64px;
            border: 2px solid ${COLORS.ink};
            background: ${COLORS.paper};
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 32px;
        `;

        const headerText = document.createElement('div');
        const title = document.createElement('h2');
        title.textContent = '致海投助手用户';
        title.style.cssText = `
            margin: 0;
            font-size: 20px;
            font-family: 'Monaco', 'Consolas', monospace;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            color: ${COLORS.ink};
        `;

        const subtitle = document.createElement('p');
        subtitle.textContent = 'JobPilot 求职行动手册 · 2025';
        subtitle.style.cssText = `
            margin: 6px 0 0;
            color: ${COLORS.neutral};
            font-size: 13px;
            letter-spacing: 0.05em;
        `;

        headerText.appendChild(title);
        headerText.appendChild(subtitle);
        header.append(icon, headerText);

        const content = document.createElement('div');
        content.style.cssText = `
            font-size: 15px;
            line-height: 1.7;
            color: ${COLORS.ink};
        `;
        content.innerHTML = `
            <p>你好，未来的成功人士：</p>
            <p>我是 fancyboi999——曾在求职路上狂刷 BOSS，却换来无尽的“稍后联系”。于是我把所有痛点写进代码，让海投这件事带点幽默感和效率。</p>
            <p>这封信交到你手上，说明你已经准备升级求职姿势。记得以下 3 条作战准则：</p>
            <ul style="margin: 12px 0 18px 20px; padding: 0;">
                <li style="margin-bottom: 8px;"><strong>自动扫描 + 打招呼</strong>：像卷轴一样收集岗位，再精准出击。</li>
                <li style="margin-bottom: 8px;"><strong>AI 智能回话</strong>：24 小时保持在线，HR 不再被晾着。</li>
                <li><strong>个性化策略</strong>：人设、话术全定制，形成属于你的专属态度。</li>
            </ul>
            <p>工具是助推器，你的诚意才是终极武器。愿你被更多好岗位看见，搞定 Offer，顺便来 Repo 点颗 🌟。</p>
            <p style="text-align:right; font-family: 'Monaco', 'Consolas', monospace;">—— fancyboi999</p>
        `;

        const actions = document.createElement('div');
        actions.style.cssText = `
            margin-top: 24px;
            display: flex;
            gap: 12px;
            flex-wrap: wrap;
        `;

        const applyButtonMotion = (button, accent = false) => {
            const baseBg = accent ? COLORS.accent : COLORS.paper;
            const hoverBg = accent ? COLORS.accentDark : COLORS.cream;
            button.style.background = baseBg;
            button.style.border = `2px solid ${COLORS.ink}`;
            button.style.color = COLORS.ink;
            button.style.fontFamily = `'Monaco', 'Consolas', monospace`;
            button.style.textTransform = 'uppercase';
            button.style.letterSpacing = '0.08em';
            button.style.padding = '12px 24px';
            button.style.cursor = 'pointer';
            button.style.boxShadow = `-6px 6px 0 ${COLORS.ink}`;
            button.style.transition = 'transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease';

            button.addEventListener('mouseenter', () => {
                button.style.background = hoverBg;
                button.style.transform = 'translate(4px, -4px)';
                button.style.boxShadow = `-4px 4px 0 ${COLORS.ink}`;
            });

            button.addEventListener('mouseleave', () => {
                button.style.background = baseBg;
                button.style.transform = 'translate(0, 0)';
                button.style.boxShadow = `-6px 6px 0 ${COLORS.ink}`;
            });

            button.addEventListener('mousedown', () => {
                button.style.transform = 'translate(0, 0)';
                button.style.boxShadow = 'none';
            });

            button.addEventListener('mouseup', () => {
                button.style.transform = 'translate(4px, -4px)';
                button.style.boxShadow = `-4px 4px 0 ${COLORS.ink}`;
            });
        };

        const closeLetter = (callback) => {
            card.style.animation = 'md-letter-exit 0.35s ease forwards';
            overlay.style.animation = 'md-overlay-out 0.3s ease forwards';
            setTimeout(() => {
                if (overlay.parentNode) {
                    overlay.parentNode.removeChild(overlay);
                }
                if (typeof callback === 'function') {
                    callback();
                }
            }, 280);
        };

        const startButton = document.createElement('button');
        startButton.textContent = '立即出发';
        applyButtonMotion(startButton, true);
        startButton.addEventListener('click', () => {
            closeLetter(() => {
                window.open('https://github.com/fancyboi999', '_blank');
            });
        });

        const laterButton = document.createElement('button');
        laterButton.textContent = '稍后阅读';
        applyButtonMotion(laterButton, false);
        laterButton.addEventListener('click', () => closeLetter());

        actions.append(startButton, laterButton);

        card.append(ribbon, header, content, actions);
        overlay.appendChild(card);
        document.body.appendChild(overlay);

        const style = document.createElement('style');
        style.textContent = `
            @keyframes md-letter-enter {
                from { transform: translateY(30px) scale(0.95); opacity: 0; }
                to { transform: translateY(0) scale(1); opacity: 1; }
            }

            @keyframes md-letter-exit {
                from { transform: translateY(0) scale(1); opacity: 1; }
                to { transform: translateY(-20px) scale(0.97); opacity: 0; }
            }

            @keyframes md-overlay-in {
                from { opacity: 0; }
                to { opacity: 1; }
            }

            @keyframes md-overlay-out {
                from { opacity: 1; }
                to { opacity: 0; }
            }

            @media (max-width: 520px) {
                #motherduck-letter-card { padding: 24px; }
                #motherduck-letter-card h2 { font-size: 18px; }
            }
        `;
        document.head.appendChild(style);
    }
};

// 导出到全局
window.letter = letter;
