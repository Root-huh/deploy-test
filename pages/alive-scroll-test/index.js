import Head from 'next/head';
import { useEffect, useRef } from 'react';
import VIDEO from '../../public/images/alive2.webm';

export default function AliveScrollTest() {
    const videoRef = useRef(null);
    const boxRef = useRef(null);
    const scrollRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;
        const box = boxRef.current;
        const scrollEl = scrollRef.current;
        if (!video || !box || !scrollEl) return;

        const perNum = 3;
        let duration = 0;
        let height = scrollEl.offsetHeight;
        let canPlay = !!video.duration;
        const resize = () => {
            const _width = scrollEl.offsetWidth;
            const _height = scrollEl.offsetHeight;
            const _duration = video.duration || 0;
            requestAnimationFrame(() => {
                height = _height;
                video.width = _width * 0.3;
                video.height = height * 0.3;
                video.style.transform = 'translateX(-50%) scale(4)';
                duration = _duration;
                box.style.height = `${Math.round(duration * (height * perNum))}px`;
                animate();
            });
        };
        
        let isSeeked = true;
        const seeked = () => (isSeeked = true);

        let lastScroll = 0;
        const animate = () => {
            const point = Math.round(duration * (height * perNum));
            const calc = (height - (height * perNum) + lastScroll) - point;
            const currentTime = lastScroll * (duration / (duration * (height * perNum)));

            if (canPlay && isSeeked) {
                video.pause();
                isSeeked = false;
                video.currentTime = currentTime > duration ? duration : currentTime;
            }
            if (calc > 0 && !video.classList.contains('absolute')) {
                video.classList.add('absolute');
            } else if (calc <= 0 && video.classList.contains('absolute')) {
                video.classList.remove('absolute');
            }
        };
        const scroll = () => {
            lastScroll = scrollEl.scrollTop;
            requestAnimationFrame(animate);
        };

        resize();
        const passive = { passive: true };
        scrollEl.addEventListener('scroll', scroll, passive);
        window.addEventListener('resize', resize, passive);
        video.addEventListener('seeked', seeked, passive);
        return () => {
            scrollEl.removeEventListener('scroll', scroll, passive);
            window.removeEventListener('resize', resize, passive);
            video.removeEventListener('seeked', seeked, passive);
        };
    }, []);

    return (
        <div id="root">
            <Head>
                <title>얼라이브 스크롤 테스트</title>
            </Head>

            <div className="scroll" ref={scrollRef}>
                <div className="container" ref={boxRef}>
                    <video
                        src={VIDEO}
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        onPlay={e => e.currentTarget.pause()}
                    />
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
                    width: 30%;
                    height: 30%;
                    position: fixed;
                    left: 50%;
                    transform: translateX(-50%);
                    transform-origin: 50% 0;
                    top: 0;
                    pointer-events: none;
                    z-index: -1;
                    object-fit: cover;
                    object-position: 50% 50%;
                }
                video.absolute {
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
