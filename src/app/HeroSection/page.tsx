"use client";

import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import {
  FaDiscord,
  FaSnowflake,
  FaCopy,
  FaUsers,
  FaGlobe,
  FaCrown,
} from "react-icons/fa";
import Image from "next/image";

interface DiscordData {
  approximate_member_count?: number;
  approximate_presence_count?: number;
  guild?: {
    name?: string;
    icon?: string;
  };
}

export default function HeroSection() {
  const [discordData, setDiscordData] = useState<DiscordData>({});
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const controls = useAnimation();
  const serverIP = "play.arisemc.fun";
  const [showVIP, setShowVIP] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    setIsClient(true);

    // Loading progress simulation
    const loadInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(loadInterval);
          return 100;
        }
        return prev + 10;
      });
    }, 300);

    const sequence = async () => {
      // Initial loading screen with progress bar
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // VIP entrance animation
      await controls.start({
        opacity: [0, 1],
        scale: [0.8, 1],
        transition: {
          duration: 1.5,
          ease: "backOut",
        },
      });

      // Hold VIP screen for 2 seconds
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Exit VIP animation
      await controls.start({
        opacity: [1, 0],
        scale: [1, 1.2],
        transition: {
          duration: 1,
          ease: "easeIn",
        },
      });

      setShowVIP(false);
      setIsLoading(false);
      clearInterval(loadInterval);

      try {
        const response = await fetch(
          "https://discord.com/api/v9/invites/GWMkFmBRt6?with_counts=true"
        );
        const data = await response.json();
        setDiscordData(data);
      } catch (error) {
        console.error("Error fetching Discord data:", error);
        setDiscordData({
          approximate_member_count: 1250,
          approximate_presence_count: 320,
          guild: {
            name: "AriseMC Community",
          },
        });
      }
    };

    sequence();

    return () => clearInterval(loadInterval);
  }, [controls]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(serverIP);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollItems = [
    "🌟 NEW SEASON",
    "🎉 100+ PLAYERS",
    "⚔️ CUSTOM GAMEPLAY",
    "🎁 DAILY REWARDS",
    "🏆 COMPETITIVE",
    "🛡️ ANTI-CHEAT",
  ];

  return (
    <div className="relative w-full overflow-hidden h-[800px] sm:h-[740px]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/background.png"
          alt="Background"
          fill
          className="object-cover"
          priority
          quality={100}
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-1 overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-80"
          initial={{ backgroundPosition: "0% 0%" }}
          animate={{ backgroundPosition: "100% 100%" }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          style={{
            background: `
              linear-gradient(45deg, #ec4899 0%, #8b5cf6 20%, transparent 40%),
              linear-gradient(135deg, #8b5cf6 10%, #ec4899 30%, transparent 50%),
              linear-gradient(225deg, #ec4899 5%, #8b5cf6 25%, transparent 45%),
              linear-gradient(315deg, #8b5cf6 15%, #ec4899 35%, transparent 55%)
            `,
            backgroundSize: "400% 400%",
          }}
        />
      </div>

      {/* Snow Particles - Only render on client */}
      {isClient &&
        Array.from({ length: 40 }).map((_, i) => (
          <motion.div
            key={`snow-${i}`}
            className="absolute text-white z-2 pointer-events-none"
            style={{
              left: `${Math.random() * 100}%`,
              top: "-2rem",
              fontSize: `${0.5 + Math.random() * 2}rem`,
              opacity: 0.4 + Math.random() * 0.6,
            }}
            animate={{
              y: ["0%", "110vh"],
              x: [
                0,
                Math.random() * 100 - 50,
                (Math.random() * 100 - 50) * 0.7,
                (Math.random() * 100 - 50) * 1.3,
              ],
              rotate: [0, Math.random() * 360],
              opacity: [
                0.4 + Math.random() * 0.6,
                0.4 + Math.random() * 0.6,
                0,
              ],
            }}
            transition={{
              duration: 10 + Math.random() * 20,
              delay: Math.random() * 5,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <FaSnowflake />
          </motion.div>
        ))}

      {/* Content */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-4">
        <AnimatePresence>
          {showVIP && (
            <motion.div
              key="vip-animation"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-90 z-20"
            >
              {/* Loading screen */}
              {loadingProgress < 100 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-center mb-8"
                >
                  <div className="spinner mb-4 mx-auto w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                  <h2 className="text-xl sm:text-2xl text-white font-medium mb-2">
                    LOADING ARISEMC
                  </h2>
                  <div className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden mx-auto">
                    <motion.div
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                      initial={{ width: "0%" }}
                      animate={{ width: `${loadingProgress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <p className="text-gray-300 mt-2">{loadingProgress}%</p>
                </motion.div>
              )}

              {/* VIP Entrance */}
              {loadingProgress >= 100 && (
                <>
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0, y: 50 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 100,
                      damping: 10,
                      delay: 0.2,
                    }}
                    className="mb-6"
                  >
                    <div className="relative">
                      <Image
                        src="/Aris.png"
                        alt="VIP Logo"
                        width={300}
                        height={300}
                        className="mx-auto w-40 h-40 md:w-60 md:h-60"
                      />
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: [0, 1.2, 1] }}
                        transition={{
                          delay: 0.5,
                          duration: 0.8,
                          ease: "easeOut",
                        }}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <FaCrown className="text-yellow-400 text-5xl md:text-6xl absolute -top-5 -right-5 animate-pulse" />
                      </motion.div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="text-center"
                  >
                    <h1 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600 mb-2">
                      WELCOME TO ARISEMC
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300">
                      Loading premium experience...
                    </p>
                  </motion.div>
                </>
              )}
            </motion.div>
          )}

          {!isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="w-full max-w-6xl mx-auto flex flex-col items-center px-2 sm:px-4"
            >
              {/* Main Logo */}
              <motion.div
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
                className="mb-4 max-w-[100%] md:max-w-[80%] mt-2 w-full"
              >
                <Image
                  src="/Aris.png"
                  alt="Main Logo"
                  width={800}
                  height={400}
                  className="w-full h-auto"
                  priority
                />
              </motion.div>

              {/* Rest of your existing content remains exactly the same */}
              {/* Tagline */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="relative mb-6 md:mb-8 lg:mt-10 w-full max-w-md md:max-w-lg"
              >
                <h2 className="text-xl sm:text-2xl md:text-3xl font-medium text-white text-center">
                  The Ultimate Minecraft Experience
                </h2>
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 md:h-1 bg-gradient-to-r from-transparent via-pink-500 to-transparent"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.7, duration: 1.5, ease: "easeOut" }}
                />
              </motion.div>

              {/* Infinite Scrolling Text */}
              {isClient && (
                <motion.div
                  className="overflow-hidden py-2 md:py-4 mb-4 md:mb-6 lg:mb-8 w-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <motion.div
                    className="flex whitespace-nowrap"
                    animate={{
                      x: ["0%", "-100%"],
                    }}
                    transition={{
                      duration: 25,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    {[...scrollItems, ...scrollItems].map((item, index) => (
                      <span
                        key={index}
                        className="mx-2 sm:mx-3 md:mx-4 text-base sm:text-lg md:text-xl font-bold text-white uppercase tracking-wider hover:text-pink-400 transition-colors"
                      >
                        {item}
                      </span>
                    ))}
                  </motion.div>
                </motion.div>
              )}

              {/* Stats Boxes */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6 w-full max-w-xs sm:max-w-md md:max-w-4xl mb-6 md:mb-8"
              >
                {/* Discord Box */}
                <div className="bg-gradient-to-br from-purple-900/70 to-pink-900/70 backdrop-blur-lg rounded-lg md:rounded-xl p-4 sm:p-5 md:p-6 border border-purple-500/30 shadow-lg hover:shadow-purple-500/20 transition-all">
                  <div className="flex items-center mb-2 sm:mb-3 md:mb-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-purple-600 flex items-center justify-center mr-2 sm:mr-3">
                      <FaDiscord className="text-white text-xl sm:text-2xl" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-base sm:text-lg">
                        {discordData.guild?.name || "Our Discord"}
                      </h3>
                      <p className="text-purple-200 text-xs sm:text-sm">
                        Join our community
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 mb-2 sm:mb-3 md:mb-4">
                    <div className="bg-black/30 rounded-md md:rounded-lg p-2 sm:p-3 flex items-center">
                      <FaUsers className="text-purple-400 mr-1 sm:mr-2 text-sm sm:text-base" />
                      <div>
                        <p className="text-gray-300 text-xs">MEMBERS</p>
                        <p className="text-white font-bold text-sm sm:text-base">
                          {discordData.approximate_member_count?.toLocaleString() ||
                            "1.2K+"}
                        </p>
                      </div>
                    </div>
                    <div className="bg-black/30 rounded-md md:rounded-lg p-2 sm:p-3 flex items-center">
                      <div className="relative mr-1 sm:mr-2">
                        <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500 animate-pulse"></div>
                      </div>
                      <div>
                        <p className="text-gray-300 text-xs">ONLINE</p>
                        <p className="text-white font-bold text-sm sm:text-base">
                          {discordData.approximate_presence_count?.toLocaleString() ||
                            "320+"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <a
                    href="https://discord.gg/GWMkFmBRt6"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 sm:py-3 px-3 sm:px-4 rounded-md md:rounded-lg transition-all sm:flex items-center justify-center text-sm sm:text-base"
                  >
                    <FaDiscord className="mr-1 sm:mr-2" /> JOIN DISCORD
                  </a>
                </div>

                {/* Server IP Box */}
                <div className="bg-gradient-to-br from-gray-900/70 to-gray-800/70 backdrop-blur-lg rounded-lg md:rounded-xl p-4 sm:p-5 md:p-6 border border-pink-500/30 shadow-lg hover:shadow-pink-500/20 transition-all">
                  <div className="flex items-center mb-2 sm:mb-3 md:mb-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-pink-600 flex items-center justify-center mr-2 sm:mr-3">
                      <FaGlobe className="text-white text-xl sm:text-2xl" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-base sm:text-lg">
                        SERVER IP
                      </h3>
                      <p className="text-pink-200 text-xs sm:text-sm">
                        Connect and start playing
                      </p>
                    </div>
                  </div>
                  <div className="mb-2 sm:mb-3 md:mb-4">
                    <div className="bg-black/30 rounded-md md:rounded-lg p-2 sm:p-3 md:p-4 flex items-center justify-between">
                      <div>
                        <p className="text-gray-300 text-xs">ADDRESS</p>
                        <p className="text-white font-bold text-base sm:text-lg md:text-xl font-mono tracking-wider">
                          {serverIP}
                        </p>
                      </div>
                      <button
                        onClick={copyToClipboard}
                        className={`p-1 sm:p-2 rounded-md md:rounded-lg transition-all flex items-center justify-center ${
                          copied
                            ? "bg-green-600"
                            : "bg-pink-600 hover:bg-pink-700"
                        }`}
                        aria-label="Copy IP"
                      >
                        {copied ? (
                          <span className="text-xs font-bold">COPIED!</span>
                        ) : (
                          <FaCopy className="text-sm sm:text-base md:text-lg" />
                        )}
                      </button>
                    </div>
                  </div>
                  <button className="block w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 sm:py-3 px-3 sm:px-4 rounded-md md:rounded-lg transition-all text-sm sm:text-base">
                    LAUNCH GAME
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
