"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface StaffMember {
  name: string;
  role: string;
  skin: string; // Path to Minecraft skin image
}

export default function StaffSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false });
  const controls = useAnimation();
  const [animated, setAnimated] = useState(false);

  // Staff data
  const staffMembers: StaffMember[] = [
    {
      name: "Coolyb",
      role: "Founder",
      skin: "/skin1.webp",
    },
    {
      name: "Chickfil'a",
      role: "Founder",
      skin: "/skin2.png",
    },
    {
      name: "Wick",
      role: "Lead-Developer",
      skin: "/skin3.png",
    },
    {
      name: "Sebastiaan",
      role: "Lead-Developer",
      skin: "/skin4.webp",
    },
    {
      name: "Canon",
      role: "Manager",
      skin: "/skin5.webp",
    },
    {
      name: "Notalex",
      role: "Manager",
      skin: "/skin6.png",
    },
    {
      name: "TryH4rder_",
      role: "Helper",
      skin: "/skin7.png",
    },
    {
      name: "Ysgamer",
      role: "Helper",
      skin: "/skin8.webp",
    },
  ];

  // Gradient animation
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

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-16 sm:py-24 w-full"
      aria-label="Our Staff Team"
    >
      {/* Gradient Background */}
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

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gray-900/90 z-1" />

      {/* Floating particles */}
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

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Title */}
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
              MEET OUR STAFF
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
            className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Our dedicated team works hard to provide the best Minecraft
            experience
          </motion.p>
        </motion.div>

        {/* Staff Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {staffMembers.map((staff, index) => (
            <motion.div
              key={staff.name}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + index * 0.1 }}
              whileHover={{
                y: -10,
                scale: 1.03,
                boxShadow:
                  "0 20px 25px -5px rgba(236, 72, 153, 0.3), 0 10px 10px -5px rgba(236, 72, 153, 0.1)",
              }}
              className="relative overflow-hidden rounded-xl border border-gray-700 bg-gray-800/50 backdrop-blur-md p-6 flex flex-col items-center text-center"
            >
              {/* 3D Rotating Minecraft Character */}
              <motion.div
                className="relative w-32 h-32 mb-6"
                animate={{
                  rotateY: 360,
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                <motion.div
                  className="absolute inset-0"
                  style={{
                    transform: "translateZ(20px)",
                  }}
                >
                  <Image
                    src={staff.skin}
                    alt={`${staff.name}'s Minecraft skin`}
                    width={128}
                    height={128}
                    className="w-full h-full object-contain"
                  />
                </motion.div>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-purple-600/20 rounded-full"
                  style={{
                    transform: "translateZ(-20px)",
                  }}
                  animate={{
                    rotateZ: 360,
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>

              {/* Staff Info */}
              <motion.h3
                className="text-xl font-bold text-white mb-1"
                whileHover={{ scale: 1.05 }}
              >
                {staff.name}
              </motion.h3>
              <motion.p
                className="text-purple-300 font-medium mb-3"
                whileHover={{ scale: 1.02 }}
              >
                {staff.role}
              </motion.p>
              <motion.div
                className="w-full h-px bg-gradient-to-r from-transparent via-pink-500 to-transparent my-3"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ delay: 0.4 + index * 0.1 }}
              />

              {/* Social Links (example) */}
              <div className="flex justify-center space-x-3 mt-3">
                <motion.a
                  href="#"
                  className="text-gray-300 hover:text-pink-400 transition-colors"
                  whileHover={{ y: -3 }}
                  aria-label={`Message ${staff.name}`}
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                  </svg>
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Join Team CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2 }}
          className="mt-20 text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            WANT TO JOIN OUR TEAM?
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            We're always looking for passionate Minecraft players to join our
            staff!
          </p>
          <motion.a
            href="https://discord.gg/GWMkFmBRt6"
            className="inline-block bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold py-3 px-8 rounded-lg transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Apply to join our staff team"
          >
            APPLY NOW
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
