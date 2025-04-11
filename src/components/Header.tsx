"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/Shop" },
  ];

  // Pink-purple gradient theme colors
  const themeColors = {
    bgGradient: "bg-gradient-to-br from-pink-600 via-purple-600 to-indigo-600",
    hoverText: "hover:text-pink-200",
    underline: "bg-pink-200",
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="w-full top-0 z-50 shadow-lg">
      <div className={themeColors.bgGradient}>
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2"
            >
              <div className="relative w-10 h-10">
                <Image
                  src="/headlogo.png"
                  alt="Minecraft Server Logo"
                  fill
                  className="object-contain"
                  sizes="40px"
                  priority
                />
              </div>
              <Link
                href="/"
                className={`text-2xl font-bold text-white ${themeColors.hoverText} transition-colors`}
                onClick={() => setIsOpen(false)}
              >
                AristaMC
              </Link>
            </motion.div>

            <div className="flex items-center gap-4">
              {/* Desktop Navigation */}
              <nav className="hidden md:block">
                <motion.ul
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="flex space-x-6"
                >
                  {navLinks.map((link) => (
                    <motion.li
                      key={link.name}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 10,
                      }}
                    >
                      <Link
                        href={link.href}
                        className={`text-white ${themeColors.hoverText} font-medium transition-colors relative group`}
                      >
                        {link.name}
                        <span
                          className={`absolute left-0 bottom-0 h-0.5 ${themeColors.underline} w-0 group-hover:w-full transition-all duration-300`}
                        ></span>
                      </Link>
                    </motion.li>
                  ))}
                </motion.ul>
              </nav>

              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <motion.button
                  onClick={toggleMenu}
                  className="text-white focus:outline-none"
                  aria-label="Toggle menu"
                  whileTap={{ scale: 0.9 }}
                >
                  <div className="w-6 flex flex-col items-end space-y-1.5">
                    <motion.span
                      animate={{
                        rotate: isOpen ? 45 : 0,
                        y: isOpen ? 8 : 0,
                        width: isOpen ? "100%" : "100%",
                      }}
                      className="block h-0.5 bg-white rounded-full"
                      style={{ originX: 0 }}
                    ></motion.span>
                    <motion.span
                      animate={{
                        opacity: isOpen ? 0 : 1,
                        width: isOpen ? 0 : "80%",
                      }}
                      className="block h-0.5 bg-white rounded-full"
                    ></motion.span>
                    <motion.span
                      animate={{
                        rotate: isOpen ? -45 : 0,
                        y: isOpen ? -8 : 0,
                        width: isOpen ? "100%" : "60%",
                      }}
                      className="block h-0.5 bg-white rounded-full"
                      style={{ originX: 0 }}
                    ></motion.span>
                  </div>
                </motion.button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden overflow-hidden"
              >
                <motion.ul
                  initial={{ y: -20 }}
                  animate={{ y: 0 }}
                  exit={{ y: -20 }}
                  transition={{ duration: 0.2 }}
                  className="py-4 space-y-4"
                >
                  {navLinks.map((link) => (
                    <motion.li
                      key={link.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      whileHover={{ x: 5 }}
                    >
                      <Link
                        href={link.href}
                        className={`block text-white ${themeColors.hoverText} font-medium py-2 px-4 rounded transition-colors w-full text-left`}
                        onClick={() => setIsOpen(false)}
                      >
                        {link.name}
                      </Link>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

export default Header;
