"use client";
import { useCloset } from "@/providers/ClosetProvider";
import Avatar from "./_components/Avatar";
import Closet from "./_components/Closet";
import SexType from "./_components/SexType";
import { useRouter } from "next/navigation";
import { useGameContext } from "@/providers/GameProvider";

export default function Home() {
  const { config } = useCloset();
  const { sendEvent } = useGameContext();

  const router = useRouter();

  const handleNext = () => {
    sendEvent("create_avatar", JSON.stringify(config));
    router.push("/game");
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4">
        <div className="flex justify-between items-center">
          <div>
            <h6 className="text-secondary underline">ขั้นตอนที่ 1</h6>
            <h3 className="text-lg text-secondary">
              มาเริ่มสร้างตัวละครของเธอกัน !
            </h3>
          </div>
          <button
            onClick={handleNext}
            className="border-2 bg-secondary text-background border-secondary w-fit h-fit px-3 py-1 rounded"
          >
            ต่อไป
          </button>
        </div>
      </div>
      <div className="flex flex-col flex-1 min-h-0 items-center mt-10 gap-6">
        <Avatar className="w-1/2 aspect-square border-4 border-secondary" />
        <SexType />
        <Closet />
      </div>
    </div>
  );
}
