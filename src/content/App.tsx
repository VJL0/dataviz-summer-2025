import { useState } from "react";
import Login from "@/content/components/Login";

function App() {
  const [show, setShow] = useState(false);
  const toggle = () => setShow(!show);

  return (
    <div className="fixed right-0 bottom-0 z-[100] m-5 flex items-end leading-[1em] select-none">
      {show && <Login />}
      <button className="toggle-button" onClick={toggle}></button>
    </div>
  );
}

export default App;
