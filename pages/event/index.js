import Head from 'next/head';
import { useEffect, useRef } from 'react';

export default function Event() {
    const cvsRef = useRef(null);
    const boxRef = useRef(null);

    useEffect(() => {
        const cvs = cvsRef.current;
        const box = boxRef.current;
        if (!cvs || !box) return;

        let windowHeight = window.innerHeight;
        const resize = () => {
            const height = window.innerHeight;
            const width = window.innerWidth;
            requestAnimationFrame(() => {
                windowHeight = height;
                cvs.width = width;
                cvs.height = height;
                box.style.minHeight = `${height * 4}px`;
                scroll();
            });
        };
        
        let lastScroll = 0;
        const animate = () => {
            const point = windowHeight * 4;
            // const calc = (windowHeight + lastScroll) - point;
            // cvs.style.position = calc > 0 ? 'absolute' : 'fixed';

            const translateY = Math.min(windowHeight + 10, Math.max(0, (windowHeight + lastScroll) - point));
            // cvs.style.transform = `translate3d(0, ${-translateY}px, 0)`;
            cvs.style.transform = `matrix(1, 0, 0, 1, 0, -${translateY})`;
        };
        const scroll = () => {
            lastScroll = window.scrollY;
            requestAnimationFrame(animate);
        };

        resize();
        window.addEventListener('scroll', scroll);
        window.addEventListener('resize', resize);
        return () => {
            window.removeEventListener('scroll', scroll);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <div id="root">
            <Head>
                <title>얼라이브 스크롤 테스트</title>
            </Head>

            <canvas ref={cvsRef} />
            <div className="container" ref={boxRef} />
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
                    bottom: 0;
                    background-color: rgba(0, 0, 0, 0.4);
                    z-index: -1;
                    transform: translate3d(0, 0, 0);
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
