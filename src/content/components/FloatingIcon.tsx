import { FC } from "react";

const iconPath = chrome.runtime.getURL("icon-48.png");

interface FloatingIconProps {
  id: string;
  top: number;
  left: number;
  onClick: (id: string) => void;
}

const FloatingIcon: FC<FloatingIconProps> = ({ id, top, left, onClick }) => {
  return (
    <div
      style={{
        position: "absolute",
        top,
        left,
        height: "48px",
        width: "48px",
        backgroundImage: `url(${iconPath})`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        cursor: "pointer",
        zIndex: 9999,
      }}
      onClick={() => onClick(id)}
    />
  );
};

export default FloatingIcon;
