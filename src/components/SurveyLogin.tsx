import { useState } from "react";
import Login from "@/components/Login";

function SurveyLogin() {
  const [show, setShow] = useState(false);
  const toggle = () => {
    setShow(!show);
    chrome.storage.local.set({ showDisplayManager: !show });
  };

  return (
    <div className="fixed bottom-0 right-0 z-[100] m-5 flex select-none items-end leading-[1em]">
      {show && <Login />}
      <button className="toggle-button" onClick={toggle}></button>
    </div>
  );
}

export default SurveyLogin;
