"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { getActivePresentationTheme } from "@/lib/presentation-themes";

type FadeInProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

export function FadeIn({ children, className, delay = 0 }: FadeInProps) {
  const prefersReducedMotion = useReducedMotion();
  const theme = getActivePresentationTheme();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y: theme.slots.motion.fadeInInitialY }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: theme.slots.motion.fadeInDuration, ease: theme.slots.motion.fadeInEase, delay }}
    >
      {children}
    </motion.div>
  );
}
