"use client";

import {
  motion,
  useAnimation,
  useInView,
  AnimatePresence,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  FaStar,
  FaFire,
  FaTrophy,
  FaGem,
  FaServer,
  FaTree,
  FaCompass,
  FaUsers,
  FaGlobe,
} from "react-icons/fa";

interface Feature {
  icon: JSX.Element;
  title: string;
  description: string;
  color: string;
}

export default function MinecraftFeatures() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false });
  const controls = useAnimation();
  const [animated, setAnimated] = useState(false);
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  // Features data with 6 items
  const features: Feature[] = [
    {
      icon: <FaTree className="text-4xl" />,
      title: "Survival World",
      description: "Fresh Season 1 world with custom terrain generation",
      color: "from-green-600 to-emerald-500",
    },
    {
      icon: <FaServer className="text-4xl" />,
      title: "24/7 Uptime",
      description: "High-performance server with zero lag",
      color: "from-purple-600 to-indigo-500",
    },
    {
      icon: <FaTrophy className="text-4xl" />,
      title: "Player Economy",
      description: "Complete with shops, auctions & player markets",
      color: "from-yellow-600 to-amber-500",
    },
    {
      icon: <FaGem className="text-4xl" />,
      title: "Custom Items",
      description: "Unique weapons, tools and cosmetics to collect",
      color: "from-blue-600 to-cyan-500",
    },
    {
      icon: <FaCompass className="text-4xl" />,
      title: "Weekly Events",
      description: "Special survival challenges with prizes",
      color: "from-red-600 to-pink-500",
    },
    {
      icon: <FaStar className="text-4xl" />,
      title: "Premium Ranks",
      description: "Exclusive perks for supporters",
      color: "from-pink-600 to-rose-500",
    },
  ];

  // Infinite scroll items for survival
  const scrollItems = [
    "SEASON 1 JUST LAUNCHED",
    "LAND CLAIM SYSTEM",
    "PLAYER SHOPS & ECONOMY",
    "CUSTOM MOB ARENAS",
    "WEEKLY SURVIVAL EVENTS",
    "ACTIVE COMMUNITY",
    "ANTI-CHEAT PROTECTION",
    "REGULAR UPDATES",
  ];

  // Animated gradient background
  const gradientAnimation = {
    initial: { backgroundPosition: "0% 0%" },
    animate: { backgroundPosition: "100% 100%" },
    transition: { duration: 15, repeat: Infinity, ease: "linear" },
  };

  // Infinite scroll animation controls
  const scrollControls = useAnimation();
  const scrollRef = useRef<HTMLDivElement>(null);
  const isScrollInView = useInView(scrollRef, { once: false });

  useEffect(() => {
    if (isInView && !animated) {
      controls.start("visible");
      setAnimated(true);
    }
  }, [isInView, animated, controls]);

  useEffect(() => {
    if (isScrollInView) {
      scrollControls.start({
        x: ["0%", "-100%"],
        transition: {
          duration: 40,
          repeat: Infinity,
          ease: "linear",
        },
      });
    } else {
      scrollControls.stop();
    }
  }, [isScrollInView, scrollControls]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-16 sm:py-20 w-full"
    >
      {/* Animated Gradient Background */}
      <motion.div
        className="absolute inset-0 z-0 opacity-80"
        initial="initial"
        animate="animate"
        transition={gradientAnimation.transition}
        variants={gradientAnimation}
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

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gray-900/90 z-1" />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-2">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute text-white opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${0.5 + Math.random() * 1.5}rem`,
            }}
            initial={{ opacity: 0 }}
            animate={{
              y: [0, -100, -200],
              x: [0, (Math.random() - 0.5) * 50],
              opacity: [0.2, 0.8, 0],
              rotate: Math.random() * 360,
            }}
            transition={{
              duration: 20 + Math.random() * 20,
              delay: Math.random() * 5,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            ◆
          </motion.div>
        ))}
      </div>

      {/* Infinite scrolling banner - only animates when in view */}
      <div ref={scrollRef} className="relative overflow-hidden py-4 mb-16 z-10">
        <motion.div className="flex whitespace-nowrap" animate={scrollControls}>
          {[...Array(4)].map((_, i) => (
            <div key={`banner-set-${i}`} className="flex">
              {scrollItems.map((item, j) => (
                <div
                  key={`banner-${i}-${j}`}
                  className="flex items-center mx-8"
                >
                  <motion.div
                    className="w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-600 rounded-sm mr-3"
                    whileHover={{ scale: 1.2, rotate: 180 }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="text-lg sm:text-xl font-bold text-white uppercase tracking-wider">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Animated title */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <motion.h2
            initial={{ scale: 0.9 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ delay: 0.3, type: "spring" }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-600">
              SURVIVAL SEASON 1
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
            className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Experience Minecraft survival reimagined with custom features and an
            active community
          </motion.p>
        </motion.div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{
                y: -10,
                scale: 1.03,
                boxShadow:
                  "0 20px 25px -5px rgba(236, 72, 153, 0.2), 0 10px 10px -5px rgba(236, 72, 153, 0.1)",
              }}
              onHoverStart={() => setHoveredFeature(index)}
              onHoverEnd={() => setHoveredFeature(null)}
              className="relative overflow-hidden rounded-xl border border-gray-700 bg-gray-800/50 backdrop-blur-md"
            >
              <AnimatePresence>
                {hoveredFeature === index && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 0.15, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                    className={`absolute inset-0 bg-gradient-to-br ${feature.color}`}
                  />
                )}
              </AnimatePresence>

              <div className="relative z-10 p-6 flex flex-col items-center text-center h-full">
                <motion.div
                  initial={{ scale: 0.9 }}
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  whileTap={{ scale: 0.95 }}
                  className={`mb-4 p-4 rounded-full bg-gradient-to-br ${feature.color}`}
                >
                  {feature.icon}
                </motion.div>
                <motion.h3
                  className="text-xl font-bold text-white mb-2"
                  whileHover={{ scale: 1.05 }}
                >
                  {feature.title}
                </motion.h3>
                <motion.p
                  className="text-gray-300"
                  whileHover={{ scale: 1.02 }}
                >
                  {feature.description}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            {
              icon: <FaUsers className="text-xl text-white" />,
              bg: "bg-pink-600",
              label: "ACTIVE PLAYERS",
              value: "420+",
            },
            {
              icon: <FaGlobe className="text-xl text-white" />,
              bg: "bg-purple-600",
              label: "SERVER UPTIME",
              value: "99.9%",
            },
            {
              icon: <FaFire className="text-xl text-white" />,
              bg: "bg-indigo-600",
              label: "DAYS ONLINE",
              value: "30+",
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ scale: 0.95 }}
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-gray-800/70 to-gray-900/70 rounded-xl p-6 border border-gray-700 backdrop-blur-md"
            >
              <div className="flex items-center">
                <motion.div
                  className={`${stat.bg} p-3 rounded-full mr-4`}
                  animate={{
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 5,
                  }}
                >
                  {stat.icon}
                </motion.div>
                <div>
                  <p className="text-gray-300 text-sm">{stat.label}</p>
                  <motion.p
                    className="text-white font-bold text-2xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 + index * 0.2 }}
                  >
                    {stat.value}
                  </motion.p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Server IP Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={
            isInView
              ? {
                  opacity: 1,
                  scale: 1,
                  boxShadow: [
                    "0 0 0 0 rgba(139, 92, 246, 0.7)",
                    "0 0 0 10px rgba(139, 92, 246, 0)",
                    "0 0 0 0 rgba(139, 92, 246, 0)",
                  ],
                }
              : {}
          }
          transition={{
            delay: 1.2,
            type: "spring",
            boxShadow: {
              duration: 4,
              repeat: Infinity,
              repeatDelay: 2,
            },
          }}
          className="mt-16 bg-gradient-to-br from-purple-900/70 to-pink-900/70 rounded-xl p-8 border border-purple-500/30 backdrop-blur-lg text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            JOIN OUR SERVER NOW
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Copy the IP below and paste it in your Minecraft client to join our
            amazing community!
          </p>

          <motion.div
            className="bg-gray-800/80 border border-purple-500/50 rounded-lg p-4 max-w-md mx-auto"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center justify-center">
              <motion.div
                className="w-6 h-6 bg-gradient-to-br from-pink-500 to-purple-600 rounded-sm mr-3"
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              <code className="text-xl font-mono font-bold text-white select-all">
                play.arisemc.fun
              </code>
              <motion.button
                className="ml-4 px-3 py-1 bg-purple-600 hover:bg-purple-500 rounded text-sm font-medium transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  navigator.clipboard.writeText("play.minecraftserver.com")
                }
              >
                Copy
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
