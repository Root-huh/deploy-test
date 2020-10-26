export default function Nav() {
  return (
    <div className="nav">
      {HREF_LIST.map(item => (
        <button key={item} onClick={() => window.location.assign(item)}>
          {item}
        </button>
      ))}
      <style jsx>{`
        .nav {
          position: fixed;
          left: 0;
          top: 0;
          width: 100%;
          height: 60px;
          line-height: 60px;
          text-align: center;
          z-index: 100;
        }

        .nav button {
          padding: 8px 10px;
          margin: 0 5px;
        }
      `}</style>
    </div>
  );
}

const HREF_LIST = ["/", "/home2", "/home3"];
