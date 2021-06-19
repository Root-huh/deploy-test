import Head from 'next/head';
import { useEffect, useRef } from 'react';
// import ALIVE_VIDEO from '../../public/alive.mp4';

export default function Event() {
    const videoRef = useRef(null);
    const boxRef = useRef(null);
    const scrollRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;
        const box = boxRef.current;
        const scrollEl = scrollRef.current;
        if (!video || !box || !scrollEl) return;

        let adder = 1.5;
        let duration = 0;
        let height = scrollEl.offsetHeight;
        const resize = () => {
            const _width = scrollEl.offsetWidth;
            const _height = scrollEl.offsetHeight;
            const _duration = video.duration;
            requestAnimationFrame(() => {
                height = _height;
                duration = _duration;

                video.style.width = `${_width}px`;
                video.style.height = `${_height}px`;
                box.style.height = `${Math.round(_duration * (_height * adder))}px`;
                animate();
            });
        };
        
        let lastScroll = 0;
        const animate = () => {
            const adderHeight = height * adder;
            const point = Math.round(duration * (adderHeight));
            const calc = (height + lastScroll) - point;
            const currentTime = lastScroll * (duration / (adderHeight + height));

            video.currentTime = currentTime;
            if (calc > 0) {
                video.classList.add('absolute');
            } else {
                video.classList.remove('absolute');
            }
            video.currentTime;
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
                    <video ref={videoRef} src="images/alive.mp4" />
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

                video {
                    width: 100%;
                    height: 100%;
                    position: fixed;
                    left: 0;
                    top: 0;
                    pointer-events: none;
                    z-index: -1;
                }
                video.absolute {
                    top: auto;
                    bottom: 0;
                    position: absolute;
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
