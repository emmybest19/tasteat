"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";

export type Slide = {
  /** Image path inside /public, e.g. "/images/akara.jpeg". Leave "" for a placeholder. */
  src: string;
  emoji: string;
  title: string;
  subtitle?: string;
};

const INTERVAL = 4500;

export default function HeroCarousel({ slides }: { slides: Slide[] }) {
  const [index, setIndex] = useState(0);
  const [failed, setFailed] = useState<Record<number, boolean>>({});
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = (i: number) => setIndex((i + slides.length) % slides.length);

  // Auto-advance; respects reduced-motion, pauses on hover and when tab hidden.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || slides.length <= 1 || paused) return;

    timer.current = setInterval(
      () => setIndex((i) => (i + 1) % slides.length),
      INTERVAL,
    );
    const stop = () => timer.current && clearInterval(timer.current);
    document.addEventListener("visibilitychange", stop);
    return () => {
      stop();
      document.removeEventListener("visibilitychange", stop);
    };
  }, [slides.length, paused, index]);

  return (
    <div
      className="relative aspect-square w-full max-w-md overflow-hidden rounded-3xl border border-white/20 shadow-2xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {slides.map((slide, i) => {
        const active = i === index;
        const showImage = slide.src && !failed[i];
        return (
          <motion.div
            key={i}
            className="absolute inset-0"
            initial={false}
            animate={{ opacity: active ? 1 : 0 }}
            transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
            style={{ pointerEvents: active ? "auto" : "none" }}
            aria-hidden={!active}
          >
            {showImage ? (
              <motion.div
                className="absolute inset-0"
                initial={{ scale: 1.12 }}
                animate={{ scale: active ? 1 : 1.12 }}
                transition={{ duration: active ? 6 : 0.9, ease: "easeOut" }}
              >
                <Image
                  src={slide.src}
                  alt={slide.title}
                  fill
                  priority={i === 0}
                  sizes="(max-width: 768px) 90vw, 28rem"
                  className="object-cover"
                  onError={() => setFailed((f) => ({ ...f, [i]: true }))}
                />
              </motion.div>
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center bg-linear-to-br from-accent-400 via-accent-500 to-accent-600 text-white">
                <span className="text-7xl drop-shadow">{slide.emoji}</span>
                <span className="mt-3 text-2xl font-extrabold">{slide.title}</span>
                {slide.subtitle && (
                  <span className="mt-1 text-sm text-white/80">{slide.subtitle}</span>
                )}
              </div>
            )}

            {/* Caption overlay for real photos */}
            {showImage && (
              <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 via-black/30 to-transparent p-5 pt-12">
                <motion.p
                  className="text-xl font-extrabold text-white"
                  initial={false}
                  animate={{ opacity: active ? 1 : 0, y: active ? 0 : 12 }}
                  transition={{ duration: 0.5, delay: active ? 0.25 : 0 }}
                >
                  {slide.title}
                </motion.p>
                {slide.subtitle && (
                  <motion.p
                    className="text-sm text-white/85"
                    initial={false}
                    animate={{ opacity: active ? 1 : 0, y: active ? 0 : 12 }}
                    transition={{ duration: 0.5, delay: active ? 0.35 : 0 }}
                  >
                    {slide.subtitle}
                  </motion.p>
                )}
              </div>
            )}
          </motion.div>
        );
      })}

      {/* Prev / Next */}
      {slides.length > 1 && (
        <>
          {/* <button
            type="button"
            aria-label="Previous slide"
            onClick={() => go(index - 1)}
            className="absolute left-3 top-1/2 z-10 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/80 text-lg font-bold text-primary shadow transition hover:bg-white"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Next slide"
            onClick={() => go(index + 1)}
            className="absolute right-3 top-1/2 z-10 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/80 text-lg font-bold text-primary shadow transition hover:bg-white"
          >
            ›
          </button> */}

          {/* Dots */}
          <div className="absolute inset-x-0 bottom-3 z-10 flex justify-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => go(i)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === index ? "w-6 bg-white" : "w-2.5 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
