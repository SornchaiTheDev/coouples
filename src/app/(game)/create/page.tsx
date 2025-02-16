"use client";
import { api } from "@/lib/api";
import { useGameContext } from "@/providers/GameProvider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function CreatePage() {
  const [isCreating, setIsCreating] = useState(true);
  const [players, setPlayers] = useState(0);
  const isRoomFull = players === 2;

  const { onEvent, sendEvent, roomCode, setRoomCode } = useGameContext();

  const router = useRouter();

  useEffect(() => {
    onEvent("player_joined", () => setPlayers((prev) => prev + 1));

    onEvent("setup_phase", () => {
      router.push("/avatar");
    });

    onEvent("player_left", () => setPlayers((prev) => prev - 1));
  }, [onEvent, router]);

  useEffect(() => {
    const createRoom = async () => {
      setIsCreating(true);
      try {
        const res = await api.post<{ code: string }>("/create");
        setRoomCode(res.data.code);
      } finally {
        setIsCreating(false);
      }
    };
    createRoom();
  }, [setRoomCode]);

  const startGame = () => sendEvent("start");

  return (
    <div className="flex flex-col h-screen justify-center items-center text-secondary gap-4">
      {isCreating && <h4 className="text-lg">กำลังสร้างห้องของคุณ...</h4>}
      {!isCreating && (
        <>
          <h4 className="text-lg">เลขห้องของคุณ</h4>
          <h3 className="text-4xl">{roomCode}</h3>

          <h5 className="text-lg">ผู้เข้าร่วม</h5>
          <h4>{players}/2</h4>
        </>
      )}
      {isRoomFull && (
        <button
          onClick={startGame}
          className="py-2 px-4 rounded-lg border border-secondary hover:bg-secondary hover:text-primary transition-colors mt-4"
        >
          ไปเล่นกันเลย
        </button>
      )}
    </div>
  );
}

export default CreatePage;
