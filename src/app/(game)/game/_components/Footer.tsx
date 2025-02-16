"use client";
import { useGameContext } from "@/providers/GameProvider";
import Profile from "./Profile";

function Footer() {
  const { gameDetail } = useGameContext();

  return (
    <div className="w-full h-24 rounded-t-xl bg-secondary px-2 flex items-center justify-between z-20">
      {gameDetail !== null && (
        <>
          <Profile config={gameDetail.players[0]} className="w-14 h-14" />
          <h3 className="text-2xl">- {gameDetail.score} -</h3>
          <Profile config={gameDetail.players[1]} className="w-14 h-14" />
        </>
      )}
    </div>
  );
}

export default Footer;
