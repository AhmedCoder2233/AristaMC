"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FaCheckCircle, FaExclamationTriangle, FaTimes } from "react-icons/fa";

interface NotificationProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

export function Notification({ message, type, onClose }: NotificationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className={`fixed bottom-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
        type === "success" ? "bg-green-500" : "bg-red-500"
      } text-white max-w-md`}
    >
      <div className="flex items-start">
        <div className="mr-3 mt-0.5">
          {type === "success" ? (
            <FaCheckCircle className="text-xl" />
          ) : (
            <FaExclamationTriangle className="text-xl" />
          )}
        </div>
        <div className="flex-1">
          <p className="font-medium">
            {type === "success" ? "Success" : "Error"}
          </p>
          <p className="text-sm">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="ml-4 text-white hover:text-gray-200"
        >
          <FaTimes />
        </button>
      </div>
    </motion.div>
  );
}
