export default function Nav() {
  return (
    <div className="nav">
      <button onClick={() => window.location.assign("/")}>Home</button>
      <button onClick={() => window.location.assign("/home2")}>Home2</button>
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
