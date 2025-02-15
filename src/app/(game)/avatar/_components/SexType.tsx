"use client";
import { Mars, Venus } from "lucide-react";
import { cn } from "@/lib/cn";
import { useCloset } from "@/providers/ClosetProvider";

function SexType() {
  const {
    config: { sex },
    handleChange,
  } = useCloset();

  return (
    <div className="flex gap-6 items-center">
      <div>
        <button
          onClick={() => handleChange("sex", "man")}
          className={cn(
            "rounded  border-2 border-transparent p-2 text-secondary",
            sex === "man" &&
              "bg-secondary border-2 border-secondary text-blue-300",
          )}
        >
          <Mars />
        </button>
        <h6 className="text-center mt-1 text-secondary">ผู้ชาย</h6>
      </div>
      <div>
        <button
          onClick={() => handleChange("sex", "woman")}
          className={cn(
            "rounded  border-2 border-transparent p-2 text-secondary",
            sex === "woman" &&
              "bg-secondary border-2 border-secondary text-pink-300",
          )}
        >
          <Venus />
        </button>
        <h6 className="text-center mt-1 text-secondary">ผู้หญิง</h6>
      </div>
    </div>
  );
}

export default SexType;
