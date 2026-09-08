"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import gsap from "gsap";
import {
  FaGithub,
  FaLinkedin,
  FaFacebook,
  FaDiscord,
} from "react-icons/fa6";
import {
  Mail,
  MapPin,
  Phone,
  Calendar,
  ArrowUpRight,
  Sparkles,
  Send,
  Clock,
  Globe,
  ChevronRight,
} from "lucide-react";

// Floating Particle Tag Component
function FloatingParticleTag({ children, className }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 350, damping: 18 });
  const springY = useSpring(y, { stiffness: 350, damping: 18 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.25);
    y.set((e.clientY - centerY) * 0.25);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.08, rotate: [0, -2, 2, 0] }}
      className={`cursor-default inline-block transition-colors ${className}`}
    >
      {children}
    </motion.span>
  );
}

// Antigravity Floating Contact Card Wrapper
function FloatingContactCard({
  children,
  className,
  floatIndex = 0,
  glowColor = "rgba(6,182,212,0.22)",
  dataPurpose,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 220 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);
  const spotX = useSpring(useTransform(mouseX, [-0.5, 0.5], [0, 100]), springConfig);
  const spotY = useSpring(useTransform(mouseY, [-0.5, 0.5], [0, 100]), springConfig);

  const handleMouseMove = (e) => {
    if (isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;

    mouseX.set(currentX / width - 0.5);
    mouseY.set(currentY / height - 0.5);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  const floatDuration = 3.6 + (floatIndex % 3) * 0.7;
  const floatDelay = (floatIndex % 4) * 0.35;

  return (
    <motion.article
      data-purpose={dataPurpose}
      initial={{ opacity: 0, scale: 0.93, filter: "blur(10px)", y: 35 }}
      whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)", y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      animate={
        isHovered || isMobile
          ? { y: 0, rotate: 0 }
          : {
              y: [0, -8, 0],
              rotate: [0, 0.8, 0, -0.8, 0],
              transition: {
                y: {
                  duration: floatDuration,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  delay: floatDelay,
                },
                rotate: {
                  duration: floatDuration * 1.25,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  delay: floatDelay,
                },
              },
            }
      }
      whileHover={
        !isMobile
          ? {
              scale: 1.02,
              transition: { duration: 0.3, ease: "easeOut" },
            }
          : {}
      }
      style={
        !isMobile && isHovered
          ? {
              perspective: 1000,
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }
          : {}
      }
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden transition-all duration-300 ${className}`}
    >
      {/* Radial Spotlight Glow */}
      {!isMobile && (
        <motion.div
          className="absolute inset-0 pointer-events-none z-0 transition-opacity duration-500"
          style={{
            opacity: isHovered ? 0.4 : 0,
            background: `radial-gradient(380px circle at ${spotX.get()}% ${spotY.get()}%, ${glowColor}, transparent 70%)`,
          }}
        />
      )}
      <div className="relative z-10 h-full flex flex-col justify-between">
        {children}
      </div>
    </motion.article>
  );
}

export default function Contact() {
  const meshRef = useRef(null);

  useEffect(() => {
    if (meshRef.current) {
      gsap.to(meshRef.current, {
        opacity: 0.85,
        scale: 1.08,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };

  return (
    <section
      className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 bg-[#050713] overflow-hidden"
      id="contact"
      data-purpose="portfolio-contact-hub"
    >
      {/* Swirling Atmospheric Gas Nebulae Glow */}
      <div
        ref={meshRef}
        className="absolute top-12 left-1/2 -translate-x-1/2 w-[850px] h-[380px] bg-gradient-to-r from-cyan-500/15 via-purple-600/20 to-pink-500/15 rounded-full blur-[140px] pointer-events-none"
      />

      {/* Top Header Ribbon with Blur-to-Focus */}
      <motion.header
        initial={{ opacity: 0, y: 25, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 relative z-10"
      >
        {/* Pill Badge */}
        <FloatingParticleTag className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-cyan-400/30 bg-cyan-950/40 text-cyan-300 text-xs font-semibold tracking-wider uppercase mb-5 shadow-lg shadow-cyan-950/50 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
          </span>
          <span>GET IN TOUCH • COLLABORATE</span>
        </FloatingParticleTag>

        {/* Main Title */}
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-4 leading-[1.15]">
          Let&apos;s{" "}
          <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-fuchsia-400 bg-clip-text text-transparent">
            Work Together
          </span>
        </h2>

        {/* Subtitle */}
        <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed">
          Have a project in mind or want to collaborate? Feel free to reach out
          through any of these channels.
        </p>
      </motion.header>

      {/* Master Layout: 2-Column Split Grid */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={containerVariants}
        className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch relative z-10"
      >
        {/* LEFT SECTION (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6 justify-between">
          {/* Master Hero CTA Card */}
          <FloatingContactCard
            floatIndex={0}
            glowColor="rgba(168,85,247,0.25)"
            dataPurpose="project-cta-card"
            className="rounded-3xl p-7 sm:p-9 border border-purple-500/30 shadow-2xl shadow-purple-950/30 bg-gradient-to-br from-[#1e1b4b] via-[#0f172a] to-[#030712] group"
          >
            <div className="absolute -right-16 -top-16 w-56 h-56 bg-purple-500/25 rounded-full blur-3xl pointer-events-none group-hover:bg-purple-500/35 transition-all duration-700" />
            <div className="absolute -left-12 -bottom-12 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-500/30 transition-all duration-700" />
            <div className="absolute top-0 right-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />

            {/* Orbiting Holographic Network Node graphic */}
            <div className="absolute top-6 right-6 pointer-events-none opacity-40 group-hover:opacity-80 transition-opacity duration-500 hidden sm:block">
              <motion.svg
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="w-20 h-20 text-cyan-400/50"
                viewBox="0 0 100 100"
              >
                <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
                <circle cx="50" cy="10" r="4" fill="currentColor" />
                <circle cx="90" cy="50" r="3" fill="#a855f7" />
                <circle cx="50" cy="90" r="3" fill="#38bdf8" />
              </motion.svg>
            </div>

            <div className="relative z-10">
              {/* Header Tag */}
              <div className="flex items-center justify-between mb-4">
                <FloatingParticleTag className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                  Now Booking Projects
                </FloatingParticleTag>
                <FloatingParticleTag className="text-xs text-slate-400 font-mono tracking-wider">
                  EST. 2024
                </FloatingParticleTag>
              </div>

              {/* Title & Pitch */}
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2.5">
                Have a Project?
              </h3>
              <p className="text-indigo-100/80 text-sm sm:text-base leading-relaxed max-w-xl mb-7">
                Let&apos;s discuss your ideas and bring them to life with modern
                web technologies.
              </p>

              {/* CTA Action Buttons with Liquid Pulse */}
              <div
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2"
                id="schedule-meeting"
              >
                {/* Send Quick Email Button */}
                <motion.a
                  whileHover={{ scale: 1.04, boxShadow: "0 0 25px rgba(56,189,248,0.4)" }}
                  whileTap={{ scale: 0.96 }}
                  animate={{
                    boxShadow: [
                      "0 0 10px rgba(255,255,255,0.1)",
                      "0 0 20px rgba(255,255,255,0.25)",
                      "0 0 10px rgba(255,255,255,0.1)",
                    ],
                  }}
                  transition={{
                    boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                  }}
                  className="flex-1 py-3.5 px-6 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-bold text-sm flex items-center justify-center gap-2.5 shadow-lg shadow-white/10 transition-all duration-200 group/btn cursor-pointer"
                  href="mailto:kawsarbosuniya52@gmail.com"
                >
                  <Send className="w-4 h-4 text-purple-700 transition-transform group-hover/btn:scale-110 group-hover/btn:-translate-y-0.5" />
                  <span>Send Quick Email</span>
                </motion.a>

                {/* Schedule Meeting Button */}
                <motion.a
                  whileHover={{ scale: 1.04, boxShadow: "0 0 25px rgba(168,85,247,0.35)" }}
                  whileTap={{ scale: 0.96 }}
                  className="flex-1 py-3.5 px-6 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm border border-white/20 hover:border-white/40 backdrop-blur-md flex items-center justify-center gap-2.5 transition-all duration-200 cursor-pointer"
                  href="mailto:kawsarbosuniya52@gmail.com?subject=Meeting%20Request"
                >
                  <Calendar className="w-4 h-4 text-cyan-300" />
                  <span>Schedule Meeting</span>
                </motion.a>
              </div>
            </div>
          </FloatingContactCard>

          {/* 4 Bento Channel Cards (2x2 Grid) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* CARD 1: Email */}
            <FloatingContactCard
              floatIndex={1}
              glowColor="rgba(244,63,94,0.25)"
              dataPurpose="email-contact-card"
              className="bg-[#0c101d]/80 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-white/10 hover:border-rose-500/40 group hover:shadow-[0_0_40px_-10px_rgba(244,63,94,0.25)] flex flex-col justify-between"
            >
              <div className="absolute -top-px left-6 right-6 h-px bg-gradient-to-r from-transparent via-rose-500/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-rose-500/10 border border-rose-500/25 text-rose-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Mail className="w-5 h-5" />
                  </div>
                  <FloatingParticleTag className="text-[11px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-300 border border-rose-500/25">
                    Active
                  </FloatingParticleTag>
                </div>
                <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
                  Email
                </span>
                <h4 className="text-base font-bold text-rose-400 hover:text-rose-300 transition-colors break-all mt-1">
                  <a className="hover:underline" href="mailto:kawsarbosuniya52@gmail.com">
                    kawsarbosuniya52@gmail.com
                  </a>
                </h4>
                <p className="text-slate-400 text-xs sm:text-sm mt-1">
                  Send me an email anytime
                </p>
              </div>
              <div className="pt-4 mt-5 border-t border-white/5 flex items-center gap-2 text-xs text-slate-400 font-medium">
                <Clock className="w-3.5 h-3.5 text-rose-400/80" />
                <span>Response within 24 hours</span>
              </div>
            </FloatingContactCard>

            {/* CARD 2: Location */}
            <FloatingContactCard
              floatIndex={2}
              glowColor="rgba(56,189,248,0.25)"
              dataPurpose="location-contact-card"
              className="bg-[#0c101d]/80 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-white/10 hover:border-sky-400/40 group hover:shadow-[0_0_45px_-10px_rgba(56,189,248,0.25)] flex flex-col justify-between"
            >
              <div className="absolute -top-px left-6 right-6 h-px bg-gradient-to-r from-transparent via-sky-400/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-sky-500/10 border border-sky-500/25 text-sky-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <FloatingParticleTag className="text-[11px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-sky-500/10 text-sky-300 border border-sky-500/25">
                    Base
                  </FloatingParticleTag>
                </div>
                <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
                  Location
                </span>
                <h4 className="text-base font-bold text-sky-400 mt-1">
                  Pirgachha, Rangpur
                </h4>
                <p className="text-slate-400 text-xs sm:text-sm mt-1">
                  Available for remote work
                </p>
              </div>
              <div className="pt-4 mt-5 border-t border-white/5 flex items-center gap-2 text-xs text-slate-400 font-medium">
                <Globe className="w-3.5 h-3.5 text-sky-400/80" />
                <span>Open to relocation</span>
              </div>
            </FloatingContactCard>

            {/* CARD 3: Phone */}
            <FloatingContactCard
              floatIndex={3}
              glowColor="rgba(16,185,129,0.25)"
              dataPurpose="phone-contact-card"
              className="bg-[#0c101d]/80 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-white/10 hover:border-emerald-500/40 group hover:shadow-[0_0_40px_-10px_rgba(16,185,129,0.25)] flex flex-col justify-between"
            >
              <div className="absolute -top-px left-6 right-6 h-px bg-gradient-to-r from-transparent via-emerald-500/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Phone className="w-5 h-5" />
                  </div>
                  <FloatingParticleTag className="text-[11px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/25">
                    Instant
                  </FloatingParticleTag>
                </div>
                <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
                  Phone
                </span>
                <h4 className="text-base font-bold text-emerald-400 hover:text-emerald-300 transition-colors mt-1">
                  <a className="hover:underline" href="tel:+8801713531778">
                    +880 1713–531778
                  </a>
                </h4>
                <p className="text-slate-400 text-xs sm:text-sm mt-1">
                  Call or WhatsApp me
                </p>
              </div>
              <div className="pt-4 mt-5 border-t border-white/5 flex items-center gap-2 text-xs text-slate-400 font-medium">
                <Clock className="w-3.5 h-3.5 text-emerald-400/80" />
                <span>Sat-Thu, 9AM-12AM (GMT+6)</span>
              </div>
            </FloatingContactCard>

            {/* CARD 4: Schedule Call */}
            <FloatingContactCard
              floatIndex={4}
              glowColor="rgba(168,85,247,0.25)"
              dataPurpose="schedule-call-card"
              className="bg-[#0c101d]/80 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-white/10 hover:border-purple-500/40 group hover:shadow-[0_0_50px_-10px_rgba(168,85,247,0.25)] flex flex-col justify-between"
            >
              <div className="absolute -top-px left-6 right-6 h-px bg-gradient-to-r from-transparent via-purple-500/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-purple-500/10 border border-purple-500/25 text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <FloatingParticleTag className="text-[11px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/25">
                    1-on-1
                  </FloatingParticleTag>
                </div>
                <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
                  Schedule Call
                </span>
                <h4 className="text-base font-bold text-purple-400 hover:text-purple-300 transition-colors mt-1">
                  <a
                    className="inline-flex items-center gap-1.5 group/link"
                    href="#schedule-meeting"
                  >
                    <span>Book a Meeting</span>
                    <ChevronRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                  </a>
                </h4>
                <p className="text-slate-400 text-xs sm:text-sm mt-1">
                  Schedule a video call
                </p>
              </div>
              <div className="pt-4 mt-5 border-t border-white/5 flex items-center gap-2 text-xs text-slate-400 font-medium">
                <Clock className="w-3.5 h-3.5 text-purple-400/80" />
                <span>Sun-Thu, 6PM-11PM (GMT+6)</span>
              </div>
            </FloatingContactCard>
          </div>
        </div>

        {/* RIGHT SECTION (5 cols): Elegant Social Hub Deck */}
        <FloatingContactCard
          floatIndex={5}
          glowColor="rgba(56,189,248,0.22)"
          dataPurpose="social-connect-container"
          className="lg:col-span-5 bg-[#0c101d]/85 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/10 flex flex-col justify-between h-full shadow-xl"
        >
          {/* Ambient subtle glow behind socials */}
          <div className="absolute -top-20 -right-20 w-48 h-48 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col h-full justify-between">
            {/* Section Header */}
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 animate-pulse text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-wide">
                      Connect With Me
                    </h3>
                    <p className="text-xs text-slate-400">
                      Join my network across platforms
                    </p>
                  </div>
                </div>
                <FloatingParticleTag className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-800/80 text-cyan-300 border border-cyan-500/20 font-mono">
                  4 Channels
                </FloatingParticleTag>
              </div>

              {/* Social Links Full-Height Grid */}
              <div className="grid grid-cols-1 gap-4 flex-grow">
                {/* GitHub Link */}
                <motion.a
                  whileHover={{ scale: 1.02, x: 3 }}
                  className="flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-[#0a0f1d]/90 hover:bg-slate-800/80 border border-white/5 hover:border-slate-600/80 transition-all duration-300 group shadow-sm hover:shadow-md h-full min-h-[72px]"
                  href="https://github.com/kawsar9867"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-slate-800/80 border border-white/10 flex items-center justify-center text-slate-200 group-hover:text-cyan-300 group-hover:scale-105 transition-all">
                      <FaGithub className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                        GitHub
                        <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-cyan-400" />
                      </div>
                      <div className="text-xs text-slate-400">@kawsar9867</div>
                    </div>
                  </div>
                  <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-slate-800/90 text-slate-300 border border-white/5 group-hover:border-cyan-500/30 group-hover:text-cyan-200 transition-colors">
                    35+ repos
                  </span>
                </motion.a>

                {/* LinkedIn Link */}
                <motion.a
                  whileHover={{ scale: 1.02, x: 3 }}
                  className="flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-[#0a0f1d]/90 hover:bg-slate-800/80 border border-white/5 hover:border-sky-500/40 transition-all duration-300 group shadow-sm hover:shadow-md h-full min-h-[72px]"
                  href="https://www.linkedin.com/in/kawsarahamed01"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-sky-950/60 border border-sky-500/20 text-sky-400 flex items-center justify-center group-hover:scale-105 transition-all">
                      <FaLinkedin className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-base font-bold text-white group-hover:text-sky-300 transition-colors flex items-center gap-1.5">
                        LinkedIn
                        <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-sky-400" />
                      </div>
                      <div className="text-xs text-slate-400">@kawsarahamed01</div>
                    </div>
                  </div>
                  <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-slate-800/90 text-slate-300 border border-white/5 group-hover:border-sky-500/30 group-hover:text-sky-200 transition-colors">
                    50+ connections
                  </span>
                </motion.a>

                {/* Facebook Link */}
                <motion.a
                  whileHover={{ scale: 1.02, x: 3 }}
                  className="flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-[#0a0f1d]/90 hover:bg-slate-800/80 border border-white/5 hover:border-blue-500/40 transition-all duration-300 group shadow-sm hover:shadow-md h-full min-h-[72px]"
                  href="https://www.facebook.com/kawsar.bosuniya.77"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-blue-950/60 border border-blue-500/20 text-blue-400 flex items-center justify-center group-hover:scale-105 transition-all">
                      <FaFacebook className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-base font-bold text-white group-hover:text-blue-300 transition-colors flex items-center gap-1.5">
                        Facebook
                        <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-blue-400" />
                      </div>
                      <div className="text-xs text-slate-400">@kawsar.bosuniya.77</div>
                    </div>
                  </div>
                  <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-slate-800/90 text-slate-300 border border-white/5 group-hover:border-blue-500/30 group-hover:text-blue-200 transition-colors">
                    4K+ followers
                  </span>
                </motion.a>

                {/* Discord Link */}
                <motion.a
                  whileHover={{ scale: 1.02, x: 3 }}
                  className="flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-[#0a0f1d]/90 hover:bg-slate-800/80 border border-white/5 hover:border-indigo-500/40 transition-all duration-300 group shadow-sm hover:shadow-md h-full min-h-[72px]"
                  href="https://discord.com/users/kawsar00001"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-indigo-950/60 border border-indigo-500/20 text-indigo-400 flex items-center justify-center group-hover:scale-105 transition-all">
                      <FaDiscord className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors flex items-center gap-1.5">
                        Discord
                        <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-indigo-400" />
                      </div>
                      <div className="text-xs text-slate-400">@kawsar00001</div>
                    </div>
                  </div>
                  <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Active daily
                  </span>
                </motion.a>
              </div>
            </div>

            {/* Status ticker inside Social Card */}
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span>Available for new opportunities</span>
              </div>
              <span className="font-mono text-slate-500 text-[11px]">UTC+6</span>
            </div>
          </div>
        </FloatingContactCard>
      </motion.div>
    </section>
  );
}

