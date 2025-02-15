"use client";
import { WebSocketMessage } from "@/types/WebSocketMessage";
import { createContext, useContext, useEffect, useState } from "react";

interface IGameContext {
  roomCode: string;
  setRoomCode: (roomCode: string) => void;
  onEvent: (event: string, callback: () => void) => void;
  sendEvent: (event: string, payload: string) => void;
}

const GameContext = createContext<IGameContext | null>(null);

export const useGameContext = () => {
  const context = useContext(GameContext);

  if (context === null) {
    throw new Error("useGameContext must be used within a GameProvider");
  }

  return context;
};

function GameProvider({ children }: { children: React.ReactNode }) {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [roomCode, setRoomCode] = useState("");

  useEffect(() => {
    if (ws !== null || roomCode === "") return;
    setWs(new WebSocket(process.env.NEXT_PUBLIC_API_URL + "/game/" + roomCode));
  }, [ws, roomCode]);

  const [subscribers, setSubscribers] = useState<Record<string, () => void>>(
    {},
  );

  const onEvent = (event: string, callback: () => void) =>
    setSubscribers((prev) => {
      if (prev[event]) {
        return prev;
      }

      return { ...prev, [event]: callback };
    });

  useEffect(() => {
    if (ws === null) return;

    ws.onmessage = function (e) {
      const data = JSON.parse(e.data) as WebSocketMessage;
      console.log(data);
      Object.keys(subscribers).forEach((key) => {
        if (data.type === key) {
          subscribers[key]();
        }
      });
    };
  }, [ws, subscribers]);

  const sendEvent = (event: string, payload: string) => {
    if (ws === null) return;
    ws.send(JSON.stringify({ type: event, data: payload }));
  };

  return (
    <GameContext.Provider
      value={{
        onEvent,
        sendEvent,
        roomCode,
        setRoomCode,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export default GameProvider;
