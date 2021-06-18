import Head from 'next/head';
import { useEffect, useRef } from 'react';

export default function Event() {
    const cvsRef = useRef(null);
    const boxRef = useRef(null);
    const scrollRef = useRef(null);

    useEffect(() => {
        const cvs = cvsRef.current;
        const box = boxRef.current;
        const scrollEl = scrollRef.current;
        if (!cvs || !box || !scrollEl) return;

        let height = scrollEl.offsetHeight;
        const resize = () => {
            const _width = scrollEl.offsetWidth;
            const _height = scrollEl.offsetHeight;
            requestAnimationFrame(() => {
                height = _height;
                cvs.width = _width;
                cvs.height = _height;
                cvs.style.width = `${_width}px`;
                cvs.style.height = `${_height}px`;
                box.style.minHeight = `${_height * 4}px`;
                animate();
            });
        };
        
        let lastScroll = 0;
        const animate = () => {
            const point = height * 4;
            const calc = (height + lastScroll) - point;
            if (calc > 0) {
                cvs.classList.add('absolute');
            } else {
                cvs.classList.remove('absolute');
            }

            // const translateY = Math.min(windowHeight + 10, Math.max(0, (windowHeight + lastScroll) - point));
            // cvs.style.transform = `translate3d(0, ${-translateY}px, 0)`;
        };
        const scroll = () => {
            lastScroll = scrollEl.scrollTop;
            requestAnimationFrame(animate);
        };

        resize();
        scrollEl.addEventListener('scroll', scroll);
        window.addEventListener('resize', resize);
        return () => {
            scrollEl.removeEventListener('scroll', scroll);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <div id="root">
            <Head>
                <title>얼라이브 스크롤 테스트</title>
            </Head>

            <div className="scroll" ref={scrollRef}>
                <div className="container" ref={boxRef}>
                    <canvas ref={cvsRef} />
                </div>
                <div className="grid-system">
                    <div>Column 1 - 1</div>
                    <div>Column 2 - 1</div>
                    <div>Column 3 - 1</div>
                </div>
                <div className="grid-system">
                    <div>Column 1 - 2</div>
                    <div>Column 2 - 2</div>
                    <div>Column 3 - 2</div>
                </div>
                <div className="grid-system">
                    <div>Column 1 - 3</div>
                    <div>Column 2 - 3</div>
                    <div>Column 3 - 3</div>
                </div>
                <div className="grid-system">
                    <div>Column 1 - 4</div>
                    <div>Column 2 - 4</div>
                    <div>Column 3 - 4</div>
                </div>
                <div className="grid-system">
                    <div>Column 1 - 5</div>
                    <div>Column 2 - 5</div>
                    <div>Column 3 - 5</div>
                </div>
                <div className="grid-system">
                    <div>Column 1 - 6</div>
                    <div>Column 2 - 6</div>
                    <div>Column 3 - 6</div>
                </div>
            </div>

            <style jsx global>{`
                * {
                    margin: 0 auto;
                    padding: 0;
                    box-sizing: border-box;
                }

                html,
                body,
                body > div,
                body > div > div {
                    height: 100%;
                    position: relative;
                }

                canvas {
                    width: 100%;
                    height: 100%;
                    position: fixed;
                    left: 0;
                    top: 0;
                    background-image: url(https://th-a.kakaopagecdn.com/P/C/15/bg/2x/86031559-1ad5-4265-b7b0-2dd44245def4.jpg);
                    background-size: cover;
                    background-repeat: no-repeat;
                    z-index: -1;
                    transform: translate3d(0, 0, 0);
                    pointer-events: none;
                }
                canvas.absolute {
                    top: auto;
                    bottom: 0;
                    position: absolute;
                }

                .scroll {
                    width: 100%;
                    height: 100%;
                    overflow-x: hidden;
                    overflow-y: auto;
                }

                .container {
                    width: 100%;
                    height: 100%;
                    position: relative;
                }

                .grid-system {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .grid-system > div {
                    flex: 0 0 33.33%;
                    height: 124px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
            `}</style>
        </div>
    )
}
