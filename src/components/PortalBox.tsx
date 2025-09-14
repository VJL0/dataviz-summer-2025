import { createPortal } from "react-dom";
import { ReactNode } from "react";

type PortalBoxProps = {
  top?: number;
  left?: number;
  children: ReactNode;
  container?: Element;
};

const PortalBox = ({ top, left, children, container }: PortalBoxProps) => {
  const host = document.getElementById("dv-root");

  return createPortal(
    <div
      style={{
        top,
        left,
        position: "absolute",
      }}
    >
      {children}
    </div>,
    host!,
  );
};

export default PortalBox;
