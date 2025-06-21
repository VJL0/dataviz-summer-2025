import { useState } from "react";

function App() {
  const [show, setShow] = useState(false);
  const toggle = () => setShow(!show);

  return (
    <div className="popup-container">
      {show && (
        <div className={`popup-content ${show ? "opacity-100" : "opacity-0"}`}>
          <h1 className="text-red-500">HELLO CRXJS, it me </h1>
        </div>
      )}
      <button className="toggle-button" onClick={toggle}>
      </button>
    </div>
  );
}

export default App;
