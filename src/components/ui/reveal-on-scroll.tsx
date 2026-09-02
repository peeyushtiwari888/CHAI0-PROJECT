"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface RevealOnScrollProps {
  children: ReactNode;
  className?: string;
  animationClass?: string;
  delayMs?: number;
  threshold?: number;
}

export function RevealOnScroll({
  children,
  className,
  animationClass = "animate-in fade-in slide-in-from-bottom-4 duration-700",
  delayMs = 0,
  threshold = 0.1,
}: RevealOnScrollProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if the user prefers reduced motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delayMs > 0) {
            setTimeout(() => {
              setIsVisible(true);
            }, delayMs);
          } else {
            setIsVisible(true);
          }
          // Disconnect after triggering once to save CPU
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      { threshold, rootMargin: "0px 0px -50px 0px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(ref.current);
      }
      observer.disconnect();
    };
  }, [delayMs, threshold]);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all will-change-[opacity,transform]",
        isVisible ? animationClass : "opacity-0",
        className
      )}
    >
      {children}
    </div>
  );
}
