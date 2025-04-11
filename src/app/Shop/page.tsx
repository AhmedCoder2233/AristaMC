"use client";

import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { FaSnowflake, FaShoppingCart, FaCheck } from "react-icons/fa";
import { Notification } from "@/components/Notification";

interface Rank {
  id: number;
  name: string;
  icon: string;
  description: string;
  price: string;
  perks: string[];
}

const ranks: Rank[] = [
  {
    id: 1,
    name: "Nova Rank",
    icon: "🟢",
    description:
      "This rank can be purchased by using in-game money or real-life money.",
    price: "$9.99",
    perks: [
      "Access to Nova-only channels",
      "Special prefix in chat",
      "Exclusive cosmetic items",
      "Daily bonus rewards",
    ],
  },
  {
    id: 2,
    name: "Media Rank",
    icon: "🎥",
    description:
      "Obtained by completing requirements in Media and becoming a Media Advertiser.",
    price: "Free (Complete requirements)",
    perks: [
      "Equivalent to Nova Rank",
      "Special media role",
      "Access to media channels",
      "Promotion opportunities",
    ],
  },
  {
    id: 3,
    name: "Celestial Rank",
    icon: "✨",
    description:
      "This rank can be purchased by using in-game money or real-life money.",
    price: "$19.99",
    perks: [
      "All Nova perks plus",
      "Exclusive celestial cosmetics",
      "Priority support",
      "Monthly mystery box",
    ],
  },
  {
    id: 4,
    name: "Booster Rank",
    icon: "💎",
    description: "Obtained by boosting our Discord server.",
    price: "Free (Discord Boost)",
    perks: [
      "Equivalent to Aristal Rank",
      "Special booster badge",
      "Exclusive booster channels",
      "Monthly rewards",
    ],
  },
  {
    id: 5,
    name: "Aristal Rank",
    icon: "👑",
    description:
      "This rank can be purchased by using in-game money or real-life money.",
    price: "$29.99",
    perks: [
      "All previous perks plus",
      "VIP access to events",
      "Custom nickname color",
      "Personalized welcome",
    ],
  },
];

interface CartItem {
  rank: Rank;
  username: string;
  email: string;
  date: string;
}

export default function ShopSection() {
  const [loading, setLoading] = useState(true);
  const [selectedRank, setSelectedRank] = useState<Rank | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const controls = useAnimation();

  const snowflakes = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    animationDuration: `${10 + Math.random() * 20}s`,
    delay: `${Math.random() * 5}s`,
    size: `${0.5 + Math.random() * 1.5}rem`,
    opacity: 0.5 + Math.random() * 0.5,
  }));

  useEffect(() => {
    const sequence = async () => {
      await controls.start({ opacity: 0, scale: 0.8 });
      await controls.start({
        opacity: 1,
        scale: 1,
        transition: {
          duration: 1.5,
          type: "spring",
          bounce: 0.4,
        },
      });
      setLoading(false);
    };

    sequence();

    const savedCart = localStorage.getItem("aristaCart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, [controls]);

  const showNotification = (message: string, type: "success" | "error") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleViewDetails = (rank: Rank) => {
    setSelectedRank(rank);
  };

  const handleAddToCart = (rank: Rank) => {
    setSelectedRank(rank);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRank) return;

    setProcessing(true);

    try {
      const newCart: CartItem[] = [
        ...cart,
        {
          rank: selectedRank,
          username,
          email,
          date: new Date().toISOString(),
        },
      ];
      setCart(newCart);
      localStorage.setItem("aristaCart", JSON.stringify(newCart));

      const response = await fetch("/api/sendemail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          rank: selectedRank.name,
          price: selectedRank.price,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to send email");
      }

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.error || "Email sending failed");
      }

      setProcessing(false);
      setSuccess(true);
      setTimeout(() => {
        window.location.href = "/payment";
      }, 2000);
    } catch (error) {
      console.error("Error processing order:", error);
      setProcessing(false);
      showNotification(
        `Failed to process your order: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
        "error"
      );
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-pink-900 to-purple-900 overflow-hidden">
      <AnimatePresence>
        {notification && (
          <Notification
            message={notification.message}
            type={notification.type}
            onClose={() => setNotification(null)}
          />
        )}
      </AnimatePresence>

      {snowflakes.map((flake) => (
        <motion.div
          key={flake.id}
          className="absolute text-white z-0 pointer-events-none"
          style={{
            left: flake.left,
            top: "-2rem",
            fontSize: flake.size,
            opacity: flake.opacity,
          }}
          animate={{
            y: ["0%", "100vh"],
            x: [
              `${Math.random() * 100 - 50}px`,
              `${Math.random() * 100 - 50}px`,
            ],
            rotate: [0, Math.random() * 360],
          }}
          transition={{
            duration: parseFloat(flake.animationDuration),
            delay: parseFloat(flake.delay),
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <FaSnowflake />
        </motion.div>
      ))}

      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-80"
          >
            <motion.div
              animate={{
                rotate: 360,
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                },
              }}
              className="w-20 h-20 border-4 border-pink-500 border-t-transparent rounded-full mb-4"
            />
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-4xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400"
            >
              AristaMC S1
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-gray-300 mt-4"
            >
              Loading premium shop experience...
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-300 to-purple-300">
              AristaMC Rank Shop
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Upgrade your experience with exclusive ranks and perks
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {ranks.map((rank) => (
            <motion.div
              key={rank.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="bg-gray-900/50 backdrop-blur-md rounded-xl p-6 border border-pink-500/30 hover:border-pink-500/60 transition-all"
            >
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-3">{rank.icon}</span>
                <h2 className="text-2xl font-bold text-white">{rank.name}</h2>
              </div>
              <p className="text-gray-300 mb-4">{rank.description}</p>
              <p className="text-pink-400 font-bold text-lg mb-6">
                {rank.price}
              </p>

              <div className="flex space-x-3">
                <button
                  onClick={() => handleViewDetails(rank)}
                  className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  View Details
                </button>
                <button
                  onClick={() => handleAddToCart(rank)}
                  className="flex-1 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white py-2 px-4 rounded-lg transition-all flex items-center justify-center"
                >
                  <FaShoppingCart className="mr-2" /> Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedRank && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 p-4"
              onClick={() => setSelectedRank(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 50 }}
                className="bg-gray-900 rounded-xl p-6 max-w-md w-full border border-pink-500/30"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center">
                    <span className="text-3xl mr-3">{selectedRank.icon}</span>
                    <h2 className="text-2xl font-bold text-white">
                      {selectedRank.name}
                    </h2>
                  </div>
                  <button
                    onClick={() => setSelectedRank(null)}
                    className="text-gray-400 hover:text-white"
                  >
                    ✕
                  </button>
                </div>

                <p className="text-gray-300 mb-6">{selectedRank.description}</p>

                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white mb-3">Perks:</h3>
                  <ul className="space-y-2">
                    {selectedRank.perks.map((perk, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-pink-400 mr-2">✓</span>
                        <span className="text-gray-300">{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="text-2xl font-bold text-pink-400 mb-6">
                  {selectedRank.price}
                </p>

                <button
                  onClick={() => {
                    setSelectedRank(null);
                    handleAddToCart(selectedRank);
                  }}
                  className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white py-3 px-6 rounded-lg transition-all flex items-center justify-center"
                >
                  <FaShoppingCart className="mr-2" /> Add to Cart
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 p-4"
              onClick={() => setShowForm(false)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 50 }}
                className="bg-gray-900 rounded-xl p-6 max-w-md w-full border border-pink-500/30"
                onClick={(e) => e.stopPropagation()}
              >
                {!success ? (
                  <>
                    <h2 className="text-2xl font-bold text-white mb-6">
                      Complete Your Purchase
                    </h2>

                    <form onSubmit={handleSubmit}>
                      <div className="mb-4">
                        <label className="block text-gray-300 mb-2">
                          Minecraft Username
                        </label>
                        <input
                          type="text"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                          required
                        />
                      </div>

                      <div className="mb-6">
                        <label className="block text-gray-300 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                          required
                        />
                      </div>

                      <div className="flex space-x-3">
                        <button
                          type="button"
                          onClick={() => setShowForm(false)}
                          className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={processing}
                          className="flex-1 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white py-2 px-4 rounded-lg transition-all flex items-center justify-center"
                        >
                          {processing ? "Processing..." : "Confirm Purchase"}
                        </button>
                      </div>
                    </form>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <FaCheck className="text-green-400 text-3xl" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Purchase Complete!
                    </h3>
                    <p className="text-gray-300 mb-6">
                      Your {selectedRank?.name} has been added to your cart.
                    </p>
                    <p className="text-gray-400 text-sm">
                      Redirecting to payment...
                    </p>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
