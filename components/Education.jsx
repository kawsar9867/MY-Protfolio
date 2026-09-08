"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import gsap from "gsap";
import {
  GraduationCap,
  Award,
  Star,
  Code2,
  Building2,
  MapPin,
  Calendar,
  Trophy,
  CheckCircle2,
  Sparkles,
  Laptop,
  BookOpen,
} from "lucide-react";

// Animated counter for stat values
function StatCounter({ target, isDecimal = false, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, target, {
        duration: 1.6,
        ease: [0.16, 1, 0.3, 1],
        onUpdate(latest) {
          if (isDecimal) {
            setCount(latest.toFixed(2));
          } else {
            setCount(Math.floor(latest));
          }
        },
      });
      return () => controls.stop();
    }
  }, [isInView, target, isDecimal]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function Education() {
  const bgOrbRef = useRef(null);

  useEffect(() => {
    if (bgOrbRef.current) {
      gsap.to(bgOrbRef.current, {
        opacity: 0.8,
        scale: 1.1,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.12 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section
      className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 w-full bg-[#05070f]"
      id="education"
      data-purpose="education-section"
    >
      {/* Atmospheric Glow Orbs */}
      <div
        ref={bgOrbRef}
        className="absolute top-20 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[128px] pointer-events-none"
      />
      <div className="absolute top-80 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-[128px] pointer-events-none" />

      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl mx-auto mb-16"
      >
        {/* Top Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/40 bg-cyan-950/60 text-cyan-300 text-xs font-semibold tracking-wider uppercase mb-5 backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.25)]">
          <GraduationCap className="w-4 h-4 text-cyan-400" />
          <span>ACADEMIC JOURNEY &amp; CREDENTIALS</span>
        </div>

        {/* Main Title */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 text-white leading-tight">
          Education &amp;{" "}
          <span className="bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-500 bg-clip-text text-transparent">
            Qualifications
          </span>
        </h2>

        {/* Subtitle */}
        <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
          My formal educational milestones, specialized technical training, and
          foundational computer science journey.
        </p>
      </motion.div>

      {/* Top Quick-Stats Bar (4 Compact Cards Grid) */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-12"
        data-purpose="stats-overview"
      >
        {/* Stat 1 */}
        <motion.div
          variants={cardVariants}
          whileHover={{ scale: 1.03, y: -3 }}
          className="bg-[#0b0f19]/90 border border-slate-800/90 hover:border-cyan-500/50 transition-all duration-300 rounded-2xl p-5 text-center flex flex-col items-center justify-center backdrop-blur-md group shadow-lg shadow-black/40"
        >
          <div className="w-11 h-11 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <BookOpen className="w-5 h-5" />
          </div>
          <span className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-sans">
            <StatCounter target={3} />
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400 mt-0.5">
            Qualifications
          </span>
        </motion.div>

        {/* Stat 2 */}
        <motion.div
          variants={cardVariants}
          whileHover={{ scale: 1.03, y: -3 }}
          className="bg-[#0b0f19]/90 border border-slate-800/90 hover:border-purple-500/50 transition-all duration-300 rounded-2xl p-5 text-center flex flex-col items-center justify-center backdrop-blur-md group shadow-lg shadow-black/40"
        >
          <div className="w-11 h-11 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <Award className="w-5 h-5" />
          </div>
          <span className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-sans">
            <StatCounter target={1} />
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400 mt-0.5">
            Certifications
          </span>
        </motion.div>

        {/* Stat 3 */}
        <motion.div
          variants={cardVariants}
          whileHover={{ scale: 1.03, y: -3 }}
          className="bg-[#0b0f19]/90 border border-slate-800/90 hover:border-amber-500/50 transition-all duration-300 rounded-2xl p-5 text-center flex flex-col items-center justify-center backdrop-blur-md group shadow-lg shadow-black/40"
        >
          <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <Star className="w-5 h-5" />
          </div>
          <span className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-sans">
            <StatCounter target={4.78} isDecimal={true} />
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400 mt-0.5">
            Top Result (SSC)
          </span>
        </motion.div>

        {/* Stat 4 */}
        <motion.div
          variants={cardVariants}
          whileHover={{ scale: 1.03, y: -3 }}
          className="bg-[#0b0f19]/90 border border-slate-800/90 hover:border-emerald-500/50 transition-all duration-300 rounded-2xl p-5 text-center flex flex-col items-center justify-center backdrop-blur-md group shadow-lg shadow-black/40"
        >
          <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <Code2 className="w-5 h-5" />
          </div>
          <span className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-sans">
            <StatCounter target={10} suffix="+" />
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400 mt-0.5">
            Key Skills
          </span>
        </motion.div>
      </motion.div>

      {/* Main Credentials Grid (3-Column Layout) */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        data-purpose="qualification-cards"
      >
        {/* Card 1: Diploma in Computer Science & Technology */}
        <motion.article
          variants={cardVariants}
          whileHover={{ y: -6 }}
          className="relative flex flex-col justify-between bg-[#0b141a]/85 border border-cyan-500/30 rounded-3xl p-6 sm:p-7 shadow-[0_0_35px_-5px_rgba(6,182,212,0.15)] hover:border-cyan-400 hover:shadow-[0_0_45px_-5px_rgba(6,182,212,0.3)] transition-all duration-300 backdrop-blur-md group"
        >
          <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
          <div>
            {/* Header Info */}
            <div className="flex items-start justify-between gap-4 mb-5">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-inner group-hover:bg-cyan-500/20 transition-colors">
                <Laptop className="w-6 h-6" />
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-950/80 text-cyan-300 border border-cyan-500/40 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                Current
              </span>
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-white mb-4 leading-snug group-hover:text-cyan-300 transition-colors">
              Diploma in Computer Science &amp; Technology
            </h3>

            {/* Details List */}
            <ul className="space-y-2.5 text-sm text-slate-300 mb-6">
              <li className="flex items-center gap-2.5">
                <Building2 className="w-4 h-4 text-cyan-400/80 shrink-0" />
                <span>Kurigram Polytechnic Institute</span>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-cyan-400/80 shrink-0" />
                <span>Kurigram, Bangladesh</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Calendar className="w-4 h-4 text-cyan-400/80 shrink-0" />
                <span className="text-cyan-200/90 font-medium">
                  2023 - Present
                </span>
              </li>
            </ul>
          </div>

          {/* Achievements Pills */}
          <div className="pt-4 border-t border-slate-800/80 flex flex-wrap gap-2">
            {[
              "Programming Contest Finalist",
              "Open Source Contributor",
              "Academic Excellence",
            ].map((ach) => (
              <span
                key={ach}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-cyan-950/40 text-cyan-300 border border-cyan-500/20"
              >
                <Trophy className="w-3 h-3 text-amber-400 shrink-0" />
                {ach}
              </span>
            ))}
          </div>
        </motion.article>

        {/* Card 2: Secondary School Certificate (SSC) */}
        <motion.article
          variants={cardVariants}
          whileHover={{ y: -6 }}
          className="relative flex flex-col justify-between bg-[#0b141a]/85 border border-purple-500/30 rounded-3xl p-6 sm:p-7 shadow-[0_0_35px_-5px_rgba(168,85,247,0.15)] hover:border-purple-400 hover:shadow-[0_0_45px_-5px_rgba(168,85,247,0.3)] transition-all duration-300 backdrop-blur-md group"
        >
          <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-purple-400 to-transparent" />
          <div>
            {/* Header Info */}
            <div className="flex items-start justify-between gap-4 mb-5">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shadow-inner group-hover:bg-purple-500/20 transition-colors">
                <BookOpen className="w-6 h-6" />
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 shadow-sm">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Completed
              </span>
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-white mb-4 leading-snug group-hover:text-purple-300 transition-colors">
              Secondary School Certificate (SSC)
            </h3>

            {/* Details List */}
            <ul className="space-y-2.5 text-sm text-slate-300 mb-6">
              <li className="flex items-center gap-2.5">
                <Building2 className="w-4 h-4 text-purple-400/80 shrink-0" />
                <span>Char Baruitari Alim Madrasah</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Laptop className="w-4 h-4 text-purple-400/80 shrink-0" />
                <span>Dept: Computer Science / Science</span>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-purple-400/80 shrink-0" />
                <span>Bhurungamari, Kurigram</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Calendar className="w-4 h-4 text-purple-400/80 shrink-0" />
                <span className="text-purple-200/90 font-medium">
                  Passing Year: 2023
                </span>
              </li>
            </ul>
          </div>

          {/* Achievements Pills */}
          <div className="pt-4 border-t border-slate-800/80 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-purple-950/60 text-purple-200 border border-purple-500/30">
              <Trophy className="w-3 h-3 text-amber-400 shrink-0" /> GPA 4.78
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-purple-950/40 text-purple-300 border border-purple-500/20">
              <Trophy className="w-3 h-3 text-amber-400 shrink-0" /> Best Student Award
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-purple-950/40 text-purple-300 border border-purple-500/20">
              <Trophy className="w-3 h-3 text-amber-400 shrink-0" /> Debate Champion
            </span>
          </div>
        </motion.article>

        {/* Card 3: MERN Stack Development */}
        <motion.article
          variants={cardVariants}
          whileHover={{ y: -6 }}
          className="relative flex flex-col justify-between bg-[#0b141a]/85 border border-amber-500/30 rounded-3xl p-6 sm:p-7 shadow-[0_0_35px_-5px_rgba(245,158,11,0.15)] hover:border-amber-400 hover:shadow-[0_0_45px_-5px_rgba(245,158,11,0.3)] transition-all duration-300 backdrop-blur-md group"
        >
          <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
          <div>
            {/* Header Info */}
            <div className="flex items-start justify-between gap-4 mb-5">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-inner group-hover:bg-amber-500/20 transition-colors">
                <Code2 className="w-6 h-6" />
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-950/80 text-amber-300 border border-amber-500/40 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Certification
              </span>
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-white mb-4 leading-snug group-hover:text-amber-300 transition-colors">
              MERN Stack Development
            </h3>

            {/* Details List */}
            <ul className="space-y-2.5 text-sm text-slate-300 mb-6">
              <li className="flex items-center gap-2.5">
                <Building2 className="w-4 h-4 text-amber-400/80 shrink-0" />
                <span>Programming Hero</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Laptop className="w-4 h-4 text-amber-400/80 shrink-0" />
                <span>Online Learning / Remote</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Calendar className="w-4 h-4 text-amber-400/80 shrink-0" />
                <span className="text-amber-200/90 font-medium">
                  Batch 2024 - 2025
                </span>
              </li>
            </ul>
          </div>

          {/* Achievements Pills */}
          <div className="pt-4 border-t border-slate-800/80 flex flex-wrap gap-2">
            {[
              "Full-Stack Certified",
              "10+ Projects",
              "API Integration",
            ].map((ach) => (
              <span
                key={ach}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-amber-950/40 text-amber-300 border border-amber-500/20"
              >
                <Trophy className="w-3 h-3 text-amber-400 shrink-0" />
                {ach}
              </span>
            ))}
          </div>
        </motion.article>
      </motion.div>
    </section>
  );
}
