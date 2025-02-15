"use client";

import { cn } from "@/lib/cn";
import { useState } from "react";
import AvatarItem from "./AvatarItem";
import { AvatarConfigNoBoolean, closetConfigs } from "@/configs/closet";
import { useCloset } from "@/providers/ClosetProvider";

interface ConfigType {
  key: keyof AvatarConfigNoBoolean;
  value: string;
}

const type: ConfigType[] = [
  {
    key: "faceColor",
    value: "สี",
  },
  {
    key: "earSize",
    value: "ขนาดหู",
  },
  {
    key: "hairColor",
    value: "สีผม",
  },
  {
    key: "hairStyle",
    value: "ทรงผม",
  },
  {
    key: "hatStyle",
    value: "หมวก",
  },
  { key: "hatColor", value: "สีหมวก" },
  { key: "eyeStyle", value: "ตา" },
  { key: "glassesStyle", value: "แว่นตา" },
  { key: "noseStyle", value: "จมูก" },
  { key: "mouthStyle", value: "ปาก" },
  { key: "shirtStyle", value: "เสื้อ" },
  { key: "shirtColor", value: "สีเสื้อ" },
];

function Closet() {
  const [selectedKey, setSelectedKey] =
    useState<keyof AvatarConfigNoBoolean>("faceColor");

  const { handleChange, config } = useCloset();

  return (
    <div className="w-full flex-1 flex flex-col bg-white rounded-t-2xl overflow-hidden">
      <div className="px-2 pt-3 border-b bg-white flex gap-4 overflow-x-auto">
        {type.map(({ key, value }) => (
          <button
            key={value}
            onClick={() => setSelectedKey(key)}
            className={cn(
              "p-2 border-b-4 border-transparent shrink-0 transition-colors duration-200 hover:border-background",
              selectedKey === key && "text-background border-background",
            )}
          >
            {value}
          </button>
        ))}
      </div>
      <div className="flex-1 overflow-y-auto p-4 grid grid-cols-12 gap-4">
        {closetConfigs[selectedKey]?.map((value) => (
          <button
            key={value}
            onClick={() => handleChange(selectedKey, value)}
            className={cn(
              "p-4 rounded-md w-fit h-fit col-span-3 border-2 border-transparent hover:border-background transition-colors duration-200",
              config[selectedKey] === value && "border-background",
            )}
          >
            <AvatarItem type={selectedKey} {...{ value }} />
          </button>
        ))}
      </div>
    </div>
  );
}

export default Closet;
