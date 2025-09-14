import React from "react";
import { useAppSelector } from "@/app/hooks";
import { cloneElement, getElementByGraphId } from "@/utils";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { createPortal } from "react-dom";

const ChartCard = () => {
  const chartId = useAppSelector((s) => s.ui.selection.chartId)!;

  // Build once per chartId: clone + keep only <svg>, compute aspect ratio, make responsive.
  const { html, ratio } = React.useMemo(() => {
    const srcSvg = getElementByGraphId<SVGSVGElement>(chartId)!;
    const parent = cloneElement(srcSvg.parentElement!);

    // Keep only the svg child
    Array.from(parent.children).forEach((el) => {
      if (!(el instanceof SVGSVGElement)) el.remove();
    });

    const svg = parent.querySelector("svg") as SVGSVGElement;

    // Prefer viewBox for aspect; fallback to live bbox
    let vw = 0,
      vh = 0;
    const vb = (svg.getAttribute("viewBox") || "")
      .trim()
      .split(/\s+/)
      .map(Number);
    if (vb.length === 4) [, , vw, vh] = vb;
    if (!(vw && vh)) {
      const r = srcSvg.getBoundingClientRect();
      vw = r.width || 720;
      vh = r.height || 400;
      svg.setAttribute("viewBox", `0 0 ${vw} ${vh}`);
    }

    // Responsive svg inside any box
    svg.removeAttribute("width");
    svg.removeAttribute("height");
    svg.style.width = "100%";
    svg.style.height = "100%";
    svg.style.display = "block";

    parent.style.overflow = "hidden";
    return { html: parent.outerHTML, ratio: vh / vw };
  }, [chartId]);

  // Target inside CardContent that we position to & size from
  const targetRef = React.useRef<HTMLDivElement>(null);
  const portalRef = React.useRef<HTMLDivElement>(null);

  // Reserve height in CardContent from its width * ratio
  const [reservedH, setReservedH] = React.useState<number | undefined>(
    undefined,
  );

  // Layout function: compute document coords + width, update portal styles imperatively
  const layout = React.useCallback(() => {
    const target = targetRef.current;
    const portal = portalRef.current;
    if (!target || !portal) return;

    // 1) Reserve height based on current width (no dependence on portal)
    const w = target.clientWidth;
    const h = Math.round(w * ratio);
    setReservedH((prev) => (prev !== h ? h : prev));

    // 2) Position the portal in document coordinates (no re-calc on window scroll)
    const r = target.getBoundingClientRect();
    const docTop = r.top + window.scrollY;
    const docLeft = r.left + window.scrollX;

    // Mutate styles to avoid React render loops
    const s = portal.style;
    s.position = "absolute";
    s.top = `${docTop}px`;
    s.left = `${docLeft}px`;
    s.width = `${r.width}px`;
    s.height = `${h}px`;
    s.overflow = "hidden";
    s.zIndex = "2147483647";
  }, [ratio]);

  // Observe target size changes; also handle resizes and (optionally) inner scroll containers
  React.useLayoutEffect(() => {
    const el = targetRef.current;
    if (!el) return;

    let raf = 0;
    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(layout);
    };

    const ro = new ResizeObserver(schedule);
    ro.observe(el);

    // Window resize definitely changes width
    window.addEventListener("resize", schedule);

    // If CardContent might live inside an overflowed scroller, capture scrolls too:
    window.addEventListener("scroll", schedule, true);

    // Initial pass
    schedule();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", schedule);
      window.removeEventListener("scroll", schedule, true);
    };
  }, [layout]);

  return (
    <Card className="w-full overflow-hidden rounded-3xl bg-yellow-400">
      <CardHeader>
        <CardTitle>Chart</CardTitle>
      </CardHeader>

      <CardContent className="relative bg-white p-4">
        {/* This div defines the box we mirror into document.body */}
        <div ref={targetRef} style={{ height: reservedH }} />

        {/* Portal to document.body; positioned via layout() */}
        {createPortal(
          <div ref={portalRef} dangerouslySetInnerHTML={{ __html: html }} />,
          document.body,
        )}
      </CardContent>
    </Card>
  );
};

export default ChartCard;
