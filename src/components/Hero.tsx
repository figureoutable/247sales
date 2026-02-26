"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { CAL_LINK } from "@/lib/constants";

const YOUTUBE_EMBED_ID = "opShRwVFX10";

function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-white/[0.08]",
  borderRadius = 16,
}: {
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
  rotate?: number;
  gradient?: string;
  borderRadius?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -150, rotate: rotate - 15 }}
      animate={{ opacity: 1, y: 0, rotate }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="relative"
        style={{ width, height }}
      >
        <div
          className={cn(
            "absolute inset-0 bg-linear-to-r to-transparent",
            gradient,
            "backdrop-blur-[1px]",
            "ring-1 ring-white/[0.03]",
            "shadow-[0_2px_16px_-2px_rgba(255,255,255,0.04)]",
            "after:absolute after:inset-0",
            "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.12),transparent_70%)]",
            "after:rounded-[inherit]"
          )}
          style={{ borderRadius }}
        />
      </motion.div>
    </motion.div>
  );
}

export function Hero() {
  return (
    <section className="relative min-h-0 w-full overflow-hidden bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      {/* Floating shapes background */}
      <div className="absolute inset-0 bg-linear-to-br from-indigo-500/[0.02] via-transparent to-rose-500/[0.02] blur-3xl" />
      <div className="absolute inset-0 overflow-hidden">
        <ElegantShape
          className="top-[-10%] left-[-15%]"
          width={300}
          height={500}
          rotate={-8}
          delay={0.3}
          borderRadius={24}
          gradient="from-indigo-500/[0.25]"
        />
        <ElegantShape
          className="right-[-20%] bottom-[-5%]"
          width={600}
          height={200}
          rotate={15}
          delay={0.5}
          borderRadius={20}
          gradient="from-rose-500/[0.25]"
        />
        <ElegantShape
          className="top-[40%] left-[-5%]"
          width={300}
          height={300}
          rotate={24}
          delay={0.4}
          borderRadius={32}
          gradient="from-violet-500/[0.25]"
        />
        <ElegantShape
          className="top-[5%] right-[10%]"
          width={250}
          height={100}
          rotate={-20}
          delay={0.6}
          borderRadius={12}
          gradient="from-amber-500/[0.25]"
        />
        <ElegantShape
          className="top-[45%] right-[-10%]"
          width={400}
          height={150}
          rotate={35}
          delay={0.7}
          borderRadius={16}
          gradient="from-emerald-500/[0.25]"
        />
        <ElegantShape
          className="bottom-[10%] left-[20%]"
          width={200}
          height={200}
          rotate={-25}
          delay={0.2}
          borderRadius={28}
          gradient="from-blue-500/[0.25]"
        />
        <ElegantShape
          className="top-[15%] left-[40%]"
          width={150}
          height={80}
          rotate={45}
          delay={0.8}
          borderRadius={10}
          gradient="from-purple-500/[0.25]"
        />
        <ElegantShape
          className="top-[60%] left-[25%]"
          width={450}
          height={120}
          rotate={-12}
          delay={0.9}
          borderRadius={18}
          gradient="from-teal-500/[0.25]"
        />
      </div>

      {/* Content on top */}
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
          Oddly Satisfying Accounting.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg font-light text-slate-600 sm:text-xl">
          The accounting equivalent of a superhero saving your weekend, money and giving you peace of mind.
        </p>

        <div
          className="mx-auto mt-10 max-w-4xl"
          aria-label="Intro video: Welcome to Figures"
        >
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-lg ring-1 ring-slate-200/50">
            <iframe
              src={`https://www.youtube.com/embed/${YOUTUBE_EMBED_ID}?rel=0`}
              title="Welcome to Figures – intro from Joshua Lee"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={CAL_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center rounded-full bg-black px-8 py-4 text-base font-semibold text-white shadow-sm transition-colors hover:bg-slate-800 sm:w-auto"
          >
            Schedule a call
          </a>
          <Link
            href="/services"
            className="inline-flex w-full items-center justify-center rounded-full border-2 border-slate-300 bg-white px-8 py-4 text-base font-semibold text-slate-700 transition-colors hover:border-black hover:bg-slate-50 hover:text-black sm:w-auto"
          >
            Learn more
          </Link>
        </div>
      </div>

      {/* Soft fade at bottom */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-white via-white/80 to-transparent" />
    </section>
  );
}
