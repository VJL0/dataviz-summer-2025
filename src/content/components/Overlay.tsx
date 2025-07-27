import React from "react";
import CloseIcon from "./CloseIcon";

interface OverlayProps {
  message?: string;
  onClose?: () => void;
}

const Overlay: React.FC<OverlayProps> = ({ message, onClose }) => {
  return (
    <div
      className="flex items-center justify-center text-2xl text-white"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
      }}
    >
      {onClose && (
        <button
          className="fixed right-4 top-4 hover:cursor-grab"
          onClick={onClose}
        >
          <CloseIcon size={50} />
        </button>
      )}
      {message}
    </div>
  );
};

export default Overlay;
