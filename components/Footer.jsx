"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import gsap from "gsap";
import {
  FaGithub,
  FaLinkedin,
  FaFacebook,
  FaDiscord,
  FaReact,
  FaNodeJs,
  FaDatabase,
  FaLayerGroup,
  FaGauge,
  FaShieldHalved,
} from "react-icons/fa6";
import {
  Code2,
  Send,
  Calendar,
  MapPin,
  Mail,
  Phone,
  ArrowRight,
  ArrowUp,
  Heart,
  Coffee,
  Sparkles,
  ChevronRight,
  CheckCircle2,
  Globe,
  Zap,
  Radio,
} from "lucide-react";

const staticParticleData = [
  { x: -450, y: 120, opacity: 0.35 },
  { x: 380, y: 280, opacity: 0.25 },
  { x: -180, y: 410, opacity: 0.45 },
  { x: 520, y: 90, opacity: 0.2 },
  { x: -320, y: 340, opacity: 0.3 },
  { x: 210, y: 190, opacity: 0.5 },
  { x: -580, y: 490, opacity: 0.22 },
  { x: 110, y: 70, opacity: 0.4 },
  { x: -80, y: 230, opacity: 0.35 },
  { x: 440, y: 390, opacity: 0.28 },
  { x: -260, y: 150, opacity: 0.48 },
  { x: 310, y: 460, opacity: 0.32 },
];

// Floating Particle Tag Component with zero-g hover attraction
function FloatingParticleTag({ text, icon: Icon, colorClass, delay = 0, initialY = 0 }) {
  const tagRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 20, stiffness: 200 };
  const dx = useSpring(mouseX, springConfig);
  const dy = useSpring(mouseY, springConfig);

  const handleMouseMove = (e) => {
    if (!tagRef.current) return;
    const rect = tagRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set((e.clientX - centerX) * 0.35);
    mouseY.set((e.clientY - centerY) * 0.35);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={tagRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: [initialY, initialY - 6, initialY + 4, initialY],
        rotate: [-1, 1.5, -1],
      }}
      transition={{
        opacity: { duration: 0.6, delay },
        scale: { duration: 0.6, delay },
        y: { duration: 4.5 + delay, repeat: Infinity, ease: "easeInOut" },
        rotate: { duration: 6 + delay, repeat: Infinity, ease: "easeInOut" },
      }}
      style={{ x: dx, y: dy }}
      className={`px-3 py-1.5 rounded-full backdrop-blur-md border text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-lg transition-colors duration-300 ${colorClass}`}
    >
      {Icon && <Icon className="w-3.5 h-3.5" />}
      <span>{text}</span>
    </motion.div>
  );
}

// Holographic Orbiting Network Node Graphic
function HolographicNetworkNode() {
  return (
    <div className="relative w-40 h-40 sm:w-48 sm:h-48 flex items-center justify-center pointer-events-none select-none">
      {/* Outer spinning dash ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 rounded-full border border-dashed border-cyan-500/30"
      />
      {/* Reverse inner gradient ring */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute inset-3 rounded-full border border-violet-500/30"
      />
      {/* Pulse backdrop glow */}
      <motion.div
        animate={{ scale: [0.9, 1.15, 0.9], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-24 h-24 rounded-full bg-gradient-to-tr from-cyan-500/20 via-purple-500/20 to-pink-500/20 blur-xl"
      />
      {/* Center Holographic Core Node */}
      <div className="relative z-10 w-14 h-14 rounded-2xl bg-slate-900/90 border border-cyan-400/50 flex items-center justify-center shadow-lg shadow-cyan-500/20">
        <Globe className="w-7 h-7 text-cyan-400 animate-pulse" />
      </div>

      {/* Orbiting Floating Data Points */}
      {[
        { color: "bg-cyan-400", angle: 0, distance: 58, delay: 0 },
        { color: "bg-violet-400", angle: 120, distance: 62, delay: 1 },
        { color: "bg-pink-400", angle: 240, distance: 55, delay: 2 },
      ].map((pt, idx) => (
        <motion.div
          key={idx}
          animate={{
            rotate: [pt.angle, pt.angle + 360],
          }}
          transition={{ duration: 12 + idx * 3, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <motion.div
            style={{ transform: `translate(${pt.distance}px, 0px)` }}
            animate={{ scale: [0.8, 1.3, 0.8], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: pt.delay, ease: "easeInOut" }}
            className={`w-2.5 h-2.5 rounded-full ${pt.color} shadow-sm shadow-white/50`}
          />
        </motion.div>
      ))}
    </div>
  );
}

export default function Footer() {
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: false, margin: "-80px" });

  const glowRef1 = useRef(null);
  const glowRef2 = useRef(null);
  const glowRef3 = useRef(null);

  const [subscribed, setSubscribed] = useState(false);
  const [emailInput, setEmailInput] = useState("");

  // Mouse Parallax values for subtle zero-gravity tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { damping: 25, stiffness: 120 });
  const smoothMouseY = useSpring(mouseY, { damping: 25, stiffness: 120 });

  const ctaTiltX = useTransform(smoothMouseY, [-300, 300], [4, -4]);
  const ctaTiltY = useTransform(smoothMouseX, [-300, 300], [-4, 4]);

  const handleMouseMove = (e) => {
    if (!footerRef.current) return;
    const rect = footerRef.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    mouseX.set(x);
    mouseY.set(y);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (glowRef1.current) {
        gsap.to(glowRef1.current, {
          opacity: 0.65,
          scale: 1.2,
          y: -15,
          duration: 5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
      if (glowRef2.current) {
        gsap.to(glowRef2.current, {
          opacity: 0.75,
          scale: 1.25,
          x: 20,
          duration: 6,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 1,
        });
      }
      if (glowRef3.current) {
        gsap.to(glowRef3.current, {
          opacity: 0.55,
          scale: 1.15,
          y: 20,
          duration: 7,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 2,
        });
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmailInput("");
      }, 4000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      ref={footerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full overflow-hidden bg-[#030712] border-t border-slate-800/80 pt-16 pb-8 text-slate-300 font-sans"
    >
      {/* Atmospheric Swirling Gas-Cloud Nebulae & Ambient Lights */}
      <div
        ref={glowRef1}
        className="absolute -top-20 left-1/4 w-[500px] h-[350px] bg-gradient-to-br from-cyan-600/20 via-blue-600/10 to-transparent rounded-full blur-[100px] pointer-events-none opacity-40"
      />
      <div
        ref={glowRef2}
        className="absolute top-1/3 right-1/6 w-[550px] h-[400px] bg-gradient-to-tl from-purple-700/25 via-pink-600/15 to-transparent rounded-full blur-[110px] pointer-events-none opacity-40"
      />
      <div
        ref={glowRef3}
        className="absolute bottom-0 left-1/3 w-[450px] h-[300px] bg-gradient-to-r from-emerald-600/15 to-cyan-500/15 rounded-full blur-[90px] pointer-events-none opacity-30"
      />

      {/* Sparse Holographic Background Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Drifting Background Star/Particle Points */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {staticParticleData.map((pt, i) => (
          <motion.div
            key={i}
            initial={{
              x: pt.x,
              y: pt.y,
              opacity: pt.opacity,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.2, 0.7, 0.2],
            }}
            transition={{
              duration: 6 + (i % 5) * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.4,
            }}
            className="absolute left-1/2 top-10 w-1 h-1 bg-cyan-300 rounded-full blur-[0.5px]"
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* ========================================================= */}
        {/* 1. TOP MAIN CTA CARD — "Have an exciting idea?" (ZERO-G LIFT-OFF) */}
        {/* ========================================================= */}
        <motion.div
          style={{ rotateX: ctaTiltX, rotateY: ctaTiltY, perspective: 1000 }}
          initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl p-8 sm:p-12 mb-20 shadow-2xl relative overflow-hidden bg-slate-900/70 backdrop-blur-2xl border border-slate-800/90 hover:border-cyan-500/40 transition-all duration-500 group"
        >
          {/* Soft Backdrop-Glow Intensification on hover */}
          <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-gradient-to-br from-cyan-500/20 via-violet-600/20 to-pink-500/15 rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700 opacity-60 group-hover:opacity-100" />
          
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10 relative z-10">
            {/* Left Content Area */}
            <div className="space-y-5 text-center lg:text-left max-w-2xl">
              {/* Floating Particle Tags Cluster */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
                <FloatingParticleTag
                  text="Now Booking Projects"
                  icon={Radio}
                  colorClass="bg-cyan-500/10 border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20"
                  delay={0}
                  initialY={0}
                />
                <FloatingParticleTag
                  text="Est. 2024"
                  icon={Sparkles}
                  colorClass="bg-purple-500/10 border-purple-500/30 text-purple-300 hover:bg-purple-500/20"
                  delay={0.2}
                  initialY={2}
                />
                <FloatingParticleTag
                  text="Active"
                  icon={Zap}
                  colorClass="bg-emerald-500/10 border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20"
                  delay={0.4}
                  initialY={-2}
                />
                <FloatingParticleTag
                  text="Base: Bangladesh"
                  icon={MapPin}
                  colorClass="bg-pink-500/10 border-pink-500/30 text-pink-300 hover:bg-pink-500/20"
                  delay={0.6}
                  initialY={1}
                />
              </div>

              {/* Main Heading Reveal with Blur-to-Focus */}
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
                Have an exciting idea?{" "}
                <span className="bg-gradient-to-r from-[#38bdf8] via-[#818cf8] to-[#c084fc] bg-clip-text text-transparent">
                  Let’s build it together.
                </span>
              </h3>

              <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-xl">
                Specialized in full-stack MERN development, high-performance web architecture, and intuitive motion design. Turning complex ideas into digital realities.
              </p>

              {/* Liquid-Pulse Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <motion.a
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  href="mailto:kawsarbosuniya52@gmail.com"
                  className="relative px-7 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 text-white font-semibold text-sm shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all flex items-center gap-2.5 group/btn overflow-hidden cursor-pointer"
                >
                  <span className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out" />
                  <Send className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 relative z-10" />
                  <span className="relative z-10">Send Email</span>
                </motion.a>

                <motion.a
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  href="mailto:kawsarbosuniya52@gmail.com?subject=Schedule%20Call%20Request"
                  className="px-7 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 text-slate-200 border border-slate-700/90 hover:border-cyan-500/40 font-semibold text-sm transition-all flex items-center gap-2.5 shadow-lg shadow-black/40 cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-cyan-400" />
                  <span>Schedule Call</span>
                </motion.a>
              </div>
            </div>

            {/* Right Graphic: Holographic Orbiting Node & Data Points */}
            <div className="relative shrink-0 flex items-center justify-center pt-4 lg:pt-0">
              <HolographicNetworkNode />
            </div>
          </div>
        </motion.div>

        {/* ========================================================= */}
        {/* 2. MAIN 4-COLUMN GRID (OPEN, SEAMLESS, UNBOXED ELEGANT LAYOUT) */}
        {/* ========================================================= */}
        <div className="relative pt-4 pb-16 border-b border-slate-800/80">
          {/* Animated Glow Accent Line Above Grid */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/40 via-violet-500/40 to-transparent pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pt-8">
            
            {/* Column 1: Brand & Profile Info (4 cols) */}
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="lg:col-span-4 space-y-5"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500 to-violet-600 p-0.5 shadow-lg shadow-cyan-500/20">
                  <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                    <Code2 className="w-6 h-6 text-cyan-400" />
                  </div>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                    Kawsar Ahamed
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  </h4>
                  <p className="text-xs font-mono text-cyan-400/90 font-medium">
                    MERN Stack Developer
                  </p>
                </div>
              </div>

              <p className="text-slate-400 text-sm leading-relaxed pr-2">
                Crafting high-performance, scalable web applications with clean architecture, modern APIs, and weightless user interfaces.
              </p>

              {/* Direct Contact Links */}
              <div className="space-y-3 text-xs text-slate-300 pt-1">
                <div className="flex items-center gap-3 group">
                  <div className="w-7 h-7 rounded-lg bg-slate-900/90 border border-slate-800 flex items-center justify-center text-cyan-400 group-hover:border-cyan-500/50 group-hover:scale-110 transition-all shrink-0">
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                  <span className="group-hover:text-slate-200 transition-colors">Pirgachha, Rangpur</span>
                </div>
                <div className="flex items-center gap-3 group">
                  <div className="w-7 h-7 rounded-lg bg-slate-900/90 border border-slate-800 flex items-center justify-center text-purple-400 group-hover:border-purple-500/50 group-hover:scale-110 transition-all shrink-0">
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                  <a
                    href="mailto:kawsarbosuniya52@gmail.com"
                    className="hover:text-cyan-400 transition-colors font-mono"
                  >
                    kawsarbosuniya52@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-3 group">
                  <div className="w-7 h-7 rounded-lg bg-slate-900/90 border border-slate-800 flex items-center justify-center text-emerald-400 group-hover:border-emerald-500/50 group-hover:scale-110 transition-all shrink-0">
                    <Phone className="w-3.5 h-3.5" />
                  </div>
                  <a
                    href="tel:+8801713531778"
                    className="hover:text-emerald-400 transition-colors font-mono"
                  >
                    +880 1713-531778
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Column 2: Navigation Links (2 cols) */}
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-2 space-y-4"
            >
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-200 font-mono flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                Navigation
              </h5>
              <ul className="space-y-2.5 text-sm text-slate-400">
                {[
                  { name: "Home", href: "#home" },
                  { name: "About Me", href: "#about" },
                  { name: "Tech Stack", href: "#skills" },
                  { name: "Projects", href: "#projects" },
                  { name: "Education", href: "#education" },
                  { name: "Contact", href: "#contact" },
                ].map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="hover:text-cyan-400 transition-colors inline-flex items-center gap-1.5 group"
                    >
                      <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                      <span>{item.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Column 3: Specialization (2 cols) */}
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="lg:col-span-2 space-y-4"
            >
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-200 font-mono flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                Specialization
              </h5>
              <ul className="space-y-2.5 text-sm text-slate-400">
                <li className="flex items-center gap-2 group cursor-default">
                  <FaReact className="text-cyan-400 text-xs shrink-0 group-hover:scale-125 transition-transform" />
                  <span className="group-hover:text-slate-200 transition-colors">Frontend UI/UX</span>
                </li>
                <li className="flex items-center gap-2 group cursor-default">
                  <FaNodeJs className="text-emerald-400 text-xs shrink-0 group-hover:scale-125 transition-transform" />
                  <span className="group-hover:text-slate-200 transition-colors">RESTful APIs</span>
                </li>
                <li className="flex items-center gap-2 group cursor-default">
                  <FaDatabase className="text-violet-400 text-xs shrink-0 group-hover:scale-125 transition-transform" />
                  <span className="group-hover:text-slate-200 transition-colors">MongoDB &amp; SQL</span>
                </li>
                <li className="flex items-center gap-2 group cursor-default">
                  <FaLayerGroup className="text-blue-400 text-xs shrink-0 group-hover:scale-125 transition-transform" />
                  <span className="group-hover:text-slate-200 transition-colors">MERN Architecture</span>
                </li>
                <li className="flex items-center gap-2 group cursor-default">
                  <FaGauge className="text-pink-400 text-xs shrink-0 group-hover:scale-125 transition-transform" />
                  <span className="group-hover:text-slate-200 transition-colors">Performance Optimization</span>
                </li>
                <li className="flex items-center gap-2 group cursor-default">
                  <FaShieldHalved className="text-amber-400 text-xs shrink-0 group-hover:scale-125 transition-transform" />
                  <span className="group-hover:text-slate-200 transition-colors">JWT Security</span>
                </li>
              </ul>
            </motion.div>

            {/* Column 4: Newsletter & Official Social Profiles (4 cols) */}
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="lg:col-span-4 space-y-5"
            >
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-200 font-mono flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-pink-400" />
                Stay Connected
              </h5>
              <p className="text-slate-400 text-xs leading-relaxed">
                Subscribe for periodic releases of new open-source repositories and MERN stack case studies.
              </p>

              {/* Newsletter Input */}
              <form onSubmit={handleSubscribe} className="relative">
                <div className="flex items-center rounded-xl bg-slate-900/90 border border-slate-700/80 focus-within:border-cyan-500 focus-within:ring-1 focus-within:ring-cyan-500/50 p-1.5 transition-all shadow-inner">
                  <Mail className="w-4 h-4 text-slate-500 ml-2.5 mr-1 shrink-0" />
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="Enter your email address..."
                    className="w-full bg-transparent text-xs text-slate-200 placeholder-slate-500 focus:outline-none py-1.5 pr-2 font-sans"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-semibold transition-all shadow-md shadow-cyan-500/20 shrink-0 flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Subscribe</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                {subscribed && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-xs text-emerald-400 flex items-center gap-1.5 font-medium"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Subscribed successfully!</span>
                  </motion.div>
                )}
              </form>

              {/* Social Hub */}
              <div className="pt-2">
                <p className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2.5">
                  Official Channels
                </p>
                <div className="flex flex-wrap items-center gap-2.5">
                  {/* GitHub */}
                  <motion.a
                    whileHover={{ scale: 1.15, y: -3 }}
                    whileTap={{ scale: 0.94 }}
                    href="https://github.com/kawsar9867"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/50 flex items-center justify-center text-slate-300 hover:text-cyan-400 transition-all shadow-md"
                    title="GitHub Profile"
                  >
                    <FaGithub className="text-base" />
                  </motion.a>

                  {/* LinkedIn */}
                  <motion.a
                    whileHover={{ scale: 1.15, y: -3 }}
                    whileTap={{ scale: 0.94 }}
                    href="https://www.linkedin.com/in/kawsarahamed01"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-blue-500/50 flex items-center justify-center text-slate-300 hover:text-blue-400 transition-all shadow-md"
                    title="LinkedIn Profile"
                  >
                    <FaLinkedin className="text-base" />
                  </motion.a>

                  {/* Facebook */}
                  <motion.a
                    whileHover={{ scale: 1.15, y: -3 }}
                    whileTap={{ scale: 0.94 }}
                    href="https://www.facebook.com/kawsar.bosuniya.77"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-indigo-500/50 flex items-center justify-center text-slate-300 hover:text-indigo-400 transition-all shadow-md"
                    title="Facebook Profile"
                  >
                    <FaFacebook className="text-base" />
                  </motion.a>

                  {/* Discord */}
                  <motion.a
                    whileHover={{ scale: 1.15, y: -3 }}
                    whileTap={{ scale: 0.94 }}
                    href="https://discord.com/users/kawsar00001"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-violet-500/50 flex items-center justify-center text-slate-300 hover:text-violet-400 transition-all shadow-md"
                    title="Discord Profile"
                  >
                    <FaDiscord className="text-base" />
                  </motion.a>

                  {/* Email Direct */}
                  <motion.a
                    whileHover={{ scale: 1.15, y: -3 }}
                    whileTap={{ scale: 0.94 }}
                    href="mailto:kawsarbosuniya52@gmail.com"
                    className="w-10 h-10 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-pink-500/50 flex items-center justify-center text-slate-300 hover:text-pink-400 transition-all shadow-md"
                    title="Send Email Direct"
                  >
                    <Mail className="text-base" />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 3. BOTTOM BAR: COPYRIGHT & BACK-TO-TOP */}
        {/* ========================================================= */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-5 text-xs text-slate-400 border-t border-slate-800/40 mt-4">
          
          <div className="flex items-center gap-3 flex-wrap justify-center md:justify-start">
            <div className="px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800/90 text-slate-300 flex items-center gap-2 shadow-inner">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              <span>
                &copy; {new Date().getFullYear()}{" "}
                <strong className="text-white font-bold tracking-wide">
                  Kawsar Ahamed
                </strong>
                . All rights reserved.
              </span>
            </div>

            <div className="px-3.5 py-1.5 rounded-full bg-slate-900/60 border border-slate-800/60 text-slate-400 flex items-center gap-1.5">
              <span>Crafted with</span>
              <Heart className="w-3.5 h-3.5 text-red-500 animate-pulse" />
              <span>&amp;</span>
              <Coffee className="w-3.5 h-3.5 text-amber-500" />
              <span>in Bangladesh</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4 text-slate-400 font-medium">
              <a href="#privacy" className="hover:text-cyan-400 transition-colors">
                Privacy Policy
              </a>
              <span className="text-slate-700">•</span>
              <a href="#terms" className="hover:text-cyan-400 transition-colors">
                Terms of Service
              </a>
            </div>

            {/* Back to top button */}
            <motion.button
              whileHover={{ scale: 1.12, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToTop}
              className="w-10 h-10 rounded-xl bg-slate-900 hover:bg-gradient-to-br hover:from-cyan-500 hover:to-violet-600 border border-slate-800 hover:border-transparent text-slate-400 hover:text-white flex items-center justify-center transition-all shadow-lg shadow-black/50 group cursor-pointer"
              title="Scroll to Top"
            >
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
            </motion.button>
          </div>
        </div>

      </div>
    </footer>
  );
}

