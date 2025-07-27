// components/DraggableWrapper.tsx
import React, { useRef, useEffect, ReactNode, useState } from "react";

type DraggableWrapperProps = {
  children: ReactNode;
  initialPosition?: { x: number; y: number };
  initialWidth?: number;
};

const DraggableWrapper: React.FC<DraggableWrapperProps> = ({
  children,
  initialPosition = { x: 100, y: 100 },
  initialWidth = 400,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const [width, setWidth] = useState(initialWidth);

  // Draggable header
  useEffect(() => {
    const wrapper = wrapperRef.current;
    const header = wrapper?.querySelector(".dv-header") as HTMLElement | null;

    if (!wrapper || !header) return;

    const onPointerDown = (e: PointerEvent) => {
      e.preventDefault();
      pos.current = { x: e.clientX, y: e.clientY };

      const onMove = (e: PointerEvent) => {
        const dx = e.clientX - pos.current.x;
        const dy = e.clientY - pos.current.y;
        pos.current = { x: e.clientX, y: e.clientY };

        wrapper.style.left = `${wrapper.offsetLeft + dx}px`;
        wrapper.style.top = `${wrapper.offsetTop + dy}px`;
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

  // Resizing width only
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
      className="dv-wrapper"
      style={{
        left: initialPosition.x,
        top: initialPosition.y,
        width: `${width}px`,
      }}
    >
      <div className="dv-header" />
      <div className="dv-content">{children}</div>
    </div>
  );
  return (
    <div
      ref={wrapperRef}
      className="relative rounded-md border border-gray-300 bg-white shadow-md"
      style={{
        left: initialPosition.x,
        top: initialPosition.y,
        width: `${width}px`,
      }}
    >
      {/* Header */}
      <div className="dv-header cursor-move bg-gray-100 px-4 py-2 text-sm font-medium">
        Drag me
      </div>

      {/* Content */}
      <div className="dv-content p-4">{children}</div>

      {/* Resizer: right edge */}
      <div
        className="absolute right-0 top-0 h-full w-2 cursor-ew-resize bg-gray-200 transition-colors hover:bg-gray-400"
        onPointerDown={startResize}
      />
    </div>
  );
};

export default DraggableWrapper;
