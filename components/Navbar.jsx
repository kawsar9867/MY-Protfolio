"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { MdContactPhone } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  CircleUser,
  CodeXml,
  Layers,
  GraduationCap,
  Menu,
  X,
} from "lucide-react";

const menuItems = [
  {
    icon: <Home className="h-5 w-5" />,
    label: "Home",
    href: "#home",
    gradient:
      "radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(37,99,235,0.06) 50%, rgba(29,78,216,0) 100%)",
    iconColor: "group-hover:text-blue-500 dark:group-hover:text-blue-400",
  },
  {
    icon: <CircleUser className="h-5 w-5" />,
    label: "About",
    href: "#about",
    gradient:
      "radial-gradient(circle, rgba(249,115,22,0.15) 0%, rgba(234,88,12,0.06) 50%, rgba(194,65,12,0) 100%)",
    iconColor: "group-hover:text-orange-500 dark:group-hover:text-orange-400",
  },
  {
    icon: <CodeXml className="h-5 w-5" />,
    label: "Skills",
    href: "#skills",
    gradient:
      "radial-gradient(circle, rgba(239,68,68,0.15) 0%, rgba(220,38,38,0.06) 50%, rgba(185,28,28,0) 100%)",
    iconColor: "group-hover:text-red-500 dark:group-hover:text-red-400",
  },
  {
    icon: <Layers className="h-5 w-5" />,
    label: "Projects",
    href: "#projects",
    gradient:
      "radial-gradient(circle, rgba(239,68,68,0.15) 0%, rgba(220,38,38,0.06) 50%, rgba(185,28,28,0) 100%)",
    iconColor: "group-hover:text-pink-500 dark:group-hover:text-pink-400",
  },
  {
    icon: <GraduationCap className="h-5 w-5" />,
    label: "Education",
    href: "#education",
    gradient:
      "radial-gradient(circle, rgba(34,197,94,0.15) 0%, rgba(22,163,74,0.06) 50%, rgba(21,128,61,0) 100%)",
    iconColor: "group-hover:text-green-500 dark:group-hover:text-green-400",
  },
  {
    icon: <MdContactPhone className="h-5 w-5" />,
    label: "Contact",
    href: "#contact",
    gradient:
      "radial-gradient(circle, rgba(6,182,212,0.15) 0%, rgba(8,145,178,0.06) 50%, rgba(14,116,144,0) 100%)",
    iconColor: "group-hover:text-cyan-500 dark:group-hover:text-cyan-400",
  },
];

const sharedTransition = {
  type: "spring",
  stiffness: 100,
  damping: 20,
  duration: 0.5,
};

const itemVariants = {
  initial: { rotateX: 0, opacity: 1 },
  hover: { rotateX: -90, opacity: 0 },
};

const backVariants = {
  initial: { rotateX: 90, opacity: 0 },
  hover: { rotateX: 0, opacity: 1 },
};

const glowVariants = {
  initial: { opacity: 0, scale: 0.8 },
  hover: {
    opacity: 1,
    scale: 2,
    transition: {
      opacity: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
      scale: { duration: 0.5, type: "spring", stiffness: 300, damping: 25 },
    },
  },
};

const navGlowVariants = {
  initial: { opacity: 0 },
  hover: {
    opacity: 1,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  },
};

// Mobile menu item with tap-to-flip animation
function MobileMenuItem({ item, onClick }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleTap = () => {
    setIsFlipped(!isFlipped);
    onClick();
  };

  return (
    <motion.li className="relative list-none">
      <motion.div
        className="block rounded-xl overflow-visible"
        style={{ perspective: "600px" }}
        onClick={handleTap}
      >
        <motion.div
          className="absolute inset-0 z-0 pointer-events-none rounded-2xl"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={
            isFlipped ? { opacity: 1, scale: 2 } : { opacity: 0, scale: 0.8 }
          }
          transition={{
            opacity: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
            scale: { type: "spring", stiffness: 300, damping: 25 },
          }}
          style={{ background: item.gradient }}
        />
        <motion.a
          href={item.href}
          className="flex items-center gap-2 px-4 py-3 relative z-10 text-neutral-300 hover:text-white transition-colors rounded-xl w-full"
          animate={
            isFlipped
              ? { rotateX: -90, opacity: 0 }
              : { rotateX: 0, opacity: 1 }
          }
          transition={sharedTransition}
          style={{
            transformStyle: "preserve-3d",
            transformOrigin: "center bottom",
          }}
        >
          <span className={`transition-colors duration-300 ${item.iconColor}`}>
            {item.icon}
          </span>
          <span className="font-medium">{item.label}</span>
        </motion.a>
        <motion.a
          href={item.href}
          className="flex items-center gap-2 px-4 py-3 absolute inset-0 z-10 text-neutral-300 hover:text-white transition-colors rounded-xl"
          animate={
            isFlipped ? { rotateX: 0, opacity: 1 } : { rotateX: 90, opacity: 0 }
          }
          transition={sharedTransition}
          style={{
            transformStyle: "preserve-3d",
            transformOrigin: "center top",
          }}
        >
          <span className={`transition-colors duration-300 ${item.iconColor}`}>
            {item.icon}
          </span>
          <span className="font-medium">{item.label}</span>
        </motion.a>
      </motion.div>
    </motion.li>
  );
}

function DesktopMenuItem({ item }) {
  return (
    <motion.li className="relative">
      <motion.div
        className="block rounded-xl overflow-visible group relative"
        style={{ perspective: "600px" }}
        whileHover="hover"
        initial="initial"
      >
        <motion.div
          className="absolute inset-0 z-0 pointer-events-none rounded-2xl"
          variants={glowVariants}
          style={{ background: item.gradient, opacity: 0 }}
        />
        <motion.a
          href={item.href}
          className="flex items-center gap-2 px-4 py-2 relative z-10 bg-transparent text-neutral-300 group-hover:text-white transition-colors rounded-xl"
          variants={itemVariants}
          transition={sharedTransition}
          style={{
            transformStyle: "preserve-3d",
            transformOrigin: "center bottom",
          }}
        >
          <span className={`transition-colors duration-300 ${item.iconColor}`}>
            {item.icon}
          </span>
          <span className="font-medium">{item.label}</span>
        </motion.a>
        <motion.a
          href={item.href}
          className="flex items-center gap-2 px-4 py-2 absolute inset-0 z-10 bg-transparent text-neutral-300 group-hover:text-white transition-colors rounded-xl"
          variants={backVariants}
          transition={sharedTransition}
          style={{
            transformStyle: "preserve-3d",
            transformOrigin: "center top",
            transform: "rotateX(90deg)",
          }}
        >
          <span className={`transition-colors duration-300 ${item.iconColor}`}>
            {item.icon}
          </span>
          <span className="font-medium">{item.label}</span>
        </motion.a>
      </motion.div>
    </motion.li>
  );
}

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div className="container mx-auto my-3 sticky top-3 z-50 px-3 sm:px-0 max-w-full overflow-x-hidden">
      <motion.nav
        className="p-2 sm:p-2.5 rounded-2xl bg-[#090d16]/90 backdrop-blur-xl border border-slate-800/90 shadow-xl shadow-black/50 relative overflow-hidden max-w-5xl mx-auto"
        initial="initial"
        whileHover={!isMobile ? "hover" : undefined}
      >
        {/* Ambient glow on desktop hover */}
        {!isMobile && (
          <motion.div
            className="absolute -inset-2 rounded-3xl z-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(6,182,212,0.12) 0%, rgba(147,51,234,0.1) 50%, rgba(239,68,68,0.1) 100%)",
            }}
            variants={navGlowVariants}
          />
        )}

        {/* Desktop Header */}
        {!isMobile && (
          <div className="flex items-center justify-between px-3 py-1 relative z-10">
            {/* Brand Logo & Title */}
            <a href="#home" className="flex items-center gap-3 group">
              <div className="relative w-9 h-9 rounded-full p-[1.5px] bg-gradient-to-tr from-cyan-400 via-blue-500 to-violet-600 shadow-md shadow-cyan-500/20 group-hover:scale-105 transition-transform">
                <div className="w-full h-full rounded-full bg-slate-950 overflow-hidden flex items-center justify-center">
                  <Image
                    src="/logo.png"
                    alt="KA Logo"
                    width={36}
                    height={36}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-extrabold text-white tracking-tight leading-tight group-hover:text-cyan-300 transition-colors">
                  Kawsar Ahamed
                </span>
                <span className="text-[9px] font-mono text-cyan-400 font-bold tracking-widest uppercase">
                  MERN.DEV
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <ul className="hidden md:flex items-center justify-center gap-1">
              {menuItems.map((item) => (
                <DesktopMenuItem key={item.label} item={item} />
              ))}
            </ul>
          </div>
        )}

        {/* Mobile Header (Matching image_15 / upload image) */}
        {isMobile && (
          <div className="relative z-10">
            <div className="flex items-center justify-between px-2 py-1">
              {/* Left Side: Circular Logo + Name + MERN.DEV */}
              <a href="#home" className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full p-[1.5px] bg-gradient-to-tr from-cyan-400 via-blue-500 to-violet-600 shadow-md shadow-cyan-500/25">
                  <div className="w-full h-full rounded-full bg-slate-950 overflow-hidden flex items-center justify-center">
                    <Image
                      src="/logo.png"
                      alt="KA Logo"
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-extrabold text-white tracking-tight leading-tight">
                    Kawsar Ahamed
                  </span>
                  <span className="text-[10px] font-mono text-cyan-400 font-bold tracking-widest uppercase">
                    MERN.DEV
                  </span>
                </div>
              </a>

              {/* Right Side: Hamburger Button (NO Hire Me Button) */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300 hover:text-white hover:border-cyan-500/40 transition-all cursor-pointer shadow-md"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5 text-cyan-400" />
                ) : (
                  <Menu className="h-5 w-5 text-slate-200" />
                )}
              </button>
            </div>

            {/* Mobile Dropdown Drawer */}
            <AnimatePresence>
              {mobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <ul className="flex flex-col gap-1 pt-3 pb-1 border-t border-slate-800/80 mt-2">
                    {menuItems.map((item) => (
                      <MobileMenuItem
                        key={item.label}
                        item={item}
                        onClick={handleLinkClick}
                      />
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </motion.nav>
    </div>
  );
}

