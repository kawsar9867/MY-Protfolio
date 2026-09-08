"use client";

import { useState, useEffect } from "react";
import { MdContactPhone, MdOutlineArticle } from "react-icons/md";
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
    <div className="container mx-auto my-5 sticky top-5 z-50 px-4 sm:px-0">
      <motion.nav
        className="p-2 rounded-2xl bg-[#0d0f17]/80 backdrop-blur-lg border border-neutral-800/80 shadow-lg shadow-black/40 relative overflow-hidden max-w-5xl mx-auto"
        initial="initial"
        whileHover={!isMobile ? "hover" : undefined}
      >
        {/* Ambient glow on desktop hover */}
        {!isMobile && (
          <motion.div
            className="absolute -inset-2 rounded-3xl z-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(59,130,246,0.1) 0%, rgba(147,51,234,0.1) 50%, rgba(239,68,68,0.1) 100%)",
            }}
            variants={navGlowVariants}
          />
        )}

        {/* Desktop menu */}
        {!isMobile && (
          <ul className="hidden md:flex items-center justify-center gap-2 relative z-10">
            {menuItems.map((item) => (
              <DesktopMenuItem key={item.label} item={item} />
            ))}
          </ul>
        )}

        {/* Mobile menu */}
        {isMobile && (
          <div className="relative z-10">
            <div className="flex items-center justify-between p-2">
              <span className="font-semibold text-white">
                <span className="text-lg font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  Kawsar.
                </span>
              </span>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl bg-neutral-800/80 text-neutral-300 hover:bg-neutral-700 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>

            <AnimatePresence>
              {mobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <ul className="flex flex-col gap-1 pt-2 border-t border-neutral-800">
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
