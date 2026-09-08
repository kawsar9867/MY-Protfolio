"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useInView,
  animate,
} from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Animated counter component for technology counts
function TechCount({ target }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, target, {
        duration: 1.4,
        ease: [0.16, 1, 0.3, 1],
        onUpdate(latest) {
          setCount(Math.floor(latest));
        },
      });
      return () => controls.stop();
    }
  }, [isInView, target]);

  return <span ref={ref}>{count} technologies</span>;
}

// Reusable TechCard wrapper for magnetic tilt, spotlight, and depth
function TechCard({
  children,
  colSpan,
  borderColor,
  hoverBorderColor,
  shadowClass,
  hoverShadowClass,
  spotlightColor,
  cardRef,
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 220 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [1.5, -1.5]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-1.5, 1.5]), springConfig);
  const moveX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-4, 4]), springConfig);
  const moveY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-4, 4]), springConfig);
  const spotX = useSpring(useTransform(mouseX, [-0.5, 0.5], [0, 100]), springConfig);
  const spotY = useSpring(useTransform(mouseY, [-0.5, 0.5], [0, 100]), springConfig);

  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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

  return (
    <motion.article
      ref={cardRef}
      variants={{
        hidden: { opacity: 0, y: 40, scale: 0.96 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        },
      }}
      whileHover={
        !isMobile
          ? {
              scale: 1.015,
              y: -4,
              transition: { duration: 0.3, ease: "easeOut" },
            }
          : {}
      }
      style={
        !isMobile
          ? {
              rotateX,
              rotateY,
              x: moveX,
              y: moveY,
              transformStyle: "preserve-3d",
            }
          : {}
      }
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`tech-card ${colSpan} rounded-2xl bg-[#0c1017]/80 backdrop-blur-xl border ${borderColor} p-6 md:p-7 flex flex-col justify-between relative group ${hoverBorderColor} ${shadowClass} ${hoverShadowClass} transition-all duration-300 overflow-hidden`}
    >
      {/* Spotlight glow inside card */}
      {!isMobile && (
        <motion.div
          className="absolute inset-0 pointer-events-none z-0 transition-opacity duration-500"
          style={{
            opacity: isHovered ? 0.35 : 0,
            background: `radial-gradient(350px circle at ${spotX.get()}% ${spotY.get()}%, ${spotlightColor}, transparent 70%)`,
          }}
        />
      )}
      <div className="relative z-10 flex flex-col justify-between h-full">
        {children}
      </div>
    </motion.article>
  );
}

export default function Skills() {
  const sectionRef = useRef(null);
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);
  const card4Ref = useRef(null);
  const card5Ref = useRef(null);

  // GSAP ScrollTrigger Parallax
  useEffect(() => {
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (window.innerWidth >= 768 && !isReduced) {
      gsap.registerPlugin(ScrollTrigger);
      const ctx = gsap.context(() => {
        if (sectionRef.current) {
          if (card1Ref.current) {
            gsap.to(card1Ref.current, {
              y: -8,
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
              },
            });
          }
          if (card2Ref.current) {
            gsap.to(card2Ref.current, {
              y: -5,
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
              },
            });
          }
          if (card3Ref.current) {
            gsap.to(card3Ref.current, {
              y: 5,
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
              },
            });
          }
          if (card4Ref.current) {
            gsap.to(card4Ref.current, {
              y: 8,
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
              },
            });
          }
          if (card5Ref.current) {
            gsap.to(card5Ref.current, {
              y: -10,
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
              },
            });
          }
        }
      }, sectionRef);

      return () => ctx.revert();
    }
  }, []);

  const badgeEntranceVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 10 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", stiffness: 350, damping: 20 },
    },
  };

  const badgeHoverProps = {
    whileHover: {
      scale: 1.05,
      y: -3,
      filter: "brightness(1.15)",
      transition: { type: "spring", stiffness: 400, damping: 17 },
    },
    whileTap: { scale: 0.95 },
  };

  return (
    <section
      ref={sectionRef}
      className="relative z-10 py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full overflow-hidden"
      id="skills"
      data-purpose="tech-stack-section"
    >
      {/* Horizontal System-Boot Scanning Line */}
      <motion.div
        initial={{ x: "-100%", opacity: 0 }}
        whileInView={{ x: "100%", opacity: [0, 0.8, 0] }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.8, ease: "easeInOut" }}
        className="absolute top-1/4 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent pointer-events-none z-20"
      />

      {/* Section Header Block */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center max-w-3xl mx-auto mb-14 md:mb-20"
      >
        {/* Badge Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-slate-700/80 bg-slate-900/80 backdrop-blur-md shadow-sm mb-4">
          <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-xs font-semibold tracking-wide uppercase text-slate-300">
            ⚡ Tech Stack &amp; Arsenal
          </span>
        </div>

        {/* Primary Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
          Technologies &amp;{" "}
          <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Skills
          </span>
        </h2>

        {/* Subtitle Description */}
        <p className="text-slate-400 text-base sm:text-lg leading-relaxed font-normal">
          The curated tools, libraries, and frameworks I leverage to design,
          build, and deploy performant, scalable digital experiences.
        </p>
      </motion.div>

      {/* Bento Grid Container */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.12, delayChildren: 0.05 },
          },
        }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6"
      >
        {/* CARD 1: Frontend Development */}
        <TechCard
          cardRef={card1Ref}
          colSpan="lg:col-span-3"
          borderColor="border-blue-500/30"
          hoverBorderColor="hover:border-blue-500/60"
          shadowClass="shadow-[0_0_25px_-12px_rgba(56,189,248,0.15)]"
          hoverShadowClass="hover:shadow-[0_0_35px_-8px_rgba(56,189,248,0.25)]"
          spotlightColor="rgba(56,189,248,0.18)"
        >
          <div className="absolute top-0 inset-x-8 h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent pointer-events-none" />
          <div>
            {/* Card Header */}
            <div className="flex items-center gap-4 mb-6">
              <motion.div
                variants={{
                  hidden: { scale: 0.85, rotate: -5 },
                  visible: {
                    scale: 1,
                    rotate: 0,
                    transition: { type: "spring", stiffness: 300, damping: 18 },
                  },
                }}
                whileHover={{
                  scale: 1.08,
                  rotate: 4,
                  boxShadow: "0 0 15px rgba(56,189,248,0.3)",
                  transition: { type: "spring", stiffness: 400, damping: 17 },
                }}
                className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shadow-inner transition-transform duration-300"
              >
                <svg
                  className="w-6 h-6 stroke-current"
                  fill="none"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.div>
              <div>
                <h3 className="text-lg md:text-xl font-bold text-white tracking-tight">
                  Frontend Development
                </h3>
                <p className="text-xs md:text-sm text-slate-400 mt-0.5">
                  Building responsive, interactive user interfaces
                </p>
              </div>
            </div>

            {/* Tech Badges */}
            <motion.div
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.04 } },
              }}
              className="flex flex-wrap gap-2.5 mb-8"
            >
              {/* React.js */}
              <motion.span
                variants={badgeEntranceVariants}
                {...badgeHoverProps}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs font-medium text-slate-200 hover:border-blue-400/50 hover:bg-slate-800 transition-colors cursor-default"
              >
                <svg className="w-3.5 h-3.5 text-[#61DAFB]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 9a3 3 0 100 6 3 3 0 000-6zm0-7C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" opacity="0.3" />
                  <ellipse cx="12" cy="12" fill="none" rx="11" ry="4.2" stroke="currentColor" strokeWidth="1.2" transform="rotate(30 12 12)" />
                  <ellipse cx="12" cy="12" fill="none" rx="11" ry="4.2" stroke="currentColor" strokeWidth="1.2" transform="rotate(90 12 12)" />
                  <ellipse cx="12" cy="12" fill="none" rx="11" ry="4.2" stroke="currentColor" strokeWidth="1.2" transform="rotate(150 12 12)" />
                </svg>
                React.js
              </motion.span>

              {/* Next.js */}
              <motion.span
                variants={badgeEntranceVariants}
                {...badgeHoverProps}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs font-medium text-slate-200 hover:border-blue-400/50 hover:bg-slate-800 transition-colors cursor-default"
              >
                <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.665 21.978l-10.929-14.34h-2.736v12.724h2.15v-9.605l9.314 12.24c.73-.28 1.43-.62 2.201-1.019zm3.335-9.978c0-5.523-4.477-10-10-10s-10 4.477-10 10 4.477 10 10 10c2.42 0 4.65-.86 6.39-2.3l-2.28-2.99c-1.18.82-2.59 1.29-4.11 1.29-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7c0 .92-.18 1.8-.5 2.61l1.78 2.34c.46-1.52.72-3.2.72-4.95z" />
                </svg>
                Next.js
              </motion.span>

              {/* JavaScript */}
              <motion.span
                variants={badgeEntranceVariants}
                {...badgeHoverProps}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs font-medium text-slate-200 hover:border-blue-400/50 hover:bg-slate-800 transition-colors cursor-default"
              >
                <span className="text-[#F7DF1E] font-bold text-[10px] bg-black/50 px-1 rounded">JS</span>
                JavaScript
              </motion.span>

              {/* TailwindCSS */}
              <motion.span
                variants={badgeEntranceVariants}
                {...badgeHoverProps}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs font-medium text-slate-200 hover:border-blue-400/50 hover:bg-slate-800 transition-colors cursor-default"
              >
                <svg className="w-3.5 h-3.5 text-[#38BDF8]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 6c-2.4 0-3.9 1.2-4.5 3.6 1-.8 2.1-1.1 3.3-.9 1.2.2 2.1 1.1 2.5 2.3.6 1.8.3 3.6-1.3 4.8 1-.8 2.1-1.1 3.3-.9 1.2.2 2.1 1.1 2.5 2.3.8 2.2-.2 4.2-2.2 4.8 2.8 0 4.6-1.4 5.3-4.2.8-3.2-.8-5.3-3.6-5.8-.8-.2-1.5-.6-1.8-1.4-.4-1.2.1-2.6 1.5-3.3-1-.8-2.2-1-3.5-.8-1.2.2-2.1 1.1-2.5 2.3C14.4 7.6 13.5 6 12 6zM6 12c-2.4 0-3.9 1.2-4.5 3.6 1-.8 2.1-1.1 3.3-.9 1.2.2 2.1 1.1 2.5 2.3.6 1.8.3 3.6-1.3 4.8 1-.8 2.1-1.1 3.3-.9 1.2.2 2.1 1.1 2.5 2.3.8 2.2-.2 4.2-2.2 4.8 2.8 0 4.6-1.4 5.3-4.2.8-3.2-.8-5.3-3.6-5.8-.8-.2-1.5-.6-1.8-1.4-.4-1.2.1-2.6 1.5-3.3-1-.8-2.2-1-3.5-.8-1.2.2-2.1 1.1-2.5 2.3C8.4 13.6 7.5 12 6 12z" />
                </svg>
                TailwindCSS
              </motion.span>

              {/* HTML5 / CSS3 */}
              <motion.span
                variants={badgeEntranceVariants}
                {...badgeHoverProps}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs font-medium text-slate-200 hover:border-blue-400/50 hover:bg-slate-800 transition-colors cursor-default"
              >
                <svg className="w-3.5 h-3.5 text-orange-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L3 5v14l9 3 9-3V5l-9-3zm6.6 5.8l-.8 8.8L12 18.2l-5.8-1.6-.4-4.8h2.3l.2 2.6 3.7 1 3.7-1 .3-3.5H6.8L6.4 8h12.2z" />
                </svg>
                HTML5/CSS3
              </motion.span>

              {/* Framer Motion */}
              <motion.span
                variants={badgeEntranceVariants}
                {...badgeHoverProps}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs font-medium text-slate-200 hover:border-blue-400/50 hover:bg-slate-800 transition-colors cursor-default"
              >
                <svg className="w-3.5 h-3.5 text-pink-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" />
                </svg>
                Framer Motion
              </motion.span>

              {/* Bootstrap */}
              <motion.span
                variants={badgeEntranceVariants}
                {...badgeHoverProps}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs font-medium text-slate-200 hover:border-blue-400/50 hover:bg-slate-800 transition-colors cursor-default"
              >
                <span className="font-black text-purple-400 text-xs">B</span>
                Bootstrap
              </motion.span>
            </motion.div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800/80 mt-auto">
            <span className="text-xs text-slate-400 font-medium">
              <TechCount target={7} />
            </span>
            <motion.div
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.05, delayChildren: 0.2 } },
              }}
              className="flex items-center -space-x-1.5 group-hover:-space-x-1 transition-all duration-300"
            >
              <motion.span
                variants={{
                  hidden: { opacity: 0, x: 10, scale: 0.8 },
                  visible: { opacity: 1, x: 0, scale: 1 },
                }}
                className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px] text-slate-300"
              >
                ⚛
              </motion.span>
              <motion.span
                variants={{
                  hidden: { opacity: 0, x: 10, scale: 0.8 },
                  visible: { opacity: 1, x: 0, scale: 1 },
                }}
                className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px] text-slate-300"
              >
                ▲
              </motion.span>
              <motion.span
                variants={{
                  hidden: { opacity: 0, x: 10, scale: 0.8 },
                  visible: { opacity: 1, x: 0, scale: 1 },
                }}
                className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[9px] font-bold text-yellow-400"
              >
                JS
              </motion.span>
              <motion.span
                variants={{
                  hidden: { opacity: 0, x: 10, scale: 0.8 },
                  visible: { opacity: 1, x: 0, scale: 1 },
                }}
                className="w-6 h-6 rounded-full bg-blue-900/60 border border-blue-600/50 flex items-center justify-center text-[9px] font-bold text-blue-300 group-hover:scale-110 transition-transform duration-300"
              >
                +4
              </motion.span>
            </motion.div>
          </div>
        </TechCard>

        {/* CARD 2: Backend Development */}
        <TechCard
          cardRef={card2Ref}
          colSpan="lg:col-span-3"
          borderColor="border-emerald-500/30"
          hoverBorderColor="hover:border-emerald-500/60"
          shadowClass="shadow-[0_0_25px_-12px_rgba(16,185,129,0.15)]"
          hoverShadowClass="hover:shadow-[0_0_35px_-8px_rgba(16,185,129,0.25)]"
          spotlightColor="rgba(16,185,129,0.18)"
        >
          <div className="absolute top-0 inset-x-8 h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent pointer-events-none" />
          <div>
            {/* Card Header */}
            <div className="flex items-center gap-4 mb-6">
              <motion.div
                variants={{
                  hidden: { scale: 0.85, rotate: -5 },
                  visible: {
                    scale: 1,
                    rotate: 0,
                    transition: { type: "spring", stiffness: 300, damping: 18 },
                  },
                }}
                whileHover={{
                  scale: 1.08,
                  rotate: 4,
                  boxShadow: "0 0 15px rgba(16,185,129,0.3)",
                  transition: { type: "spring", stiffness: 400, damping: 17 },
                }}
                className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-inner transition-transform duration-300"
              >
                <svg className="w-6 h-6 stroke-current" fill="none" strokeWidth="2" viewBox="0 0 24 24">
                  <rect height="8" rx="2" strokeLinecap="round" strokeLinejoin="round" width="20" x="2" y="2" />
                  <rect height="8" rx="2" strokeLinecap="round" strokeLinejoin="round" width="20" x="2" y="14" />
                  <line strokeLinecap="round" strokeWidth="2.5" x1="6" x2="6.01" y1="6" y2="6" />
                  <line strokeLinecap="round" strokeWidth="2.5" x1="6" x2="6.01" y1="18" y2="18" />
                </svg>
              </motion.div>
              <div>
                <h3 className="text-lg md:text-xl font-bold text-white tracking-tight">
                  Backend Development
                </h3>
                <p className="text-xs md:text-sm text-slate-400 mt-0.5">
                  Creating robust server-side applications
                </p>
              </div>
            </div>

            {/* Tech Badges */}
            <motion.div
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.04 } },
              }}
              className="flex flex-wrap gap-2.5 mb-8"
            >
              {/* Node.js */}
              <motion.span
                variants={badgeEntranceVariants}
                {...badgeHoverProps}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs font-medium text-slate-200 hover:border-emerald-400/50 hover:bg-slate-800 transition-colors cursor-default"
              >
                <svg className="w-3.5 h-3.5 text-[#539E43]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l10 5.75v11.5L12 25l-10-5.75V7.75L12 2z" />
                </svg>
                Node.js
              </motion.span>

              {/* Express.js */}
              <motion.span
                variants={badgeEntranceVariants}
                {...badgeHoverProps}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs font-medium text-slate-200 hover:border-emerald-400/50 hover:bg-slate-800 transition-colors cursor-default"
              >
                <span className="font-mono text-xs text-slate-300">ex</span>
                Express.js
              </motion.span>

              {/* REST APIs */}
              <motion.span
                variants={badgeEntranceVariants}
                {...badgeHoverProps}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs font-medium text-slate-200 hover:border-emerald-400/50 hover:bg-slate-800 transition-colors cursor-default"
              >
                <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                REST APIs
              </motion.span>

              {/* SQL */}
              <motion.span
                variants={badgeEntranceVariants}
                {...badgeHoverProps}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs font-medium text-slate-200 hover:border-emerald-400/50 hover:bg-slate-800 transition-colors cursor-default"
              >
                <svg className="w-3.5 h-3.5 text-sky-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 3c-4.97 0-9 1.79-9 4s4.03 4 9 4 9-1.79 9-4-4.03-4-9-4zm0 6c-3.87 0-7-1.12-7-2.5S8.13 4 12 4s7 1.12 7 2.5S15.87 9 12 9z" />
                  <path d="M3 9v4c0 2.21 4.03 4 9 4s9-1.79 9-4V9c-1.8 1.48-5.18 2.2-9 2.2S4.8 10.48 3 9z" />
                  <path d="M3 15v4c0 2.21 4.03 4 9 4s9-1.79 9-4v-4c-1.8 1.48-5.18 2.2-9 2.2s-7.2-.72-9-2.2z" />
                </svg>
                SQL
              </motion.span>

              {/* Better Auth */}
              <motion.span
                variants={badgeEntranceVariants}
                {...badgeHoverProps}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs font-medium text-slate-200 hover:border-emerald-400/50 hover:bg-slate-800 transition-colors cursor-default"
              >
                <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Better Auth
              </motion.span>
            </motion.div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800/80 mt-auto">
            <span className="text-xs text-slate-400 font-medium">
              <TechCount target={5} />
            </span>
            <motion.div
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.05, delayChildren: 0.2 } },
              }}
              className="flex items-center -space-x-1.5 group-hover:-space-x-1 transition-all duration-300"
            >
              <motion.span
                variants={{
                  hidden: { opacity: 0, x: 10, scale: 0.8 },
                  visible: { opacity: 1, x: 0, scale: 1 },
                }}
                className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[9px] font-semibold text-emerald-400"
              >
                N
              </motion.span>
              <motion.span
                variants={{
                  hidden: { opacity: 0, x: 10, scale: 0.8 },
                  visible: { opacity: 1, x: 0, scale: 1 },
                }}
                className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[8px] text-slate-300"
              >
                EX
              </motion.span>
              <motion.span
                variants={{
                  hidden: { opacity: 0, x: 10, scale: 0.8 },
                  visible: { opacity: 1, x: 0, scale: 1 },
                }}
                className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[9px] text-slate-300"
              >
                API
              </motion.span>
              <motion.span
                variants={{
                  hidden: { opacity: 0, x: 10, scale: 0.8 },
                  visible: { opacity: 1, x: 0, scale: 1 },
                }}
                className="w-6 h-6 rounded-full bg-emerald-900/60 border border-emerald-600/50 flex items-center justify-center text-[9px] font-bold text-emerald-300 group-hover:scale-110 transition-transform duration-300"
              >
                +2
              </motion.span>
            </motion.div>
          </div>
        </TechCard>

        {/* CARD 3: Database & Storage */}
        <TechCard
          cardRef={card3Ref}
          colSpan="lg:col-span-3"
          borderColor="border-purple-500/30"
          hoverBorderColor="hover:border-purple-500/60"
          shadowClass="shadow-[0_0_25px_-12px_rgba(168,85,247,0.15)]"
          hoverShadowClass="hover:shadow-[0_0_35px_-8px_rgba(168,85,247,0.25)]"
          spotlightColor="rgba(168,85,247,0.18)"
        >
          <div className="absolute top-0 inset-x-8 h-px bg-gradient-to-r from-transparent via-purple-400/40 to-transparent pointer-events-none" />
          <div>
            {/* Card Header */}
            <div className="flex items-center gap-4 mb-6">
              <motion.div
                variants={{
                  hidden: { scale: 0.85, rotate: -5 },
                  visible: {
                    scale: 1,
                    rotate: 0,
                    transition: { type: "spring", stiffness: 300, damping: 18 },
                  },
                }}
                whileHover={{
                  scale: 1.08,
                  rotate: 4,
                  boxShadow: "0 0 15px rgba(168,85,247,0.3)",
                  transition: { type: "spring", stiffness: 400, damping: 17 },
                }}
                className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shadow-inner transition-transform duration-300"
              >
                <svg className="w-6 h-6 stroke-current" fill="none" strokeWidth="2" viewBox="0 0 24 24">
                  <ellipse cx="12" cy="5" rx="9" ry="3" />
                  <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                  <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                </svg>
              </motion.div>
              <div>
                <h3 className="text-lg md:text-xl font-bold text-white tracking-tight">
                  Database &amp; Storage
                </h3>
                <p className="text-xs md:text-sm text-slate-400 mt-0.5">
                  Managing and optimizing data solutions
                </p>
              </div>
            </div>

            {/* Tech Badges */}
            <motion.div
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.04 } },
              }}
              className="flex flex-wrap gap-2.5 mb-8"
            >
              {/* MongoDB */}
              <motion.span
                variants={badgeEntranceVariants}
                {...badgeHoverProps}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs font-medium text-slate-200 hover:border-purple-400/50 hover:bg-slate-800 transition-colors cursor-default"
              >
                <svg className="w-3.5 h-3.5 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.5C12 2.5 7 8 7 13.5c0 3.2 2.2 5.9 5 6.5v-20zm0 0c0 0 5 5.5 5 11 0 3.2-2.2 5.9-5 6.5v-20z" />
                </svg>
                MongoDB
              </motion.span>

              {/* MySQL */}
              <motion.span
                variants={badgeEntranceVariants}
                {...badgeHoverProps}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs font-medium text-slate-200 hover:border-purple-400/50 hover:bg-slate-800 transition-colors cursor-default"
              >
                <svg className="w-3.5 h-3.5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 3a9 9 0 0 0-9 9c0 4.97 4.03 9 9 9s9-4.03 9-9a9 9 0 0 0-9-9zm4.5 13.5c-1.5 1-3.2 1-4.7.2l-.8 1.3c2.1 1.2 4.6 1.1 6.6-.2l-1.1-1.3z" />
                </svg>
                MySQL
              </motion.span>

              {/* PostgreSQL */}
              <motion.span
                variants={badgeEntranceVariants}
                {...badgeHoverProps}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs font-medium text-slate-200 hover:border-purple-400/50 hover:bg-slate-800 transition-colors cursor-default"
              >
                <svg className="w-3.5 h-3.5 text-[#336791]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 16.9v-2.1c2.1-.2 3.7-1.6 3.9-3.7h2.1c-.2 3.2-2.7 5.6-6 5.8z" />
                </svg>
                PostgreSQL
              </motion.span>

              {/* Redis */}
              <motion.span
                variants={badgeEntranceVariants}
                {...badgeHoverProps}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs font-medium text-slate-200 hover:border-purple-400/50 hover:bg-slate-800 transition-colors cursor-default"
              >
                <svg className="w-3.5 h-3.5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm-1 15.5l-6-3v-6l6 3v6zm2 0v-6l6-3v6l-6 3z" />
                </svg>
                Redis
              </motion.span>
            </motion.div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800/80 mt-auto">
            <span className="text-xs text-slate-400 font-medium">
              <TechCount target={4} />
            </span>
            <motion.div
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.05, delayChildren: 0.2 } },
              }}
              className="flex items-center -space-x-1.5 group-hover:-space-x-1 transition-all duration-300"
            >
              <motion.span
                variants={{
                  hidden: { opacity: 0, x: 10, scale: 0.8 },
                  visible: { opacity: 1, x: 0, scale: 1 },
                }}
                className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[9px] text-green-400"
              >
                🍃
              </motion.span>
              <motion.span
                variants={{
                  hidden: { opacity: 0, x: 10, scale: 0.8 },
                  visible: { opacity: 1, x: 0, scale: 1 },
                }}
                className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[9px] text-blue-400"
              >
                🐬
              </motion.span>
              <motion.span
                variants={{
                  hidden: { opacity: 0, x: 10, scale: 0.8 },
                  visible: { opacity: 1, x: 0, scale: 1 },
                }}
                className="w-6 h-6 rounded-full bg-purple-900/60 border border-purple-600/50 flex items-center justify-center text-[9px] font-bold text-purple-300 group-hover:scale-110 transition-transform duration-300"
              >
                +2
              </motion.span>
            </motion.div>
          </div>
        </TechCard>

        {/* CARD 4: Programming Languages */}
        <TechCard
          cardRef={card4Ref}
          colSpan="lg:col-span-3"
          borderColor="border-indigo-500/30"
          hoverBorderColor="hover:border-indigo-500/60"
          shadowClass="shadow-[0_0_25px_-12px_rgba(99,102,241,0.15)]"
          hoverShadowClass="hover:shadow-[0_0_35px_-8px_rgba(99,102,241,0.25)]"
          spotlightColor="rgba(99,102,241,0.18)"
        >
          <div className="absolute top-0 inset-x-8 h-px bg-gradient-to-r from-transparent via-indigo-400/40 to-transparent pointer-events-none" />
          <div>
            {/* Card Header */}
            <div className="flex items-center gap-4 mb-6">
              <motion.div
                variants={{
                  hidden: { scale: 0.85, rotate: -5 },
                  visible: {
                    scale: 1,
                    rotate: 0,
                    transition: { type: "spring", stiffness: 300, damping: 18 },
                  },
                }}
                whileHover={{
                  scale: 1.08,
                  rotate: 4,
                  boxShadow: "0 0 15px rgba(99,102,241,0.3)",
                  transition: { type: "spring", stiffness: 400, damping: 17 },
                }}
                className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shadow-inner transition-transform duration-300"
              >
                <svg className="w-6 h-6 stroke-current" fill="none" strokeWidth="2" viewBox="0 0 24 24">
                  <polyline points="4 17 10 11 4 5" />
                  <line x1="12" x2="20" y1="19" y2="19" />
                </svg>
              </motion.div>
              <div>
                <h3 className="text-lg md:text-xl font-bold text-white tracking-tight">
                  Programming Languages
                </h3>
                <p className="text-xs md:text-sm text-slate-400 mt-0.5">
                  Writing efficient and maintainable code
                </p>
              </div>
            </div>

            {/* Tech Badges */}
            <motion.div
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.04 } },
              }}
              className="flex flex-wrap gap-2.5 mb-8"
            >
              {/* JavaScript */}
              <motion.span
                variants={badgeEntranceVariants}
                {...badgeHoverProps}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs font-medium text-slate-200 hover:border-indigo-400/50 hover:bg-slate-800 transition-colors cursor-default"
              >
                <span className="text-[#F7DF1E] font-bold text-[10px] bg-black/50 px-1 rounded">JS</span>
                JavaScript
              </motion.span>

              {/* TypeScript */}
              <motion.span
                variants={badgeEntranceVariants}
                {...badgeHoverProps}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs font-medium text-slate-200 hover:border-indigo-400/50 hover:bg-slate-800 transition-colors cursor-default"
              >
                <span className="text-[#3178C6] font-bold text-[10px] bg-white px-1 rounded">TS</span>
                TypeScript
              </motion.span>

              {/* Python */}
              <motion.span
                variants={badgeEntranceVariants}
                {...badgeHoverProps}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs font-medium text-slate-200 hover:border-indigo-400/50 hover:bg-slate-800 transition-colors cursor-default"
              >
                <svg className="w-3.5 h-3.5 text-yellow-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2c-3.3 0-5 1.5-5 3.5v2h5v1H5c-2 0-3.5 1.5-3.5 3.5s1.5 3.5 3.5 3.5h1.5v-2c0-1.7 1.3-3 3-3h5v-1h-5V5c0-.8.7-1.5 1.5-1.5h4c.8 0 1.5.7 1.5 1.5v2.5h2V5c0-2-1.7-3-4.5-3H12zm2 4a.8.8 0 100 1.6.8.8 0 000-1.6z" />
                </svg>
                Python
              </motion.span>

              {/* Java */}
              <motion.span
                variants={badgeEntranceVariants}
                {...badgeHoverProps}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs font-medium text-slate-200 hover:border-indigo-400/50 hover:bg-slate-800 transition-colors cursor-default"
              >
                <svg className="w-3.5 h-3.5 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.5 6 6 8.5 6 11.5c0 3.3 2.7 6 6 6s6-2.7 6-6C18 8.5 15.5 6 12 2zm0 15c-1.9 0-3.5-1.6-3.5-3.5 0-1.5 1.1-2.9 2.5-3.8.4-.2.8.2.7.6-.4 1.4.3 2.9 1.7 3.3.4.1.6.5.4.9-.4 1.5-1 2.5-1.8 2.5z" />
                </svg>
                Java
              </motion.span>
            </motion.div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800/80 mt-auto">
            <span className="text-xs text-slate-400 font-medium">
              <TechCount target={4} />
            </span>
            <motion.div
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.05, delayChildren: 0.2 } },
              }}
              className="flex items-center -space-x-1.5 group-hover:-space-x-1 transition-all duration-300"
            >
              <motion.span
                variants={{
                  hidden: { opacity: 0, x: 10, scale: 0.8 },
                  visible: { opacity: 1, x: 0, scale: 1 },
                }}
                className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[9px] font-bold text-yellow-400"
              >
                JS
              </motion.span>
              <motion.span
                variants={{
                  hidden: { opacity: 0, x: 10, scale: 0.8 },
                  visible: { opacity: 1, x: 0, scale: 1 },
                }}
                className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[9px] font-bold text-blue-400"
              >
                TS
              </motion.span>
              <motion.span
                variants={{
                  hidden: { opacity: 0, x: 10, scale: 0.8 },
                  visible: { opacity: 1, x: 0, scale: 1 },
                }}
                className="w-6 h-6 rounded-full bg-indigo-900/60 border border-indigo-600/50 flex items-center justify-center text-[9px] font-bold text-indigo-300 group-hover:scale-110 transition-transform duration-300"
              >
                +2
              </motion.span>
            </motion.div>
          </div>
        </TechCard>

        {/* CARD 5: Tools & Technologies (Wide Showcase) */}
        <TechCard
          cardRef={card5Ref}
          colSpan="lg:col-span-6"
          borderColor="border-orange-500/30"
          hoverBorderColor="hover:border-orange-500/60"
          shadowClass="shadow-[0_0_25px_-12px_rgba(249,115,22,0.15)]"
          hoverShadowClass="hover:shadow-[0_0_35px_-8px_rgba(249,115,22,0.25)]"
          spotlightColor="rgba(249,115,22,0.18)"
        >
          <div className="absolute top-0 inset-x-12 h-px bg-gradient-to-r from-transparent via-orange-400/40 to-transparent pointer-events-none" />
          <div>
            {/* Card Header */}
            <div className="flex items-center gap-4 mb-6">
              <motion.div
                variants={{
                  hidden: { scale: 0.85, rotate: -5 },
                  visible: {
                    scale: 1,
                    rotate: 0,
                    transition: { type: "spring", stiffness: 300, damping: 18 },
                  },
                }}
                whileHover={{
                  scale: 1.08,
                  rotate: 4,
                  boxShadow: "0 0 15px rgba(249,115,22,0.3)",
                  transition: { type: "spring", stiffness: 400, damping: 17 },
                }}
                className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 shadow-inner transition-transform duration-300"
              >
                <svg className="w-6 h-6 stroke-current" fill="none" strokeWidth="2" viewBox="0 0 24 24">
                  <path
                    d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.div>
              <div>
                <h3 className="text-lg md:text-xl font-bold text-white tracking-tight">
                  Tools &amp; Technologies
                </h3>
                <p className="text-xs md:text-sm text-slate-400 mt-0.5">
                  Development environment, DevOps, and collaborative workflow
                </p>
              </div>
            </div>

            {/* Tech Badges */}
            <motion.div
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.04 } },
              }}
              className="flex flex-wrap gap-2.5 mb-8"
            >
              {/* GitHub */}
              <motion.span
                variants={badgeEntranceVariants}
                {...badgeHoverProps}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs font-medium text-slate-200 hover:border-orange-400/50 hover:bg-slate-800 transition-colors cursor-default"
              >
                <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                GitHub
              </motion.span>

              {/* VS Code */}
              <motion.span
                variants={badgeEntranceVariants}
                {...badgeHoverProps}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs font-medium text-slate-200 hover:border-orange-400/50 hover:bg-slate-800 transition-colors cursor-default"
              >
                <svg className="w-3.5 h-3.5 text-sky-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.15 2.587L18.21.21a1.49 1.49 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.27a1 1 0 0 0 0 1.488l3.96 3.242-3.96 3.243a1 1 0 0 0 0 1.488l1.322 1.211a1 1 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.49 1.49 0 0 0 1.704.29l4.94-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352z" />
                </svg>
                VS Code
              </motion.span>

              {/* Figma */}
              <motion.span
                variants={badgeEntranceVariants}
                {...badgeHoverProps}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs font-medium text-slate-200 hover:border-orange-400/50 hover:bg-slate-800 transition-colors cursor-default"
              >
                <svg className="w-3.5 h-3.5 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 2a4 4 0 0 0-4 4 4 4 0 0 0 4 4h4V2H8zm8 0h-4v8h4a4 4 0 0 0 0-8zm-8 8a4 4 0 0 0-4 4 4 4 0 0 0 4 4h4v-8H8zm8 0h-4v8a4 4 0 0 0 4-4 4 4 0 0 0 0-4zm-8 8a4 4 0 0 0-4 4 4 4 0 0 0 4 4 4 4 0 0 0 4-4v-4H8z" />
                </svg>
                Figma
              </motion.span>

              {/* Docker */}
              <motion.span
                variants={badgeEntranceVariants}
                {...badgeHoverProps}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs font-medium text-slate-200 hover:border-orange-400/50 hover:bg-slate-800 transition-colors cursor-default"
              >
                <svg className="w-3.5 h-3.5 text-[#2496ED]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185zm0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.186.185.186zm-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.186.185.186zm-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.186.186.186zm5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185zm-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186H8.1a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185zm-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186H5.136a.186.186 0 00-.186.185v1.888c0 .102.084.185.186.185zm-2.928 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186H2.208a.186.186 0 00-.186.185v1.888c0 .102.084.185.186.185zM23.79 9.89c-.463-.342-1.524-.44-2.404-.265-.18-.465-.46-.89-.844-1.22l-.21-.182-.208.182c-.677.59-1.077 1.488-1.077 2.42 0 .153.01.306.035.457-.34.184-.73.284-1.127.284H.92c-.41 0-.75.33-.75.74 0 3.32 1.34 6.38 3.65 8.52 1.94 1.79 4.54 2.86 7.37 2.86 6.39 0 11.66-4.99 12.08-11.45.02-.33-.03-.68-.15-.99-.08-.22-.19-.44-.33-.64z" />
                </svg>
                Docker
              </motion.span>

              {/* Vercel */}
              <motion.span
                variants={badgeEntranceVariants}
                {...badgeHoverProps}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs font-medium text-slate-200 hover:border-orange-400/50 hover:bg-slate-800 transition-colors cursor-default"
              >
                <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 1L24 22H0L12 1z" />
                </svg>
                Vercel
              </motion.span>

              {/* Netlify */}
              <motion.span
                variants={badgeEntranceVariants}
                {...badgeHoverProps}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs font-medium text-slate-200 hover:border-orange-400/50 hover:bg-slate-800 transition-colors cursor-default"
              >
                <svg className="w-3.5 h-3.5 text-[#00C7B7]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.49 14.73l2.84 2.84-2.84 2.84-2.84-2.84 2.84-2.84zm11.02 0l2.84 2.84-2.84 2.84-2.84-2.84 2.84-2.84zm-5.51-5.51l2.84 2.84-2.84 2.84-2.84-2.84 2.84-2.84zm0-5.51l2.84 2.84-2.84 2.84-2.84-2.84 2.84-2.84z" />
                </svg>
                Netlify
              </motion.span>

              {/* Git */}
              <motion.span
                variants={badgeEntranceVariants}
                {...badgeHoverProps}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs font-medium text-slate-200 hover:border-orange-400/50 hover:bg-slate-800 transition-colors cursor-default"
              >
                <svg className="w-3.5 h-3.5 text-[#F05032]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21.6 10.9L13.1 2.4c-.5-.5-1.4-.5-1.9 0l-2 2 2.5 2.5c.6-.2 1.3 0 1.7.5.5.5.6 1.2.4 1.8l2.4 2.4c.6-.2 1.3 0 1.8.4.7.7.7 1.9 0 2.6s-1.9.7-2.6 0c-.6-.5-.7-1.3-.4-1.9L12.6 10v4.7c.2.1.4.3.5.5.7.7.7 1.9 0 2.6s-1.9.7-2.6 0c-.7-.7-.7-1.9 0-2.6.2-.2.4-.3.6-.4V9.8c-.2-.1-.4-.2-.6-.4-.6-.5-.7-1.3-.4-1.9L7.6 5 2.4 10.2c-.5.5-.5 1.4 0 1.9l8.5 8.5c.5.5 1.4.5 1.9 0l8.8-8.8c.5-.5.5-1.4 0-1.9z" />
                </svg>
                Git
              </motion.span>
            </motion.div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800/80 mt-auto">
            <span className="text-xs text-slate-400 font-medium">
              <TechCount target={7} />
            </span>
            <motion.div
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.05, delayChildren: 0.2 } },
              }}
              className="flex items-center -space-x-1.5 group-hover:-space-x-1 transition-all duration-300"
            >
              <motion.span
                variants={{
                  hidden: { opacity: 0, x: 10, scale: 0.8 },
                  visible: { opacity: 1, x: 0, scale: 1 },
                }}
                className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[9px] text-white"
              >
                🐙
              </motion.span>
              <motion.span
                variants={{
                  hidden: { opacity: 0, x: 10, scale: 0.8 },
                  visible: { opacity: 1, x: 0, scale: 1 },
                }}
                className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[9px] text-blue-400"
              >
                ⚡
              </motion.span>
              <motion.span
                variants={{
                  hidden: { opacity: 0, x: 10, scale: 0.8 },
                  visible: { opacity: 1, x: 0, scale: 1 },
                }}
                className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[9px] text-teal-300"
              >
                ❖
              </motion.span>
              <motion.span
                variants={{
                  hidden: { opacity: 0, x: 10, scale: 0.8 },
                  visible: { opacity: 1, x: 0, scale: 1 },
                }}
                className="w-6 h-6 rounded-full bg-orange-900/60 border border-orange-600/50 flex items-center justify-center text-[9px] font-bold text-orange-300 group-hover:scale-110 transition-transform duration-300"
              >
                +4
              </motion.span>
            </motion.div>
          </div>
        </TechCard>
      </motion.div>
    </section>
  );
}

