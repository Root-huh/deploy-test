import { useCallback, useEffect, useRef } from "react";

export default function Home() {
  const containerRef = useRef(null);
  const itemListRef = useRef();
  const parallaxListRef = useRef();

  const refreshState = useCallback(() => {
    if (!itemListRef.current) {
      itemListRef.current = document.querySelectorAll(
        "[id*=parallax-wrapper-]"
      );
      parallaxListRef.current = document.querySelectorAll(
        "[id*=parallax-item-]"
      );
    }
    if (
      !itemListRef.current ||
      !parallaxListRef.current ||
      !containerRef.current
    ) {
      return;
    }

    const container = containerRef.current;
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;

    const column = containerWidth / itemListRef.current[0].offsetWidth;
    const diffTime = 2;
    const itemPerLeft = (containerWidth / diffTime / column) * diffTime;

    const length = itemListRef.current.length;
    const images = ["images/1.png", "images/2.jpg", "images/3.jpg"];
    for (let i = 0; i < length; i += 1) {
      const parallax = parallaxListRef.current[i];

      parallax.style.width = `${containerWidth}px`;
      parallax.style.height = `${containerHeight}px`;

      parallax.style.left = `-${itemPerLeft * (i % column)}px`;
      parallax.style.backgroundImage = `url(${
        images[Math.floor(Math.random() * images.length)]
      })`;
    }
  }, []);

  useEffect(() => {
    function handleResize() {
      refreshState();
    }
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div id="root">
      <div className="container" ref={containerRef}>
        <div className="wrapper">
          {ITEMS.map((_, index) => (
            <div key={index} className="item" id={`parallax-wrapper-${index}`}>
              <div className="parallax" id={`parallax-item-${index}`} />
              <img src="images/front.png" alt="" className="frontImage" />
            </div>
          ))}
        </div>
      </div>
      <style jsx global>{`
        * {
          margin: 0 auto;
          padding: 0;
          box-sizing: border-box;
        }

        html,
        body {
          height: 100%;
          position: relative;
        }

        body > div,
        #root {
          height: 100%;
        }
      `}</style>
      <style jsx>{`
        .container {
          border-bottom: solid 2px black;
          border-top: solid 2px black;
          height: 100vh;
          overflow-x: hidden;
          overflow-y: auto;
          perspective: 1px;
          perspective-origin: 0 0;
          position: relative;
          transform-style: preserve-3d;
          width: 100%;
        }

        .wrapper {
          display: flex;
          flex-wrap: wrap;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          width: 100%;
        }

        .item {
          border-bottom: solid 2px black;
          border-right: solid 2px black;
          flex: 0 0 50%;
          height: 600px;
          overflow: hidden;
          position: relative;
          transform-style: preserve-3d;
        }
        .item:nth-of-type(2n + 1) {
          border-left: solid 2px black;
        }

        .parallax {
          background-size: cover;
          height: 100%;
          left: 0;
          position: absolute;
          top: 0;
          transform: translateZ(-1px) scale(2);
          transform-origin: 0 0;
          width: 100%;
          z-index: 0;
        }

        .frontImage {
          bottom: 0;
          left: 50%;
          position: absolute;
          width: 100%;
          max-width: 500px;
          z-index: 1;
          transform: translateX(-50%);
        }
      `}</style>
    </div>
  );
}

const ITEM_LENGTH = 4 * 20;

const ITEMS = Array(ITEM_LENGTH).fill("");
