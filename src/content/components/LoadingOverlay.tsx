import React from "react";
import CloseIcon from "./CloseIcon";

interface LoadingOverlayProps {
  message: string;
  onClose: () => void;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  message = "Loading...",
  onClose,
}) => {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-black/70 text-2xl text-white">
      {/* X button to close the overlay */}

      <button
        className="fixed top-4 right-4 hover:cursor-grab"
        onClick={onClose}
      >
        <CloseIcon size={50} />
      </button>
      {message}
    </div>
  );
};

export default LoadingOverlay;
