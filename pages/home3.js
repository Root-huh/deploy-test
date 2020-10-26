import { useRef, useState } from "react";
import Nav from "../src/component/Nav";

export default function Home3() {
  const [toggle, setToggle] = useState(false);
  const parallaxRef = useRef(null);

  //   useEffect(() => {
  //     const parallax = parallaxRef.current;
  //     if (!parallax) return;

  //     let offsetHeight = 0;
  //     for (const children of parallax.children) {
  //       //   console.log("tttt", children.offsetHeight);
  //       offsetHeight += children.offsetHeight;
  //     }
  //     console.log("tttt", { offsetHeight });

  //     // parallax.style.height = `${offsetHeight}px`;
  //   }, []);

  return (
    <>
      <Nav
        element={
          <button onClick={() => setToggle(!toggle)}>
            Toogle Group Overflow Hidden
          </button>
        }
      />
      <div className="parallax" ref={parallaxRef}>
        {ITEM_LIST.map((item, index) => (
          <div
            key={index}
            className="group"
            style={{
              zIndex: item.zIndex,
              overflow: toggle ? "hidden" : "visible",
            }}
          >
            {item.layers.map((layer, index2) => (
              <div
                key={index2}
                style={{ backgroundColor: layer.bg || "transparent" }}
                className={`layer ${layer.className}`}
              >
                <div className="title">{layer.className}</div>
              </div>
            ))}
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
        }
      `}</style>
      <style jsx>{`
        .parallax {
          height: 100vh;
          overflow-x: hidden;
          overflow-y: auto;
          perspective: ${TRANSLATE_Z}px;
        }

        .group {
          transform-style: preserve-3d;
          height: 100vh;
          position: relative;
        }

        .layer {
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
        }

        .front {
          z-index: 4;
          transform: translateZ(0);
        }

        .back {
          z-index: 3;
          transform: translateZ(-${TRANSLATE_Z}px) scale(2);
        }

        .deep {
          z-index: 2;
          transform: translateZ(-${TRANSLATE_Z * 2}px) scale(3);
        }

        .title {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          font-size: 20px;
          font-weight: bold;
        }
      `}</style>
    </>
  );
}

const TRANSLATE_Z = 1;

const ITEM_LIST = [
  {
    zIndex: 5,
    layers: [{ className: "front", bg: "rgb(123,210,102)" }],
  },
  {
    zIndex: 3,
    layers: [
      { className: "front" },
      { className: "back", bg: "rgb(123,210,102)" },
    ],
  },
  {
    zIndex: 4,
    layers: [
      { className: "front" },
      { className: "back", bg: "rgb(153,216,101)" },
    ],
  },
  {
    zIndex: 2,
    layers: [
      { className: "front" },
      { className: "back" },
      { className: "deep", bg: "rgb(184,223,101)" },
    ],
  },
];
