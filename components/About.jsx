"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
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
import { FaFacebook, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import {
  Globe,
  Server,
  Database,
  Palette,
  Layout,
  Code2,
  Cpu,
} from "lucide-react";

// Animated counter component for statistics numbers
function AnimatedCounter({ target, suffix = "", prefix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, target, {
        duration: 1.8,
        ease: [0.16, 1, 0.3, 1],
        onUpdate(latest) {
          setCount(Math.floor(latest));
        },
      });
      return () => controls.stop();
    }
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

export default function About() {
  const glowRef = useRef(null);
  const sectionRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);

  // Mouse tilt physics for Profile Card
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), springConfig);
  const spotX = useSpring(useTransform(mouseX, [-0.5, 0.5], [10, 90]), springConfig);
  const spotY = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, 90]), springConfig);

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

  // GSAP Ambient glow & ScrollTrigger Parallax
  useEffect(() => {
    if (glowRef.current) {
      gsap.to(glowRef.current, {
        opacity: 0.9,
        scale: 1.08,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }

    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (window.innerWidth >= 768 && !isReduced) {
      gsap.registerPlugin(ScrollTrigger);
      const ctx = gsap.context(() => {
        if (leftColRef.current && rightColRef.current && sectionRef.current) {
          gsap.to(leftColRef.current, {
            y: -12,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          });

          gsap.to(rightColRef.current, {
            y: 12,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          });
        }
      }, sectionRef);

      return () => ctx.revert();
    }
  }, []);

  const bioText =
    "I am a passionate Computer Science student and MERN Stack Developer from Bangladesh. My coding journey started with curiosity and turned into a lifelong passion. I love building things that live on the internet and solving real-world problems through code. Every line of code I write is a step towards making the digital world better.";

  const bioWords = bioText.split(" ");

  const techStack = [
    {
      name: "Frontend",
      bg: "bg-[#165a6c]",
      icon: Globe,
      color: "text-cyan-200",
    },
    {
      name: "Backend",
      bg: "bg-[#277943]",
      icon: Server,
      color: "text-emerald-200",
    },
    {
      name: "Database",
      bg: "bg-[#7a3db8]",
      icon: Database,
      color: "text-purple-200",
    },
    {
      name: "UI/UX",
      bg: "bg-[#a22384]",
      icon: Palette,
      color: "text-pink-200",
    },
    {
      name: "Web",
      bg: "bg-[#d06b1e]",
      icon: Layout,
      color: "text-amber-200",
    },
    {
      name: "Tailwind",
      bg: "bg-[#207bba]",
      icon: Code2,
      color: "text-sky-200",
    },
    {
      name: "MongoDB",
      bg: "bg-[#0d9488]",
      icon: Cpu,
      color: "text-teal-200",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pt-16 pb-24"
      id="about"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
        {/* Left Column: About Me Bio & Technologies */}
        <motion.div
          ref={leftColRef}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.12, delayChildren: 0.05 },
            },
          }}
          className="lg:col-span-7 flex flex-col items-start gap-6"
        >
          {/* Section Title & Accent Badge */}
          <div className="space-y-2">
            <motion.h2
              variants={{
                hidden: { opacity: 0, y: 25 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight"
            >
              About Me
            </motion.h2>

            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.85 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  transition: {
                    duration: 0.5,
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  },
                },
              }}
            >
              <span className="inline-block px-4 py-1 rounded-full bg-teal-950/60 border border-teal-500/40 text-teal-300 text-xs font-medium tracking-wide">
                Introduction
              </span>
            </motion.div>
          </div>

          {/* About Me Bio Staggered Word Reveal */}
          <motion.p
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.02, delayChildren: 0.1 },
              },
            }}
            className="text-neutral-300 text-base sm:text-lg leading-relaxed max-w-2xl font-normal"
          >
            {bioWords.map((word, index) => (
              <motion.span
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 6 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.3, ease: "easeOut" },
                  },
                }}
                className="inline-block mr-[0.25em]"
              >
                {word}
              </motion.span>
            ))}
          </motion.p>

          {/* My Experience */}
          <div className="w-full pt-2">
            <motion.div
              variants={{
                hidden: { opacity: 0, x: -25 },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: { duration: 0.5, ease: "easeOut" },
                },
              }}
              className="flex items-center gap-3 mb-5"
            >
              <span className="w-6 h-[2px] bg-teal-400/80 rounded-full"></span>

              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                My Experience
              </h3>
            </motion.div>

            {/* Technologies */}
            <motion.h4
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.4, ease: "easeOut" },
                },
              }}
              className="text-base sm:text-lg font-semibold text-neutral-200 mb-4"
            >
              Technologies I Work With
            </motion.h4>

            {/* Technology Badges */}
            <motion.div
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.07 } },
              }}
              className="flex flex-wrap items-center gap-2.5 max-w-xl"
            >
              {techStack.map((tech) => {
                const IconComponent = tech.icon;
                return (
                  <motion.div
                    key={tech.name}
                    variants={{
                      hidden: { opacity: 0, y: 18, scale: 0.9 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        transition: {
                          type: "spring",
                          stiffness: 260,
                          damping: 18,
                        },
                      },
                    }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full ${tech.bg} text-white text-xs sm:text-sm font-medium shadow-sm cursor-default transition-all duration-300 hover:shadow-lg`}
                  >
                    <IconComponent className={`w-3.5 h-3.5 ${tech.color}`} />
                    <span>{tech.name}</span>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </motion.div>

        {/* Right Column: Profile Card + Stats */}
        <motion.div
          ref={rightColRef}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{
            hidden: { opacity: 0, x: 40 },
            visible: {
              opacity: 1,
              x: 0,
              transition: {
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.15,
                staggerChildren: 0.15,
              },
            },
          }}
          className="lg:col-span-5 flex flex-col items-center gap-6 w-full max-w-[440px] mx-auto lg:mx-0 lg:ml-auto"
        >
          {/* Profile Card */}
          <motion.div
            animate={!isMobile ? { y: [0, -6, 0] } : {}}
            transition={{
              duration: 6,
              ease: "easeInOut",
              repeat: Infinity,
            }}
            style={!isMobile ? { rotateX, rotateY, transformStyle: "preserve-3d" } : {}}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="w-full rounded-2xl bg-[#0b141a]/85 border border-[#1e3a47] p-6 sm:p-7 flex flex-col items-center text-center shadow-xl shadow-cyan-950/20 backdrop-blur-md group relative overflow-hidden transition-colors duration-300 hover:border-teal-500/40"
          >
            {/* Spotlight glow inside card */}
            {!isMobile && (
              <motion.div
                className="absolute inset-0 pointer-events-none z-0 transition-opacity duration-500"
                style={{
                  opacity: isHovered ? 0.35 : 0,
                  background: `radial-gradient(400px circle at ${spotX.get()}% ${spotY.get()}%, rgba(6,182,212,0.25), transparent 70%)`,
                }}
              />
            )}

            {/* Name & Title */}
            <h3 className="text-2xl sm:text-[26px] font-bold text-white tracking-tight z-10">
              Kawsar Ahamed
            </h3>

            <p className="text-teal-300/90 text-sm font-medium mt-1 mb-5 z-10">
              MERN Stack Developer
            </p>

            {/* Portrait Image */}
            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  transition: { duration: 0.6, ease: "easeOut" },
                },
              }}
              animate={{
                boxShadow: [
                  "0 0 15px rgba(6,182,212,0.2)",
                  "0 0 25px rgba(6,182,212,0.45)",
                  "0 0 15px rgba(6,182,212,0.2)",
                ],
              }}
              transition={{
                boxShadow: { duration: 3.5, repeat: Infinity, ease: "easeInOut" },
              }}
              className="relative w-full max-w-[260px] aspect-square rounded-2xl p-[3px] my-1 bg-gradient-to-tr from-cyan-500 via-teal-400 to-blue-600 shadow-lg shadow-cyan-500/20 z-10"
            >
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative w-full h-full rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-700/60 z-10"
              >
                <Image
                  src="/kawsar.jpg"
                  alt="Kawsar Ahamed"
                  width={300}
                  height={300}
                  priority
                  className="w-full h-full object-cover object-top filter contrast-105 transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </motion.div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
              }}
              className="flex items-center justify-center gap-4 mt-6 z-10"
            >
              {/* Facebook */}
              <motion.a
                variants={{
                  hidden: { opacity: 0, y: 12, scale: 0.8 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { type: "spring", stiffness: 350, damping: 18 },
                  },
                }}
                whileHover={{
                  scale: 1.12,
                  y: -3,
                  boxShadow: "0 0 14px rgba(45,212,191,0.4)",
                }}
                whileTap={{ scale: 0.92 }}
                aria-label="Facebook"
                className="w-10 h-10 rounded-lg bg-[#11232d] hover:bg-[#183443] border border-[#1b4153] flex items-center justify-center text-teal-300 hover:text-white transition-colors"
                href="#"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook className="w-4 h-4" />
              </motion.a>

              {/* Twitter / X */}
              <motion.a
                variants={{
                  hidden: { opacity: 0, y: 12, scale: 0.8 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { type: "spring", stiffness: 350, damping: 18 },
                  },
                }}
                whileHover={{
                  scale: 1.12,
                  y: -3,
                  boxShadow: "0 0 14px rgba(45,212,191,0.4)",
                }}
                whileTap={{ scale: 0.92 }}
                aria-label="Twitter"
                className="w-10 h-10 rounded-lg bg-[#11232d] hover:bg-[#183443] border border-[#1b4153] flex items-center justify-center text-teal-300 hover:text-white transition-colors"
                href="#"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaXTwitter className="w-4 h-4" />
              </motion.a>

              {/* LinkedIn */}
              <motion.a
                variants={{
                  hidden: { opacity: 0, y: 12, scale: 0.8 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { type: "spring", stiffness: 350, damping: 18 },
                  },
                }}
                whileHover={{
                  scale: 1.12,
                  y: -3,
                  boxShadow: "0 0 14px rgba(45,212,191,0.4)",
                }}
                whileTap={{ scale: 0.92 }}
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-lg bg-[#11232d] hover:bg-[#183443] border border-[#1b4153] flex items-center justify-center text-teal-300 hover:text-white transition-colors"
                href="#"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin className="w-4 h-4" />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Experience Stats */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 25 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.6,
                  ease: "easeOut",
                  staggerChildren: 0.12,
                },
              },
            }}
            className="relative w-full"
          >
            {/* Ambient Glow with GSAP animation */}
            <div
              ref={glowRef}
              className="absolute -top-6 inset-x-4 h-12 bg-gradient-to-r from-blue-600/40 via-purple-600/40 to-pink-600/40 blur-xl rounded-full pointer-events-none opacity-50"
            />

            <div className="relative grid grid-cols-3 gap-3 w-full">
              {/* Experience */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, ease: "easeOut" },
                  },
                }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="rounded-xl bg-[#090b12]/95 border border-neutral-800/90 py-3.5 px-2 flex flex-col items-center justify-center text-center shadow-lg hover:border-neutral-700 hover:shadow-[0_0_15px_rgba(59,130,246,0.15)] transition-all"
              >
                <span className="text-base sm:text-lg font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent tracking-tight">
                  <AnimatedCounter target={2} suffix="+ Years" />
                </span>

                <span className="text-[11px] sm:text-xs text-neutral-400 font-normal mt-0.5">
                  Experience
                </span>
              </motion.div>

              {/* Projects */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, ease: "easeOut" },
                  },
                }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="rounded-xl bg-[#090b12]/95 border border-neutral-800/90 py-3.5 px-2 flex flex-col items-center justify-center text-center shadow-lg hover:border-neutral-700 hover:shadow-[0_0_15px_rgba(168,85,247,0.15)] transition-all"
              >
                <span className="text-base sm:text-lg font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent tracking-tight">
                  <AnimatedCounter target={15} suffix="+" />
                </span>

                <span className="text-[11px] sm:text-xs text-neutral-400 font-normal mt-0.5">
                  Projects
                </span>
              </motion.div>

              {/* Coffee */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, ease: "easeOut" },
                  },
                }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="rounded-xl bg-[#090b12]/95 border border-neutral-800/90 py-3.5 px-2 flex flex-col items-center justify-center text-center shadow-lg hover:border-neutral-700 hover:shadow-[0_0_15px_rgba(56,189,248,0.15)] transition-all"
              >
                <div className="flex items-center gap-1">
                  <span className="text-sm">☕</span>

                  <span className="text-base sm:text-lg font-bold text-white tracking-tight">
                    <AnimatedCounter target={20} suffix="+" />
                  </span>
                </div>

                <span className="text-[11px] sm:text-xs text-sky-400 font-medium mt-0.5">
                  Coffee/Week
                </span>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

