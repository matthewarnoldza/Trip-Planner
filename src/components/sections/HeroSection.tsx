"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { TripData } from "@/types/trip";

interface HeroSectionProps {
  trip: TripData;
}

export default function HeroSection({ trip }: HeroSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.4], [0, -60]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative h-[100dvh] overflow-hidden"
    >
      {/* Parallax photo background */}
      <motion.div
        style={{ y: backgroundY, scale: backgroundScale }}
        className="absolute inset-[-10%]"
      >
        <Image
          src="/images/neal-markham-ocvXOq-jCgw-unsplash.jpg"
          alt="Karoo windmill against golden plains"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
          quality={90}
        />
      </motion.div>

      {/* Cinematic overlay stack */}
      {/* Top vignette — dark sky fade for text contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-transparent" />
      {/* Bottom vignette — grounds the image and anchors the scroll indicator */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
      {/* Warm Karoo colour wash — subtle tint that ties the photo to the site palette */}
      <div className="absolute inset-0 bg-gradient-to-br from-karoo-900/25 via-transparent to-karoo-950/20 mix-blend-multiply" />
      {/* Centre radial highlight — draws the eye to the text */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center_40%,transparent_30%,rgba(0,0,0,0.4)_100%)]" />

      {/* Content */}
      <motion.div
        style={{ opacity: textOpacity, y: textY }}
        className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-5"
        >
          <span className="inline-block px-5 py-2 text-xs font-semibold tracking-[0.2em] uppercase bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            {trip.month} {trip.year} &middot; {trip.totalDays} Days &middot;{" "}
            {trip.totalStops} Stops
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-[0.95] drop-shadow-[0_4px_24px_rgba(0,0,0,0.5)]"
        >
          {trip.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-lg sm:text-xl text-white/85 max-w-xl mb-3 leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]"
        >
          {trip.subtitle}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="text-sm text-white/60 drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)]"
        >
          {trip.startDate} – {trip.endDate}
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <button
            onClick={() =>
              document
                .getElementById("overview")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="flex flex-col items-center gap-2 text-white/50 hover:text-white/80 transition-colors"
          >
            <span className="text-xs tracking-widest uppercase">
              Explore
            </span>
            <svg
              className="w-5 h-5 animate-gentle-bounce"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path d="M19 14l-7 7m0 0l-7-7" />
            </svg>
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
