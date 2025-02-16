"use client";
import { useGameContext } from "@/providers/GameProvider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function JoinPage() {
  const [players, setPlayers] = useState(1);
  const [room, setRoom] = useState("");
  const isRoomFull = players === 2;

  const { onEvent, setRoomCode } = useGameContext();

  const handleJoin = () => {
    if (room.length !== 6) return;
    setRoomCode(room);
  };

  const router = useRouter();

  useEffect(() => {
    onEvent("player_joined", () => setPlayers((prev) => prev + 1));

    onEvent("setup_phase", () => {
      router.push("/avatar");
    });
  }, [onEvent, router]);

  return (
    <div className="flex flex-col h-screen justify-center items-center text-secondary gap-4">
      {!isRoomFull && (
        <>
          <h4 className="text-lg">กรอกเลขห้อง</h4>
          <input
            placeholder="เลขห้อง"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            maxLength={6}
            inputMode="numeric"
            className="rounded-lg outline-none bg-secondary py-2 px-3 text-zinc-800"
          />
          <button
            onClick={handleJoin}
            disabled={room.length !== 6}
            className="rounded-lg bg-secondary text-background px-4 py-2 w-1/2 hover:bg-white/80 disabled:opacity-50"
          >
            เข้าร่วม
          </button>
        </>
      )}

      {isRoomFull && (
        <>
          <h4 className="text-lg">เลขห้องของคุณ</h4>
          <h3 className="text-4xl">{room}</h3>

          <h5 className="text-lg">ผู้เข้าร่วม</h5>
          <h4>{players}/2</h4>
          <h6>รอเค้ากดเริ่มเกมนะคับ</h6>
        </>
      )}
    </div>
  );
}

export default JoinPage;
