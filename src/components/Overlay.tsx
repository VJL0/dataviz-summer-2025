import React from "react";
import CloseAppButton from "./buttons/CloseAppButton";

interface OverlayProps {
  showCloseButton?: boolean;
  message?: string;
}

const Overlay: React.FC<OverlayProps> = ({ showCloseButton, message }) => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center text-2xl text-white transition-colors"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.7)",
      }}
    >
      {showCloseButton && (
        <CloseAppButton className="fixed right-4 top-4" />
      )}
      {message}
    </div>
  );
};

export default Overlay;
