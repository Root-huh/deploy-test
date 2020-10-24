export default function Home2() {
  return (
    <div id="root">
      <div id="parallax">
        {ITEM_LIST.map((_, index) => (
          <div
            className="group"
            key={index}
            style={{ zIndex: Z_INDEX_LIST[index] }}
          >
            <div className="layer">
              <div className="title">Title {index + 1}</div>
            </div>
            {index > 0 && (
              <div className="layer_back">
                <div className="title">Back Title {index + 1}</div>
              </div>
            )}
          </div>
        ))}
      </div>

      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
        }

        html,
        body {
          overflow: hidden;
        }

        body > div {
          height: 100vh;
        }
      `}</style>
      <style jsx>{`
        #root {
          height: 100%;
        }

        #parallax {
          height: 100%;
          overflow-x: hidden;
          overflow-y: auto;
          perspective: 300px;
        }

        .group {
          height: 100vh;
          position: relative;
          transform-style: preserve-3d;
          overflow: hidden;
        }

        .layer {
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          transform: translateZ(0);
          z-index: 4;
        }
        .layer_back {
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          transform: translateZ(-300px) scale(2);
          z-index: 3;
        }

        .title {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          font-size: 20px;
          font-weight: bold;
        }

        .group:nth-of-type(1) .layer {
          background-color: skyblue;
        }
        .group:nth-of-type(2) .layer_back {
          background-color: lightblue;
        }
        .group:nth-of-type(3).layer_back {
          background-color: lightgreen;
        }
        .group:nth-of-type(4).layer_back {
          background-color: lightpink;
        }
      `}</style>
    </div>
  );
}

const ITEM_LIST = [0, 1, 2, 3];
const Z_INDEX_LIST = [5, 3, 4, 2];
