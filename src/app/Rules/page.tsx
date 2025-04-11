"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function ServerRules() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false });
  const controls = useAnimation();
  const [animated, setAnimated] = useState(false);

  const scrollControls = useAnimation();
  const scrollRef = useRef<HTMLDivElement>(null);
  const isScrollInView = useInView(scrollRef, { once: false });

  const rules = [
    {
      category: "Game Rules",
      icon: "🌿",
      items: [
        "No cheating/hacking",
        "Respect others",
        "No exploiting game bugs/glitches",
        "No inappropriate builds (Instant ban)",
        "Do not lag the server intentionally",
        "Alt Grinding is not allowed (1 Account per IP)",
        "X-Ray is not allowed",
        "Crystal PvP is not allowed",
        "Any form of duping is not allowed",
      ],
      breakdowns: [
        "Griefing and stealing are allowed",
        "Naked killing is allowed",
        "Trapping is allowed",
        "Netherite gear is allowed",
      ],
    },
    {
      category: "General Rules",
      icon: "📜",
      items: [
        "No spamming or flooding",
        "Be respectful / no harassment",
        "Do not share private info",
        "No advertising or promotions",
        "No racism, discrimination, or hate speech",
        "No threats or violence",
        "Use appropriate language",
        "Don't excessively ping staff or members",
        "Follow staff instructions",
      ],
    },
    {
      category: "Discord Rules",
      icon: "💬",
      items: [
        "No NSFW or inappropriate content (Instant ban)",
        "Don't bypass bans or punishments",
        "Stay on-topic in channels",
        "No impersonation of staff or others",
        "Don't DM without consent",
        "Use appropriate usernames/avatars",
        "No harmful links or malware",
        "Keep voice channels clean",
        "No ban evasion",
      ],
    },
  ];

  const gradientAnimation = {
    initial: { backgroundPosition: "0% 0%" },
    animate: { backgroundPosition: "100% 100%" },
    transition: { duration: 15, repeat: Infinity, ease: "linear" },
  };

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

  const scrollItems = [
    "FOLLOW THE RULES",
    "RESPECT STAFF",
    "NO CHEATING",
    "HAVE FUN",
    "BE CREATIVE",
    "NO HACKING",
    "PLAY FAIR",
    "ENJOY YOUR TIME",
  ];

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-16 sm:py-24 w-full"
      aria-label="Server Rules"
    >
      {/* Background elements */}
      <motion.div
        className="absolute inset-0 z-0 opacity-90"
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
      <div className="absolute inset-0 bg-gray-900/90 z-1" />

      {/* Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-2">
        {[...Array(30)].map((_, i) => (
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

      {/* Scrolling banner - Replaced any potential links with divs */}
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
              SERVER RULES
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
            className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto"
          >
            These rules may get you a 1-day ban or a permanent ban depending on
            severity
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {rules.map((rule, index) => (
            <motion.div
              key={rule.category}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + index * 0.1 }}
              whileHover={{
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(236, 72, 153, 0.3)",
              }}
              className="relative overflow-hidden rounded-xl border border-gray-700 bg-gray-800/50 backdrop-blur-md p-6"
            >
              <motion.div
                className="flex items-center mb-6 pb-4 border-b border-gray-700"
                initial={{ x: -20 }}
                animate={isInView ? { x: 0 } : {}}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <motion.span
                  className="text-3xl mr-3"
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 5,
                  }}
                >
                  {rule.icon}
                </motion.span>
                <h3 className="text-2xl font-bold text-white">
                  {rule.category}
                </h3>
              </motion.div>

              <ul className="space-y-3 mb-6">
                {rule.items.map((item, i) => (
                  <motion.li
                    key={item}
                    className="flex items-start"
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + index * 0.1 + i * 0.05 }}
                  >
                    <motion.span
                      className="text-pink-400 mr-2 mt-1"
                      animate={{
                        rotate: [0, 20, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 3 + i,
                      }}
                    >
                      ◆
                    </motion.span>
                    <span className="text-gray-300">{item}</span>
                  </motion.li>
                ))}
              </ul>

              {rule.breakdowns && (
                <>
                  <motion.div
                    className="w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent my-4"
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : {}}
                    transition={{ delay: 0.8 + index * 0.1 }}
                  />
                  <h4 className="text-purple-300 font-medium mb-3">
                    Breakdowns
                  </h4>
                  <ul className="space-y-2">
                    {rule.breakdowns.map((item, i) => (
                      <li
                        key={item}
                        className="flex items-start text-gray-400 text-sm"
                      >
                        <span className="text-emerald-400 mr-2">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2 }}
          className="mt-16 bg-gradient-to-br from-pink-900/50 to-purple-900/50 rounded-xl p-6 border border-pink-500/30 backdrop-blur-lg"
        >
          <div className="flex items-start">
            <motion.div
              className="text-3xl mr-4 text-yellow-400"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
            >
              ⚠️
            </motion.div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">
                Rule Violation Consequences
              </h3>
              <p className="text-gray-300">
                Breaking these rules may result in temporary or permanent bans
                depending on severity. Staff decisions are final. Repeated
                offenses will lead to harsher punishments.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
