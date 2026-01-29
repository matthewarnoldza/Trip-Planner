"use client";

import { motion, Variants } from "framer-motion";
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
  return (
    <motion.section
      id={id}
      variants={variants || staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      className={cn("relative", className)}
    >
      {children}
    </motion.section>
  );
}
