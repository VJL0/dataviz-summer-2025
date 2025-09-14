import React, { useRef, useEffect, useState, ReactNode } from "react";

type FloatingPanelProps = {
  children: ReactNode;
  initialPosition?: { x: number; y: number };
  initialWidth?: number;
  resizable?: boolean;
};

const FloatingPanel: React.FC<FloatingPanelProps> = ({
  children,
  initialPosition = { x: 100, y: 100 },
  initialWidth = 400,
  resizable,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const pos = useRef({ x: 0, y: 0 });
  const [width, setWidth] = useState(initialWidth);
  const [position, setPosition] = useState(initialPosition);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const header = headerRef.current;
    if (!wrapper || !header) return;

    const onPointerDown = (e: PointerEvent) => {
      e.preventDefault();
      pos.current = { x: e.clientX, y: e.clientY };

      const onMove = (e: PointerEvent) => {
        const dx = e.clientX - pos.current.x;
        const dy = e.clientY - pos.current.y;
        pos.current = { x: e.clientX, y: e.clientY };
        setPosition((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
      };

      const onUp = () => {
        document.removeEventListener("pointermove", onMove);
      };

      header.setPointerCapture(e.pointerId);
      document.addEventListener("pointermove", onMove);
      document.addEventListener("pointerup", onUp, { once: true });
      document.addEventListener("pointercancel", onUp, { once: true });
    };

    header.addEventListener("pointerdown", onPointerDown);
    return () => header.removeEventListener("pointerdown", onPointerDown);
  }, []);

  const startResize = (e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const startX = e.clientX;
    const startWidth = width;

    const onPointerMove = (e: PointerEvent) => {
      const dx = e.clientX - startX;
      setWidth(Math.max(100, startWidth + dx));
    };

    const onPointerUp = () => {
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerup", onPointerUp);
    };

    document.addEventListener("pointermove", onPointerMove);
    document.addEventListener("pointerup", onPointerUp);
  };

  return (
    <div
      ref={wrapperRef}
      className="floating-panel-wrapper"
      style={{ left: position.x, top: position.y, width }}
    >
      <div ref={headerRef} className="floating-panel-header">
        Drag me
      </div>
      <div className="floating-panel-content">{children}</div>
      {resizable && (
        <div
          className="floating-panel-resizerx"
          onPointerDown={startResize}
          aria-label="Resize horizontally"
        />
      )}
    </div>
  );
};

export default FloatingPanel;
