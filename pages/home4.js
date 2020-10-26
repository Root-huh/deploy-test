import times from "lodash/times";
import { useCallback, useEffect, useRef } from "react";
import Nav from "../src/component/Nav";

export default function Home4() {
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);
  const columnListRef = useRef([]);
  const columnListOffsetTopRef = useRef([]);
  const parallaxListRef = useRef([]);

  const updatePosition = useCallback(
    ({ containerWidth, containerHeight, itemPerLeft, index, column }) => {
      const parallax = parallaxListRef.current[index];
      parallax.style.width = `${containerWidth}px`;
      parallax.style.height = `${containerHeight}px`;
      parallax.style.left = `-${itemPerLeft * (index % column)}px`;
    },
    []
  );

  useEffect(() => {
    const container = containerRef.current;
    const wrapper = wrapperRef.current;

    if (!container || !wrapper) {
      return;
    }

    for (const item of wrapper.children) {
      const parallax = item.querySelector(".parallax");
      item && columnListRef.current.push(item);
      item && columnListOffsetTopRef.current.push(item.offsetTop);
      parallax && parallaxListRef.current.push(parallax);
      parallax.style.backgroundImage = `url(${
        IMAGE_LIST[Math.floor(Math.random() * IMAGE_LIST.length)]
      })`;
    }

    function handleScroll() {
      const container = containerRef.current;
      columnListOffsetTopRef.current.forEach((offsetTop, index) => {
        const top = `${(container.scrollTop - offsetTop) * 0.3}px`;
        parallaxListRef.current[index].style.top = top;
      });
    }
    function handleResize() {
      const container = containerRef.current;
      const containerWidth = container.offsetWidth;
      const containerHeight = container.offsetHeight;
      const column = 3;
      const itemPerLeft = containerWidth / column;
      parallaxListRef.current.forEach((_, index) => {
        updatePosition({
          containerWidth,
          containerHeight,
          itemPerLeft,
          index,
          column,
        });
        columnListOffsetTopRef.current[index] =
          columnListRef.current[index].offsetTop;
      });
    }
    window.addEventListener("resize", handleResize);
    container.addEventListener("scroll", handleScroll);

    handleResize();
    handleScroll();

    return () => {
      container.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Nav />
      <div className="container" ref={containerRef}>
        <div className="wrapper" ref={wrapperRef}>
          {times(TIMES_SIZE, index => (
            <div key={index} className="column">
              <div className="title">Index: {index}</div>
              <div className="parallax" />
            </div>
          ))}
        </div>
        <style jsx global>{`
          html,
          body {
            overflow: hidden;
          }

          body > div {
            height: 100vh;
          }

          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
        `}</style>
        <style jsx>{`
          .container {
            height: 100vh;
            position: relative;
            overflow-x: hidden;
            overflow-y: auto;
            -webkit-overflow-scrolling: auto;
          }

          .wrapper {
            display: flex;
            flex-wrap: wrap;
          }

          .column {
            flex: 0 0 calc(100% / 3);
            height: 400px;
            border-bottom: solid 4px black;
            position: relative;
            overflow: hidden;
          }

          .column:nth-of-type(3n + 1) {
            border-right: solid 4px black;
          }
          .column:nth-of-type(3n + 3) {
            border-left: solid 4px black;
          }

          .title {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            font-size: 20px;
            font-weight: bold;
            z-index: 1;
          }

          .parallax {
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            background-size: cover;
            background-position: center center;
          }
        `}</style>
      </div>
    </>
  );
}

const TIMES_SIZE = 3 * 20;
// const COLORS = ["skyblue", "lightblue", "lightgreen", "lightpink"];

const IMAGE_LIST = ["images/1.png", "images/2.jpg"];
