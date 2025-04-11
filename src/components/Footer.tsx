"use client";

import Image from "next/image";

export default function SimpleFooter() {
  return (
    <footer className="bg-gray-900 py-6 border-t border-gray-800">
      <div className="container mx-auto px-4 flex flex-col items-center">
        <div className="flex items-center justify-center mb-2">
          <Image
            src="/headlogo.png"
            alt="AristaMC Logo"
            width={40}
            height={40}
            className="w-10 h-10 mr-3"
          />
          <span className="text-xl font-bold text-white">AristaMC S1</span>
        </div>
        <p className="text-gray-400 text-sm">
          © {new Date().getFullYear()} All rights reserved
        </p>
      </div>
    </footer>
  );
}
