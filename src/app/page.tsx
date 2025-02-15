"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleCreateRoom = () => {
    router.push("/create");
  };

  const handleJoinRoom = () => {
    router.push("/join");
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-4 p-10">
      <h2 className="text-secondary text-xl font-semibold mb-4">Coouple</h2>
      <button
        onClick={handleCreateRoom}
        className="text-xl border border-secondary text-secondary rounded-lg py-3 px-2 w-full hover:bg-secondary hover:text-primary"
      >
        สร้างห้อง
      </button>
      <button
        onClick={handleJoinRoom}
        className="text-xl border border-secondary text-secondary rounded-lg py-3 px-2 w-full hover:bg-secondary hover:text-primary"
      >
        เข้าร่วมห้อง
      </button>
    </div>
  );
}
