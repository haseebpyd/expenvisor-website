import React from "react";
import { cn } from "@/lib/utils";

interface HolographicCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "alt" | "vertical";
  glow?: boolean;
}

export const HolographicCard = ({
  children,
  className = "",
  variant = "default",
  glow = true,
}: HolographicCardProps) => {
  const gradientClass =
    variant === "alt"
      ? "bg-holographic-alt"
      : variant === "vertical"
      ? "bg-holographic-vertical"
      : "bg-holographic";

  return (
    <div
      className={cn(
        "rounded-3xl p-6 backdrop-blur-md relative overflow-hidden",
        gradientClass,
        glow && "shadow-[0_8px_32px_rgba(0,217,255,0.2)]",
        className
      )}
    >
      {children}
    </div>
  );
};

export default HolographicCard;
