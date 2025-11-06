import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ForgiveMePopup: React.FC = () => {
  const [forgiven, setForgiven] = useState(false);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });

  const handleYes = () => setForgiven(true);

  const moveNoButton = () => {
    const randomX = Math.random() * 400 - 200;
    const randomY = Math.random() * 300 - 150;
    setNoPos({ x: randomX, y: randomY });
  };

  // generate 30 floating hearts
  const hearts = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    emoji: ["💖", "💕", "💞", "💗", "💘"][Math.floor(Math.random() * 5)],
    x: Math.random() * window.innerWidth - 100,
    delay: Math.random() * 5,
    size: Math.random() * 1.5 + 0.8,
    duration: 6 + Math.random() * 5,
  }));

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-b from-pink-100 to-pink-200 overflow-hidden">
      {/* floating hearts */}
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute text-3xl"
          initial={{
            x: heart.x,
            y: window.innerHeight + 100,
            opacity: 0,
            scale: heart.size,
          }}
          animate={{
            y: -120,
            opacity: [0, 1, 0],
            rotate: [0, 15, -15, 0],
          }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            delay: heart.delay,
            ease: "easeInOut",
          }}
        >
          {heart.emoji}
        </motion.div>
      ))}

      <AnimatePresence>
        {!forgiven ? (
          <motion.div
            key="popup"
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.7, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="bg-white p-6 rounded-3xl shadow-xl text-center border-4 border-pink-200 w-[320px] z-10"
          >
            <motion.img
              src="/sadcat.jpg" // 👈 replace this with your cat image path
              alt="Sad Cat"
              className="w-32 h-32 mx-auto rounded-lg mb-4"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />

            <motion.h2
              className="text-2xl font-semibold text-pink-600 mb-6"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Will you forgive me?
            </motion.h2>

            <div className="flex justify-center gap-6 relative">
              <motion.button
                whileHover={{
                  scale: 1.1,
                  boxShadow: "0px 0px 10px #f9a8d4",
                }}
                whileTap={{ scale: 0.9 }}
                onClick={handleYes}
                className="bg-pink-400 hover:bg-pink-500 text-white px-6 py-2 rounded-full font-medium shadow"
              >
                Yes 💗
              </motion.button>

              <motion.button
                animate={{ x: noPos.x, y: noPos.y }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                onMouseEnter={moveNoButton}
                className="bg-gray-300 text-gray-600 px-6 py-2 rounded-full font-medium shadow cursor-pointer select-none"
              >
                No 😿
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="thanks"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center z-10"
          >
            <motion.h2
              className="text-3xl font-bold text-pink-600 mb-3"
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              Yay! 💕
            </motion.h2>
            <motion.p
              className="text-pink-500 text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Thank you for forgiving me 😭💗
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ForgiveMePopup;
