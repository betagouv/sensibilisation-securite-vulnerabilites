import { useEffect, useRef } from "react";

interface PrintScalerProps {
  children: React.ReactNode;
}

export const PrintScaler = ({ children }: PrintScalerProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scaleContent = () => {
      if (!contentRef.current || !containerRef.current) return;

      // Reset scale to measure true height
      contentRef.current.style.transform = "scale(1)";
      
      const contentHeight = contentRef.current.scrollHeight;
      const containerHeight = containerRef.current.clientHeight;

      // Only scale down if content is too tall
      if (contentHeight > containerHeight) {
        const scale = containerHeight / contentHeight;
        // Add small margin to avoid edge cases
        const finalScale = Math.min(scale * 0.98, 1);
        contentRef.current.style.transform = `scale(${finalScale})`;
      }
    };

    // Initial scale
    scaleContent();

    // Rescale on window resize
    window.addEventListener("resize", scaleContent);
    
    // Rescale after print dialog
    const beforePrint = () => scaleContent();
    window.addEventListener("beforeprint", beforePrint);

    return () => {
      window.removeEventListener("resize", scaleContent);
      window.removeEventListener("beforeprint", beforePrint);
    };
  }, [children]);

  return (
    <div ref={containerRef} style={{ height: "100%", overflow: "hidden" }}>
      <div ref={contentRef} style={{ transformOrigin: "top center", transition: "transform 0.2s" }}>
        {children}
      </div>
    </div>
  );
};
