import Nav from "../src/component/Nav";

export default function Home3() {
  return (
    <>
      <Nav />
      <div className="parallax">
        {ITEM_LIST.map((item, index) => (
          <div key={index} className="group" style={{ zIndex: item.zIndex }}>
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
          perspective: 300px;
        }

        .group {
          transform-style: preserve-3d;
          height: 100vh;
          position: relative;
          overflow: hidden;
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
          transform: translateZ(-300px) scale(2);
        }

        .deep {
          z-index: 2;
          transform: translateZ(-600px) scale(3);
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
