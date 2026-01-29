"use client";

import { useRef, useEffect } from "react";
import { motion, useInView, useAnimation, Variants } from "framer-motion";
import { staggerContainer } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
  id?: string;
}

export default function SectionWrapper({
  children,
  className,
  variants,
  id,
}: SectionWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <motion.section
      ref={ref}
      id={id}
      variants={variants || staggerContainer}
      initial="hidden"
      animate={controls}
      className={cn("relative", className)}
    >
      {children}
    </motion.section>
  );
}
