"use client";
import { useGameContext } from "@/providers/GameProvider";
import Footer from "./_components/Footer";
import { useEffect, useState } from "react";

function GamePage() {
  const { sendEvent, isGameStarted, choices } = useGameContext();
  const [isWaiting, setIsWaiting] = useState(false);

  const handlePick = (card: string) => {
    sendEvent("pick", card);
    setIsWaiting(true);
  };

  useEffect(() => {
    setIsWaiting(false);
  }, [choices]);

  if (!isGameStarted) {
    return (
      <div className="flex flex-col h-screen justify-center items-center">
        <h3 className="text-secondary text-lg font-semibold">
          รอเค้าแต่งตัวแปปนึงน้า
        </h3>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {isWaiting && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center">
          <h3 className="text-xl text-secondary">
            รอเค้าก่อนน้า เค้ากำลังเลือกเลย
          </h3>
        </div>
      )}
      <div className="p-8 flex-1">
        <h3 className="text-secondary text-center text-lg">
          เลือกคำตอบที่เธอคิดว่า อีกคนจะตอบได้เลย
        </h3>
        <div className="grid grid-cols-12 gap-4 mt-10">
          {choices.map((choice, index) => (
            <button
              key={index}
              onClick={() => handlePick(String(index + 1))}
              className="rounded-lg border-2 border-secondary flex justify-center items-center text-2xl col-span-6 h-64 text-secondary hover:bg-secondary hover:text-background"
            >
              {choice}
            </button>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default GamePage;
