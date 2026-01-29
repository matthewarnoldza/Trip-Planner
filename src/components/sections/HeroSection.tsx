"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.4], [0, -60]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.4, 0.7]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative h-[100dvh] overflow-hidden"
    >
      {/* Parallax background */}
      <motion.div
        style={{ y: backgroundY, scale: backgroundScale }}
        className="absolute inset-0"
      >
        {/* Gradient background simulating a Karoo sunset landscape */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, #1a0a2e 0%, #2d1b4e 15%, #6b2f5b 30%, #c2553d 45%, #e8854a 55%, #f4a956 65%, #d4a574 75%, #8b7355 85%, #5a4a3a 100%)",
          }}
        />
        {/* Subtle texture overlay */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.3),transparent_60%)]" />
        {/* Stars in the upper sky */}
        <div className="absolute inset-0">
          {[...Array(40)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-[2px] h-[2px] bg-white rounded-full"
              style={{
                top: `${Math.random() * 30}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.8 + 0.2,
              }}
              animate={{
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
        {/* Mountain silhouettes */}
        <svg
          className="absolute bottom-0 left-0 right-0 w-full"
          viewBox="0 0 1440 400"
          preserveAspectRatio="none"
          style={{ height: "40%" }}
        >
          {/* Far mountains */}
          <path
            d="M0,250 Q100,180 200,220 Q350,140 500,200 Q650,120 750,180 Q900,100 1050,170 Q1200,110 1350,190 Q1400,170 1440,200 L1440,400 L0,400 Z"
            fill="rgba(60,40,30,0.5)"
          />
          {/* Near mountains */}
          <path
            d="M0,300 Q80,240 180,280 Q300,200 450,270 Q550,220 700,260 Q850,190 1000,250 Q1100,210 1250,270 Q1350,230 1440,260 L1440,400 L0,400 Z"
            fill="rgba(40,28,20,0.7)"
          />
          {/* Foreground */}
          <path
            d="M0,350 Q200,310 400,340 Q600,300 800,330 Q1000,310 1200,340 Q1350,320 1440,340 L1440,400 L0,400 Z"
            fill="rgba(30,20,15,0.9)"
          />
        </svg>
      </motion.div>

      {/* Gradient overlays */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60"
        style={{ opacity: overlayOpacity }}
      />

      {/* Content */}
      <motion.div
        style={{ opacity: textOpacity, y: textY }}
        className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-4"
        >
          <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-[0.2em] uppercase bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            {trip.month} {trip.year} &middot; {trip.totalDays} Days &middot;{" "}
            {trip.totalStops} Stops
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-[0.95]"
        >
          {trip.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-lg sm:text-xl text-white/80 max-w-xl mb-3 leading-relaxed"
        >
          {trip.subtitle}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="text-sm text-white/50 max-w-md"
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
