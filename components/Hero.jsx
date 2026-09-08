"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";
import {
  Mail,
  Download,
  ArrowRight,
  Sparkles,
  MapPin,
  Coffee,
  Terminal,
  FileJson,
  Braces,
  ChevronRight,
  Zap,
  Code2,
} from "lucide-react";

const coderData = {
  name: "Kawsar Ahamed",
  role: "MERN STACK Web Developer",
  seniority: "Mid-Level",
  location: "Bangladesh",
  skills: [
    "React",
    "Next.js",
    "JavaScript",
    "TailwindCSS",
    "CSS",
    "Figma",
    "GitHub",
    "HTML",
    "Node.js",
    "Express",
    "MongoDB",
    "Git",
  ],
};

// Interactive 3D Holographic Terminal Card
const CoderProfileCard = () => {
  const cardRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 120 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [-200, 200], [8, -8]);
  const rotateY = useTransform(smoothX, [-200, 200], [-8, 8]);
  const spotX = useTransform(smoothX, [-200, 200], ["20%", "80%"]);
  const spotY = useTransform(smoothY, [-200, 200], ["20%", "80%"]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, perspective: 1000 }}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-2xl mx-auto relative z-10"
      id="home"
    >
      <div className="relative group">
        {/* Swirling Outer Glow */}
        <div className="absolute -inset-1.5 bg-gradient-to-r from-cyan-500 via-indigo-600 to-pink-500 rounded-2xl opacity-30 group-hover:opacity-60 blur-xl transition-all duration-700" />

        {/* Floating Ambient Badges around Terminal */}
        <motion.div
          animate={{ y: [0, -8, 0, 8, 0], rotate: [-2, 2, -2] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="hidden sm:flex absolute -top-5 -right-4 z-20 items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/40 text-[11px] font-mono text-cyan-300 shadow-lg backdrop-blur-md"
        >
          <Zap className="w-3 h-3 text-cyan-400 animate-pulse" />
          <span>Next.js 15 Ready</span>
        </motion.div>

        <motion.div
          animate={{ y: [0, 8, 0, -8, 0], rotate: [2, -2, 2] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="hidden sm:flex absolute -bottom-5 -left-4 z-20 items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/90 border border-violet-500/40 text-[11px] font-mono text-violet-300 shadow-lg backdrop-blur-md"
        >
          <Code2 className="w-3 h-3 text-violet-400" />
          <span>Full-Stack Architecture</span>
        </motion.div>

        {/* Main Terminal Window */}
        <div className="relative bg-[#090d16]/95 border border-slate-800/90 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl">
          {/* Dynamic Radial Spotlight Behind Code */}
          <motion.div
            style={{
              background: useTransform(
                [spotX, spotY],
                ([x, y]) => `radial-gradient(400px circle at ${x} ${y}, rgba(6, 182, 212, 0.12), transparent 80%)`
              ),
            }}
            className="absolute inset-0 pointer-events-none z-0"
          />

          {/* Terminal Header */}
          <div className="relative z-10 px-4 lg:px-6 py-3 flex justify-between items-center bg-[#070a12] border-b border-slate-800/80">
            <div className="flex items-center gap-2">
              <div className="flex space-x-2">
                <div className="h-3 w-3 rounded-full bg-red-500/90 hover:bg-red-400 transition-colors cursor-pointer shadow-sm shadow-red-500/50" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/90 hover:bg-yellow-400 transition-colors cursor-pointer shadow-sm shadow-yellow-500/50" />
                <div className="h-3 w-3 rounded-full bg-emerald-500/90 hover:bg-emerald-400 transition-colors cursor-pointer shadow-sm shadow-emerald-500/50" />
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono bg-slate-900/80 px-3 py-1 rounded-full border border-slate-800">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-cyan-300 font-medium">kawsar@portfolio</span>
              <span className="text-slate-500">~/bio.js</span>
            </div>
            <div className="w-16 flex justify-end">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </div>
          </div>

          {/* Terminal Body */}
          <div className="relative z-10 overflow-hidden px-4 lg:px-6 py-5 lg:py-7">
            <div className="relative flex">
              {/* Line Numbers */}
              <div className="hidden md:flex flex-col items-end pr-4 text-slate-600 font-mono text-xs select-none space-y-1">
                {Array.from({ length: 11 }, (_, i) => (
                  <div key={i} className="leading-relaxed">
                    {i + 1}
                  </div>
                ))}
              </div>

              {/* Code Content */}
              <code className="font-mono text-xs md:text-sm lg:text-base w-full space-y-1">
                <div className="flex items-center gap-2">
                  <FileJson className="w-4 h-4 text-amber-400" />
                  <span className="text-pink-400 font-semibold">const</span>
                  <span className="text-violet-300 font-semibold">coder</span>
                  <span className="text-pink-400">=</span>
                  <span className="text-slate-400">{"{"}</span>
                </div>
                <div className="pl-6 hover:bg-slate-800/40 transition-colors rounded py-0.5">
                  <span className="text-sky-400">name:</span>
                  <span className="text-slate-500">&#39;</span>
                  <span className="text-emerald-300 font-medium">{coderData.name}</span>
                  <span className="text-slate-500">&#39;,</span>
                </div>
                <div className="pl-6 hover:bg-slate-800/40 transition-colors rounded py-0.5">
                  <span className="text-sky-400">role:</span>
                  <span className="text-slate-500">&#39;</span>
                  <span className="text-emerald-300 font-medium">{coderData.role}</span>
                  <span className="text-slate-500">&#39;,</span>
                </div>
                <div className="pl-6 hover:bg-slate-800/40 transition-colors rounded py-0.5 bg-cyan-950/20 border-l-2 border-cyan-500/60">
                  <span className="text-sky-400">seniority:</span>
                  <span className="text-slate-500">&#39;</span>
                  <span className="text-emerald-300 font-medium">{coderData.seniority}</span>
                  <span className="text-slate-500">&#39;,</span>
                </div>
                <div className="pl-6 hover:bg-slate-800/40 transition-colors rounded py-0.5">
                  <span className="text-sky-400">location:</span>
                  <span className="text-slate-500">&#39;</span>
                  <span className="text-emerald-300 font-medium">{coderData.location}</span>
                  <span className="text-slate-500">&#39;,</span>
                </div>
                <div className="pl-6 py-0.5">
                  <span className="text-sky-400">skills:</span>
                  <span className="text-slate-400">{"["}</span>
                  <div className="pl-6 flex flex-wrap gap-x-1 py-1">
                    {coderData.skills.map((skill, index) => (
                      <span key={skill} className="inline-flex items-center">
                        <span className="text-slate-500">&#39;</span>
                        <span className="text-emerald-300 hover:text-cyan-300 transition-colors cursor-pointer">
                          {skill}
                        </span>
                        <span className="text-slate-500">&#39;</span>
                        {index < coderData.skills.length - 1 && (
                          <span className="text-slate-500">, </span>
                        )}
                      </span>
                    ))}
                  </div>
                  <span className="text-slate-400">{"],"}</span>
                </div>
                <div>
                  <span className="text-slate-400">{"};"}</span>
                </div>
              </code>
            </div>
          </div>

          {/* Terminal Footer */}
          <div className="relative z-10 px-4 lg:px-6 py-2.5 bg-[#070a12] border-t border-slate-800/80 flex justify-between items-center text-xs text-slate-500 font-mono">
            <div className="flex items-center gap-2 text-cyan-400">
              <Braces className="w-3.5 h-3.5" />
              <span>JavaScript ES6+</span>
            </div>
            <div className="flex items-center gap-4">
              <span>UTF-8</span>
              <span className="text-emerald-400">● 100% Ready</span>
              <span>Ln 12, Col 2</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Main Hero Component
const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center font-sans overflow-hidden bg-[#030712] py-16 lg:py-24">
      {/* Background Gas Nebulae & Atmosphere */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute -top-24 left-1/4 w-[500px] h-[350px] bg-gradient-to-br from-cyan-600/20 via-blue-600/10 to-transparent rounded-full blur-[110px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[350px] bg-gradient-to-tl from-purple-700/20 via-pink-600/15 to-transparent rounded-full blur-[110px] animate-pulse delay-1000" />
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]" />
      </div>

      {/* Main Content Container */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto max-w-7xl relative z-10 px-4 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-14 xl:gap-16 items-center">
          {/* Left Column - Text Content */}
          <div className="flex flex-col gap-5 sm:gap-6 items-start text-left order-1">
            
            {/* Status Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2.5 px-4 py-2 bg-emerald-950/40 border border-emerald-500/30 rounded-full text-xs font-semibold text-emerald-300 shadow-lg shadow-emerald-500/10 backdrop-blur-md"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
              </span>
              <span>Available for opportunities</span>
              <Sparkles className="w-4 h-4 text-amber-400" />
            </motion.div>

            {/* Main Heading */}
            <motion.div variants={itemVariants} className="relative w-full space-y-2">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.1] tracking-tight text-white">
                Hello, I&apos;m{" "}
                <br />
                <span className="bg-gradient-to-r from-[#38bdf8] via-[#818cf8] via-[#c084fc] to-[#f472b6] bg-clip-text text-transparent drop-shadow-sm">
                  {coderData.name}
                </span>
              </h1>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.9, delay: 0.4 }}
                className="h-1 bg-gradient-to-r from-[#38bdf8] via-[#c084fc] to-transparent rounded-full max-w-md"
              />
            </motion.div>

            {/* Location */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-2 text-slate-400 text-sm font-medium"
            >
              <MapPin className="w-4 h-4 text-rose-500 fill-current animate-bounce" />
              <span>{coderData.location}</span>
            </motion.div>

            {/* Feature Tags */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-2.5 sm:gap-3"
            >
              {[
                "🚀 MERN Stack Developer",
                "⚛️ React Enthusiast",
                "💡 Open Source Lover",
              ].map((tag) => (
                <motion.span
                  key={tag}
                  whileHover={{ scale: 1.06, y: -2 }}
                  className="px-4 py-2 bg-slate-900/80 border border-slate-800 rounded-full text-slate-200 text-xs font-semibold backdrop-blur-md shadow-sm transition-colors hover:border-cyan-500/40 cursor-default"
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-slate-300 text-base sm:text-lg max-w-lg leading-relaxed"
            >
              <Coffee className="w-5 h-5 inline-block mr-2 text-amber-400" />
              Passionate about crafting beautiful, functional web experiences. Turning complex problems into simple, elegant solutions.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 mt-2 w-full sm:w-auto"
            >
              <a href="#">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  className="group cursor-pointer flex items-center justify-center gap-2.5 px-7 py-3.5 bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 hover:from-cyan-400 hover:to-violet-500 text-white rounded-xl font-semibold text-sm transition-all duration-300 shadow-xl shadow-cyan-500/25"
                >
                  <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                  <span>Download Resume</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </a>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.96 }}
                className="flex items-center justify-center gap-2 px-7 py-3.5 bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 text-white rounded-xl font-semibold text-sm transition-all duration-300 backdrop-blur-md hover:bg-slate-800/90 shadow-lg"
              >
                <Mail className="w-4 h-4 text-cyan-400" />
                <span>Contact Me</span>
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-3 pt-1"
            >
              {[
                {
                  icon: FaGithub,
                  href: "https://github.com/kawsar9867",
                  label: "GitHub",
                },
                {
                  icon: FaLinkedin,
                  href: "https://www.linkedin.com/in/kawsarahamed01",
                  label: "LinkedIn",
                },
                {
                  icon: FaFacebook,
                  href: "https://www.facebook.com/kawsar.bosuniya.77",
                  label: "Facebook",
                },
              ].map((social) => {
                const IconComponent = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.15, y: -3 }}
                    whileTap={{ scale: 0.92 }}
                    className="p-3 bg-slate-900/90 border border-slate-800 rounded-xl text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 transition-all duration-300 shadow-md"
                    title={social.label}
                  >
                    <IconComponent className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </motion.div>
          </div>

          {/* Right Column - Holographic Terminal Card */}
          <div className="order-2 lg:order-2">
            <CoderProfileCard />
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="mt-16 flex flex-col items-center gap-2"
        >
          <span className="text-[11px] text-slate-500 uppercase tracking-[0.25em] font-mono font-semibold">
            Scroll to explore
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <ChevronRight className="w-5 h-5 text-cyan-400 rotate-90" />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;

