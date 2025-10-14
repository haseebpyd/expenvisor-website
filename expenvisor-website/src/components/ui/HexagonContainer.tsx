import React from "react";
import { cn } from "@/lib/utils";

interface HexagonContainerProps {
  children: React.ReactNode;
  size?: number;
  glowColor?: string;
  className?: string;
  variant?: "default" | "outline" | "filled";
}

export const HexagonContainer = ({
  children,
  size = 60,
  glowColor = "#00D9FF",
  className = "",
  variant = "default",
}: HexagonContainerProps) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "outline":
        return {
          background: "transparent",
          border: `2px solid ${glowColor}30`,
          boxShadow: `0 0 20px ${glowColor}30`,
        };
      case "filled":
        return {
          background: `${glowColor}20`,
          border: `2px solid ${glowColor}50`,
          boxShadow: `0 0 20px ${glowColor}40`,
        };
      default:
        return {
          background: "rgba(30, 36, 51, 0.8)",
          border: `2px solid ${glowColor}30`,
          boxShadow: `0 0 20px ${glowColor}30`,
        };
    }
  };

  return (
    <div
      className={cn("relative flex items-center justify-center", className)}
      style={{
        width: size,
        height: size,
        clipPath:
          "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
        ...getVariantStyles(),
      }}
    >
      <div className="w-full h-full flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default HexagonContainer;
