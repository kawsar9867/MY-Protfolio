"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaGithub } from "react-icons/fa6";
import {
  Search,
  ExternalLink,
  ArrowRight,
  Briefcase,
  Frown,
} from "lucide-react";

const projectsData = [
  {
    id: "digitools",
    title: "DigiTools - Digital Tools Platform",
    category: "frontend",
    categoryLabel: "SaaS / Productivity",
    badgeColor: "bg-violet-500/10 text-violet-400 border-violet-500/20",
    status: "Live Client",
    description:
      "Supercharge your digital workflow with access to curated AI tools, design assets, templates, and productivity utilities in one unified hub.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBPci7WJnucfXLZLtKVyZwLDaDkmhqo97qGeX8wwBbjxMCQXZiiBs2LquT6EGKeQtUaT1ACI4LLoIKV20lsG2cEoh_1-S9aTPutwunzhcKcn-wUcRJ48Jr0Y7aCdh4N6h_1KvaCAAoY_fK2tS5EhHW60IwBgSEZqiKhLdrcPuFdnaPr3tXiKpXaG14cugugEH9-Av8wO5tuG-FUHYPxyS7o4UoSfa45ozsajxns7lZQI2jl-0lC-Gm7es5Y2zKi8zfr_w",
    tags: ["Next.js", "React", "TailwindCSS", "Netlify"],
    liveUrl: "https://a6-digitool.netlify.app/",
    githubUrl: "https://github.com/kawsar9867/A6-DigiTool",
    footerLabel: "Production",
  },
  {
    id: "english-janala",
    title: "English Janala",
    category: "frontend",
    categoryLabel: "EdTech Platform",
    badgeColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    status: "Interactive",
    description:
      "Bilingual interactive language learning platform featuring bite-sized vocabulary lessons, audio pronunciations, and quiz assessments.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAqxtf4MzBEKF-vg8Tyf9BPI2iS89REp2VQNvTC9TJPw2hFT40pt_vXKb2PvJa5ezwNkUl9gwun8dFRnSIEqQsJAkKE_cPGqg6BWSlUHRXX7XXoLrjMK1g6gd_3AHsVkbt7V5r9N5431S0uQyQ7SgwMUHcC9RtqxLXYVFei83AmSKBDyZEoeeotILACeKOSIdKmYRukew2SGV0VOwQwhbxxNirzaRGsQzQn-DBtesuhfPVwre28OJuYMCzyPaOZ6YgkBQ",
    tags: ["React", "TailwindCSS", "Firebase", "REST APIs"],
    liveUrl: "https://project-english-janala-01.netlify.app/",
    githubUrl: "https://github.com/kawsar9867/Project-English-Janala",
    footerLabel: "Deployed",
  },
  {
    id: "skillsphere",
    title: "SkillSphere",
    category: "frontend",
    categoryLabel: "E-Learning Marketplace",
    badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    status: "Frontend App",
    description:
      "Comprehensive course platform featuring multi-tier difficulty badges, custom user profiles, enrollment dashboards, and video streaming.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB6fUxT5OdPhLnF3XI8gKkeX0KQEbRCMq2U4heXu-HaH86PtK_YmiLx6_3iXpHwoLcRqhe3prNPG6U_jhrUtkA1hnq7BOn4ixtK0i60pRaoTBNZmBL7zCfwxpSleKp73DJGHeDCn9jCy0xM0qfpuR1o7MMJdhIGG8iGyPn30DRy3NqdoPhxny-iOHP5KJFAmR3AuDMTjtyaLlPULGkeqtVWjv5yLFNYZtsNcTpBJqIBhiJrEhYlD9aGcHQaFzCCUP4mhw",
    tags: ["React", "TailwindCSS", "Framer Motion", "JavaScript"],
    liveUrl: "https://assignment-08-rose.vercel.app/",
    githubUrl: "https://github.com/kawsar9867/assignment-08",
    footerLabel: "Interactive UI",
  },
  {
    id: "tutorsphere",
    title: "TutorSphere",
    category: "mern",
    categoryLabel: "Tutoring Marketplace",
    badgeColor: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
    status: "MERN Stack",
    description:
      "Dynamic tutor-matching web system connecting students with certified mentors across grades with scheduled booking and secure authentication.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCLsEx9MuKjUBdDjk_eJtpDVw3gweIMwZAJo8uWmZRQ2xIxNfrPYw0PNLMCrAJ0XXtDGfedm4hF1U15Y9VjiXhpkHMKBRS2eV-SKkH-DIyHbZnl5UENbkXhS3k_TzdjWvg9IHhXhTok8u5tPg4wU2uAUWlVrhxETUW88PxMi3op08tmzQDxljQZneBtz2Oqj0KaNKbgmSopEqw1k6A8GmXUy1u9Saxno0LfVqFA5ZBWGx0XZv_WiQStOZUxWKOJJbI2cw",
    tags: ["Next.js", "Express.js", "MongoDB", "Node.js", "JWT"],
    liveUrl: "https://tutor-booking-system-blond.vercel.app/",
    githubUrl: "https://github.com/kawsar9867/Assingment-09-client",
    footerLabel: "Full Stack",
  },
  {
    id: "blood-bridge",
    title: "Blood Bridge",
    category: "mern",
    categoryLabel: "Healthcare / Social",
    badgeColor: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    status: "Live Impact",
    description:
      "Emergency blood donation network connecting voluntary donors directly with patients, featuring geolocated donor search and request management.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCtd4UQxA6sKSgRdp8CpV0wCBo_yg-eGfgSqWBv6THbATYeYUvcWWvo3ZQChdHSm-u_Ar7RWOr0swgUsmkAc8w0D_WxstfJiuvg4lKNC8DNb9ko6aJxCiSftOahMj94IGJq2xEus2NxEhzLw_M_0SainvF2J6s-_GL2-KIlR6dvIxSFNBb_pOcynp_fmacSVlkr1qFMJ-qSqY0wwEaXK-SDJrW2QyGAbaRC2sOI_DPlpAYoPr0_XxRGYuL_B6neCAeerw",
    tags: ["React", "Express.js", "MongoDB", "Node.js"],
    liveUrl: "https://blood-donation-seven-rose.vercel.app/",
    githubUrl: "https://github.com/kawsar9867/Blood-Donation",
    footerLabel: "Public Service",
  },
  {
    id: "github-issues-tracker",
    title: "GitHub Issues Tracker",
    category: "frontend",
    categoryLabel: "Dev Tool",
    badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    status: "v1.4 Released",
    description:
      "Real-time issue monitoring dashboard with advanced filtering by priority badges, issue state, tags, and dynamic searching.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDTQFngoSryFxuMgJZv4rLCc4fNkw_spzPRPYqZy044kl0cQ4AgW7UGsGimgP7SooUYAUqXcZKWpThu3DZOgkD9N5cqFWXoV5HPS6it3Q-V1cwyvGDc0yffjifpvKFID9tbLZFAFhkqF_54Aqkp7L65C_DWcnhpGbBuXPMWnb982IzJc54UCtULjOCWCAjnt7rDEcdHsgYlEK8fLnHf27_1q5ockB6RfEEYhVj8zneDTmXmSjudf4eRfIgcL5swkra_xg",
    tags: ["React", "TailwindCSS", "GitHub API", "REST APIs"],
    liveUrl: "https://github-issue-tracker-001.netlify.app/",
    githubUrl: "https://github.com/kawsar9867/Github-Issue-Tracker",
    footerLabel: "Public Repo",
  },
];

const categories = [
  { id: "all", label: "All" },
  { id: "frontend", label: "Frontend" },
  { id: "mern", label: "MERN Stack" },
];

// Magnetic component for buttons and interactive badges
function Magnetic({ children, distance = 0.3 }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const deltaX = (e.clientX - centerX) * distance;
    const deltaY = (e.clientY - centerY) * distance;
    x.set(deltaX);
    y.set(deltaY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}

// Antigravity Project Card with Floating, 3D Tilt, & Spotlight
function ProjectCard({ project, index }) {
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
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig);
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

  const floatDuration = 3.8 + (index % 3) * 0.5;
  const floatDelay = (index % 4) * 0.4;

  return (
    <motion.article
      layout
      key={project.id}
      initial={{ opacity: 0, scale: 0.92, filter: "blur(10px)", y: 30 }}
      animate={
        isHovered || isMobile
          ? { opacity: 1, scale: 1, filter: "blur(0px)", y: 0, rotate: 0 }
          : {
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
              y: [0, -8, 0],
              rotate: [0, 1, 0, -1, 0],
              transition: {
                y: {
                  duration: floatDuration,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  delay: floatDelay,
                },
                rotate: {
                  duration: floatDuration * 1.2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  delay: floatDelay,
                },
                layout: { duration: 0.35, ease: "easeOut" },
              },
            }
      }
      exit={{ opacity: 0, scale: 0.9, filter: "blur(8px)" }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
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
      className="project-card group bg-slate-900/60 backdrop-blur-md border border-slate-800/90 rounded-2xl overflow-hidden hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/10 flex flex-col justify-between relative transition-colors duration-300"
    >
      {/* Dynamic Radial Spotlight Glow */}
      {!isMobile && (
        <motion.div
          className="absolute inset-0 pointer-events-none z-0 transition-opacity duration-500"
          style={{
            opacity: isHovered ? 0.3 : 0,
            background: `radial-gradient(400px circle at ${spotX.get()}% ${spotY.get()}%, rgba(6,182,212,0.22), transparent 70%)`,
          }}
        />
      )}

      <div className="relative z-10 flex flex-col justify-between h-full">
        <div>
          {/* Thumbnail Container */}
          <div className="relative overflow-hidden aspect-[16/9] bg-slate-950">
            <Image
              src={project.image}
              alt={project.title}
              width={500}
              height={280}
              unoptimized
              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-slate-950/75 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
              <Magnetic distance={0.35}>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-md shadow-cyan-500/30 cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Live Demo
                </a>
              </Magnetic>
              <Magnetic distance={0.35}>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-lg bg-slate-800/90 hover:bg-slate-700 text-white font-medium text-xs border border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <FaGithub className="w-3.5 h-3.5" />
                  GitHub
                </a>
              </Magnetic>
            </div>
          </div>

          {/* Card Content Body */}
          <div className="p-5 sm:p-6">
            {/* Category & Status Badge */}
            <div className="flex items-center justify-between gap-2 mb-3">
              <span
                className={`text-[11px] font-semibold tracking-wide uppercase px-2.5 py-0.5 rounded-full border ${project.badgeColor}`}
              >
                {project.categoryLabel}
              </span>
              <span className="text-xs text-slate-500">
                {project.status}
              </span>
            </div>

            <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-200 mb-2">
              {project.title}
            </h3>

            <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2">
              {project.description}
            </p>

            {/* Tech Stack Tags with Magnetic attraction */}
            <div className="flex flex-wrap gap-1.5 mb-5">
              {project.tags.map((tag) => (
                <Magnetic key={tag} distance={0.2}>
                  <span className="text-xs px-2.5 py-1 rounded-md bg-slate-800/80 text-slate-300 border border-slate-700/50 hover:border-cyan-400/50 hover:text-cyan-200 transition-colors cursor-default inline-block">
                    {tag}
                  </span>
                </Magnetic>
              ))}
            </div>
          </div>
        </div>

        {/* Card Footer */}
        <div className="px-5 sm:px-6 py-4 border-t border-slate-800/80 bg-slate-950/40 flex items-center justify-between">
          <Magnetic distance={0.3}>
            <a
              href={project.liveUrl}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors group/link"
            >
              View Details
              <span className="transition-transform group-hover/link:translate-x-1">
                →
              </span>
            </a>
          </Magnetic>
          <span className="text-xs font-mono text-slate-500">
            {project.footerLabel}
          </span>
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  // GSAP ScrollTrigger Column Parallax
  useEffect(() => {
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (window.innerWidth >= 768 && !isReduced) {
      gsap.registerPlugin(ScrollTrigger);
      const ctx = gsap.context(() => {
        if (gridRef.current && sectionRef.current) {
          const cards = gridRef.current.querySelectorAll(".project-card");
          cards.forEach((card, index) => {
            const parallaxSpeed = index % 3 === 1 ? -15 : 12;
            gsap.to(card, {
              y: parallaxSpeed,
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.2,
              },
            });
          });
        }
      }, sectionRef);

      return () => ctx.revert();
    }
  }, [activeFilter, searchQuery]);

  const filteredProjects = useMemo(() => {
    return projectsData.filter((project) => {
      const matchesCategory =
        activeFilter === "all" || project.category === activeFilter;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        query === "" ||
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.tags.some((tag) => tag.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full"
      id="projects"
    >
      {/* Section Header */}
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl mx-auto mb-14 sm:mb-16"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase bg-cyan-950/60 text-cyan-300 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.25)] mb-6">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
          Portfolio Showcase
        </div>

        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight mb-5">
          Featured{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-violet-500">
            Projects
          </span>
        </h2>

        <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
          Showcasing my full-stack web applications, live client projects, and
          open-source software built for scale, performance, and impact.
        </p>
      </motion.header>

      {/* Filter and Search Control Bar */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mb-10 sm:mb-12"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-900/60 backdrop-blur-md p-3 sm:p-4 rounded-2xl border border-slate-800/80 shadow-lg">
          {/* Category Filter Tabs */}
          <div
            className="flex flex-wrap items-center gap-1.5 sm:gap-2 w-full md:w-auto"
            role="tablist"
          >
            {categories.map((cat) => {
              const isActive = activeFilter === cat.id;
              const count =
                cat.id === "all"
                  ? projectsData.length
                  : projectsData.filter((p) => p.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveFilter(cat.id)}
                  className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-xl transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-cyan-500 text-white shadow-md shadow-cyan-500/20"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/80"
                  }`}
                >
                  {cat.label}{" "}
                  <span className="ml-1 text-xs opacity-80">({count})</span>
                </button>
              );
            })}
          </div>

          {/* Search Input Bar */}
          <div className="relative w-full md:w-80">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title or tech..."
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-950/70 border border-slate-700/60 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-200"
            />
          </div>
        </div>
      </motion.section>

      {/* Projects Grid */}
      <motion.div
        ref={gridRef}
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-16 bg-slate-900/30 rounded-2xl border border-slate-800/60 mt-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-800 text-slate-400 mb-3">
            <Frown className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-semibold text-slate-200">
            No matching projects found
          </h3>
          <p className="text-sm text-slate-400 mt-1">
            Try refining your keyword search or switching to another category.
          </p>
        </div>
      )}

      {/* Call To Action Footer */}
      <footer className="mt-20 text-center border-t border-slate-800/60 pt-12">
        <p className="text-slate-400 text-sm mb-4">
          Interested in collaborating or reviewing source code?
        </p>
        <a
          href="#contact"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-sm font-semibold shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:scale-[1.02]"
        >
          <span>Let&apos;s Discuss a Project</span>
          <ArrowRight className="w-4 h-4" />
        </a>
      </footer>
    </section>
  );
}
