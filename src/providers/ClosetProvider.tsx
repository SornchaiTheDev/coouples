"use client";
import { createContext, useContext, useState } from "react";
import { AvatarConfig } from "react-nice-avatar";

interface ClosetContext {
  config: AvatarConfig;
  handleChange: <T extends keyof AvatarConfig>(
    key: T,
    value: AvatarConfig[T],
  ) => void;
}

const Context = createContext<ClosetContext | null>(null);

export const useCloset = () => {
  const context = useContext(Context);
  if (context === null) {
    throw new Error("useCloset must be used within a ClosetProvider");
  }
  return context;
};

export default function ClosetProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [config, setConfig] = useState<AvatarConfig>({
    sex: "man",
    faceColor: "pink",
    earSize: "small",
    hairColor: "black",
    hairStyle: "normal",
    hatStyle: "none",
    hatColor: "black",
    eyeStyle: "oval",
    glassesStyle: "none",
    noseStyle: "round",
    mouthStyle: "laugh",
    shirtStyle: "polo",
    shirtColor: "yellow",
    bgColor: "var(--secondary)",
  });

  const handleChange = <T extends keyof AvatarConfig>(
    key: T,
    value: AvatarConfig[T],
  ) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <Context.Provider value={{ config, handleChange }}>
      {children}
    </Context.Provider>
  );
}
