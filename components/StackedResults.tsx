"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowRight, MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const StackedResults = ({ items, title = "Real Results, Real Money", label = "Case Studies" }: any) => {
  const [cards, setCards] = useState(items || []);

  const moveToNext = () => {
    setCards((prev: any) => {
      if (prev.length <= 1) return prev;
      const newCards = [...prev];
      const firstCard = newCards.shift();
      newCards.push(firstCard);
      return newCards;
    });
  };

  const moveToPrev = () => {
    setCards((prev: any) => {
      if (prev.length <= 1) return prev;
      const newCards = [...prev];
      const lastCard = newCards.pop();
      newCards.unshift(lastCard);
      return newCards;
    });
  };

  if (!cards || cards.length === 0) return null;

  const topCard = cards[0];

  return (
    <section className="relative -mt-[1px] py-16 md:py-20 px-6  border-none z-10 w-full">
      {/* Background Lighting */}
      {/* Top fade removed for glow bleed */}
      <div className="absolute top-[20%] left-[-10%] w-[50%] h-[50%] bg-white/5 blur-[140px] rounded-full pointer-events-none z-0" />
      <div className="absolute top-1/2 right-[-5%] w-[40%] h-[60%] bg-white/5 blur-[120px] rounded-full pointer-events-none z-0" />

      <div className="max-w-3xl mx-auto relative z-30 flex flex-col items-center">
        
        {/* Header - Centered */}
        <div className="mb-10 text-center flex flex-col items-center">
          <p className="text-white text-xs md:text-sm font-semibold tracking-widest uppercase mb-2">{label}</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">{title}</h2>
        </div>

        <div className="w-full flex justify-center">
          <div className="w-full max-w-[600px] flex flex-col items-start gap-8">
            
            {/* Stacked Cards Area */}
            <div className="relative w-full aspect-[4/3] md:h-[360px] md:aspect-auto mb-2 cursor-grab active:cursor-grabbing perspective-1000">
              {cards.map((card: any, index: number) => {
                const isTop = index === 0;

                return (
                  <motion.div
                    key={card._key || index}
                    className="absolute top-0 left-0 w-full h-full rounded-[1.2rem] md:rounded-[1.5rem] overflow-hidden shadow-2xl border border-white/10 bg-[#0A2518]"
                    animate={{
                      scale: 1 - index * 0.05,
                      x: index * 20, // Stack offset to the right
                      y: index * 4,
                      rotate: index * 1.5, // Slight tilt for the book pages effect
                      zIndex: cards.length - index,
                      opacity: index < 4 ? 1 - index * 0.2 : 0, // Show max 4 cards
                    }}
                    transition={{ type: "spring", stiffness: 350, damping: 28 }}
                    drag={isTop ? "x" : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.8}
                    onDragEnd={(e, info) => {
                      if (info.offset.x < -60) {
                        moveToNext(); // Drag Left -> Next
                      } else if (info.offset.x > 60) {
                        moveToPrev(); // Drag Right -> Prev
                      }
                    }}
                    whileHover={isTop ? { scale: 1.01 } : {}}
                    whileTap={isTop ? { scale: 0.98 } : {}}
                  >
                    {card.image ? (
                      <div className="w-full h-full relative group">
                        <Image
                          src={card.image}
                          alt={card.title || card.value || "Result Detail"}
                          fill
                          className="object-cover pointer-events-none transition-opacity duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-tr from-[#050505]/20 to-transparent pointer-events-none mix-blend-overlay" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/40 via-transparent to-transparent pointer-events-none" />
                      </div>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-white/5 text-white/30 font-medium text-sm">
                        No Case Study Image
                      </div>
                    )}
                  </motion.div>
                );
              })}

              {/* Instructions absolute over the right side or bottom */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 hidden md:flex items-center gap-3 text-white/40 text-[10px] uppercase tracking-widest font-bold opacity-0 animate-pulse">
                <span>Swipe Left for Next</span>
                <MoveRight className="w-3 h-3" />
              </div>
            </div>

            {/* Dynamic Text Content Below */}
            <div className="w-full min-h-[160px] pl-4 border-l border-white/10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={topCard._key || topCard.title || "content"}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="w-full flex flex-col items-start pt-1"
                >
                  {/* Left-Aligned Identity */}
                  {(topCard.clientAvatar || topCard.clientName) && (
                    <div className="flex items-center gap-3 mb-3">
                      {topCard.clientAvatar && (
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden relative border border-white/20">
                          <Image
                            src={topCard.clientAvatar}
                            alt={topCard.clientName || "Client"}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      {topCard.clientName && (
                        <span className="text-white/80 font-semibold text-base tracking-tight">{topCard.clientName}</span>
                      )}
                    </div>
                  )}

                  {/* Medium Value / Title */}
                  <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-3 leading-tight">
                    {topCard.title || topCard.value}
                  </h3>
                  
                  {/* Description Paragraph */}
                  <p className="text-white/50 text-sm md:text-base leading-relaxed mb-6 max-w-2xl">
                    {topCard.description || topCard.label}
                  </p>

                  {/* Action Link */}
                  <button 
                    onClick={moveToNext}
                    className="group flex items-center gap-2 text-white font-medium tracking-wide text-sm transition-colors"
                  >
                    <div className="w-6 h-6 rounded-full bg-white text-black flex items-center justify-center group-hover:bg-white/90 group-hover:scale-110 transition-all">
                      <ArrowRight className="w-3 h-3 text-[#05180D] stroke-[3]" />
                    </div>
                    <span className="group-hover:text-white/80 transition-colors">See Next Result</span>
                  </button>
                </motion.div>
              </AnimatePresence>
            </div>
            
          </div>
        </div>

      </div>

      {/* Bottom Mask */}
      {/* Bottom fade removed for glow bleed */}
    </section>
  );
};
