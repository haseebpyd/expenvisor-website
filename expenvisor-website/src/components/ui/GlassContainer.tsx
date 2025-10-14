import React from "react";
import { cn } from "@/lib/utils";

interface GlassContainerProps {
  children: React.ReactNode;
  className?: string;
  blur?: number;
  opacity?: number;
  variant?: "default" | "mobile";
}

export const GlassContainer = ({
  children,
  className = "",
  blur = 20,
  variant = "default",
}: GlassContainerProps) => {
  const blurClass =
    variant === "mobile" ? "backdrop-blur-glass-mobile" : "backdrop-blur-glass";

  return (
    <div
      className={cn(
        "bg-white/10 border border-white/10 rounded-2xl shadow-[0_4px_16px_rgba(0,0,0,0.3)]",
        blurClass,
        className
      )}
      style={{
        backdropFilter: `blur(${blur}px) saturate(180%)`,
        background: `rgba(30, 36, 51, ${0.6})`,
      }}
    >
      {children}
    </div>
  );
};

export default GlassContainer;
