"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import SectionWrapper from "@/components/ui/SectionWrapper";

export default function FooterSection() {
  return (
    <SectionWrapper className="py-16 px-6 bg-sand-800 text-sand-300">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div variants={fadeInUp}>
          <h2 className="font-serif text-2xl sm:text-3xl text-white mb-4">
            The Karoo Awaits
          </h2>
          <p className="text-sand-400 text-sm max-w-md mx-auto mb-8 leading-relaxed">
            An adventure through South Africa&apos;s heartland — vast plains,
            ancient mountains, and timeless villages. April 2025.
          </p>
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-8 h-px bg-sand-600" />
            <span className="text-karoo-400 text-xs tracking-widest uppercase">
              Family Road Trip
            </span>
            <div className="w-8 h-px bg-sand-600" />
          </div>
        </motion.div>

        <motion.div variants={fadeInUp} className="text-xs text-sand-500 space-y-1">
          <p>
            Map tiles &copy;{" "}
            <a
              href="https://www.openstreetmap.org/"
              className="underline hover:text-sand-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              OpenStreetMap
            </a>{" "}
            contributors &middot;{" "}
            <a
              href="https://carto.com/"
              className="underline hover:text-sand-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              CARTO
            </a>
          </p>
          <p>
            Built with Next.js, Tailwind CSS, and Framer Motion
          </p>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
