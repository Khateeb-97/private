import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart } from 'lucide-react';

export default function App() {
  const [accepted, setAccepted] = useState(false);
  const [noCount, setNoCount] = useState(0);
  const [hasMoved, setHasMoved] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Funny messages
  const phrases = [
    "No", "Are you sure?", "Really sure?", "Pookie please 🥺",
    "Don't do this!", "I'm gonna cry...", "Heartbreaker! 💔",
    "Last chance!", "Stop it!", "SAY YES! ❤️"
  ];

  const handleNoClick = () => {
    // Determine button dimensions (approx)
    const btnWidth = 150; 
    const btnHeight = 50;

    // Calculate available space
    // We assume the button is inside the full-screen relative container
    const maxWidth = window.innerWidth - btnWidth - 20; // 20px padding
    const maxHeight = window.innerHeight - btnHeight - 20;

    // Generate random coordinates within SAFE bounds
    // We use absolute coordinates relative to the screen
    const newX = Math.floor(Math.random() * maxWidth);
    const newY = Math.floor(Math.random() * maxHeight);

    setPosition({ x: newX, y: newY });
    setHasMoved(true);
    setNoCount(noCount + 1);
  };

  const handleYesClick = () => {
    setAccepted(true);
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
    const random = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);
      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: random(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: random(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  return (
    // Main Container must be relative and full screen for absolute positioning to work
    <div className="relative flex flex-col items-center justify-center w-full h-screen overflow-hidden text-center selection:bg-rose-200 bg-romantic-100">
      <AnimatePresence mode="wait">
        {!accepted ? (
          <motion.div 
            key="proposal"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="flex flex-col items-center gap-8 z-10"
          >
            <motion.img 
              src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbDxpZW14b2U2c3BiMndvbGd5Ymx4aHZucjI0dm9rd2l0eHpjMTh6ZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/cLS1cfxvGOPVpf9g3y/giphy.gif" 
              alt="Cute bear" 
              className="w-48 h-48 object-contain drop-shadow-xl"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />

            <h1 className="text-4xl md:text-6xl font-bold text-romantic-600 tracking-tight drop-shadow-sm px-4">
              Will you be my Valentine Adaa?
            </h1>
            
            <div className="flex items-center justify-center gap-4 w-full">
              {/* YES BUTTON */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleYesClick}
                className="px-8 py-4 bg-romantic-500 hover:bg-romantic-600 text-white text-2xl font-bold rounded-2xl shadow-lg transition-all z-20"
              >
                Yes! 💖
              </motion.button>

              {/* NO BUTTON */}
              <motion.button
                onMouseEnter={handleNoClick}
                onClick={handleNoClick}
                // If it hasn't moved, it sits in the flex flow. 
                // Once it moves, it becomes 'absolute' and follows x/y coordinates.
                style={ hasMoved ? {
                  position: 'absolute',
                  top: 0,
                  left: 0,
                } : {}}
                animate={ hasMoved ? {
                  x: position.x,
                  y: position.y,
                } : {}}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="px-8 py-4 bg-gray-200 text-gray-600 text-xl font-medium rounded-2xl whitespace-nowrap min-w-[150px]"
              >
                {phrases[Math.min(noCount, phrases.length - 1)]}
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="success"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-6 p-4"
          >
            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 0.5 }}>
               <Heart className="w-32 h-32 text-romantic-500 fill-current" />
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-romantic-600">
              YAYYY! I Love You!
            </h1>
            <p className="text-xl text-gray-700 mt-4 max-w-md">
              (I knew you wouldn't say no 😉)<br/>
              Pick you up tomorrow?🍝
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
