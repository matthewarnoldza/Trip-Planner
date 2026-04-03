"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const homeSections = [
  { id: "hero", label: "Home" },
  { id: "overview", label: "Overview" },
  { id: "map", label: "Route" },
  { id: "timeline", label: "Itinerary" },
  { id: "stops", label: "Stops" },
];

const pages = [
  { href: "/", label: "Trip Overview" },
  { href: "/itinerary", label: "Itinerary" },
  { href: "/food-planner", label: "Food Planner" },
  { href: "/activities", label: "Activities" },
];

interface HeaderProps {
  mode?: "home" | "page";
}

export default function Header({ mode = "home" }: HeaderProps) {
  const [scrolled, setScrolled] = useState(mode === "page");
  const [activeSection, setActiveSection] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (mode === "page") return;

    const handleScroll = () => {
      setScrolled(window.scrollY > 100);

      const sectionElements = homeSections
        .map((s) => ({
          id: s.id,
          el: document.getElementById(s.id),
        }))
        .filter((s) => s.el);

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const el = sectionElements[i].el!;
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 3) {
          setActiveSection(sectionElements[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mode]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, delay: mode === "page" ? 0 : 0.5 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? "bg-sand-50/90 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            {mode === "page" ? (
              <Link
                href="/"
                className="font-serif text-lg font-bold text-sand-800 hover:text-karoo-600 transition-colors"
              >
                Karoo Road Trip
              </Link>
            ) : (
              <button
                onClick={() => scrollTo("hero")}
                className={`font-serif text-lg font-bold transition-colors ${
                  scrolled ? "text-sand-800" : "text-white"
                }`}
              >
                Karoo Road Trip
              </button>
            )}

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {mode === "home" ? (
                <>
                  {homeSections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollTo(section.id)}
                      className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                        scrolled
                          ? activeSection === section.id
                            ? "text-karoo-600"
                            : "text-sand-500 hover:text-sand-700"
                          : activeSection === section.id
                            ? "text-white"
                            : "text-white/60 hover:text-white/90"
                      }`}
                    >
                      {section.label}
                      {activeSection === section.id && (
                        <motion.div
                          layoutId="activeSection"
                          className="absolute bottom-0 left-3 right-3 h-0.5 bg-karoo-500 rounded-full"
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 30,
                          }}
                        />
                      )}
                    </button>
                  ))}
                  {/* Divider */}
                  <span
                    className={`mx-1 w-px h-4 ${scrolled ? "bg-sand-300" : "bg-white/30"}`}
                  />
                  {/* Page links */}
                  <Link
                    href="/itinerary"
                    className={`px-3 py-2 text-sm font-medium transition-colors ${
                      scrolled
                        ? "text-sand-500 hover:text-sand-700"
                        : "text-white/60 hover:text-white/90"
                    }`}
                  >
                    Itinerary
                  </Link>
                  <Link
                    href="/food-planner"
                    className={`px-3 py-2 text-sm font-medium transition-colors ${
                      scrolled
                        ? "text-sand-500 hover:text-sand-700"
                        : "text-white/60 hover:text-white/90"
                    }`}
                  >
                    Food Plan
                  </Link>
                  <Link
                    href="/activities"
                    className={`px-3 py-2 text-sm font-medium transition-colors ${
                      scrolled
                        ? "text-sand-500 hover:text-sand-700"
                        : "text-white/60 hover:text-white/90"
                    }`}
                  >
                    Activities
                  </Link>
                </>
              ) : (
                pages.map((page) => (
                  <Link
                    key={page.href}
                    href={page.href}
                    className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                      pathname === page.href
                        ? "text-karoo-600"
                        : "text-sand-500 hover:text-sand-700"
                    }`}
                  >
                    {page.label}
                    {pathname === page.href && (
                      <motion.div
                        layoutId="activePage"
                        className="absolute bottom-0 left-3 right-3 h-0.5 bg-karoo-500 rounded-full"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                  </Link>
                ))
              )}
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`md:hidden p-2 ${
                scrolled || mode === "page" ? "text-sand-800" : "text-white"
              }`}
              aria-label="Menu"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                {menuOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-16 z-40 bg-sand-50/95 backdrop-blur-lg shadow-lg md:hidden"
          >
            <nav className="flex flex-col p-4 gap-1">
              {mode === "home" ? (
                <>
                  {homeSections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollTo(section.id)}
                      className={`text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                        activeSection === section.id
                          ? "bg-karoo-50 text-karoo-700"
                          : "text-sand-600 hover:bg-sand-100"
                      }`}
                    >
                      {section.label}
                    </button>
                  ))}
                  <div className="h-px bg-sand-200 my-2" />
                  <Link
                    href="/itinerary"
                    onClick={() => setMenuOpen(false)}
                    className="text-left px-4 py-3 rounded-lg text-sm font-medium text-sand-600 hover:bg-sand-100"
                  >
                    Detailed Itinerary
                  </Link>
                  <Link
                    href="/food-planner"
                    onClick={() => setMenuOpen(false)}
                    className="text-left px-4 py-3 rounded-lg text-sm font-medium text-sand-600 hover:bg-sand-100"
                  >
                    Food Planner
                  </Link>
                  <Link
                    href="/activities"
                    onClick={() => setMenuOpen(false)}
                    className="text-left px-4 py-3 rounded-lg text-sm font-medium text-sand-600 hover:bg-sand-100"
                  >
                    Daily Activities
                  </Link>
                </>
              ) : (
                pages.map((page) => (
                  <Link
                    key={page.href}
                    href={page.href}
                    onClick={() => setMenuOpen(false)}
                    className={`text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      pathname === page.href
                        ? "bg-karoo-50 text-karoo-700"
                        : "text-sand-600 hover:bg-sand-100"
                    }`}
                  >
                    {page.label}
                  </Link>
                ))
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
