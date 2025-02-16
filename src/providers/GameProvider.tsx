"use client";
import { Game, GameWebSocketMessage } from "@/types/Game";
import { WebSocketMessage } from "@/types/WebSocketMessage";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface IGameContext {
  roomCode: string;
  setRoomCode: (roomCode: string) => void;
  onEvent: (event: string, callback: (data: unknown) => void) => void;
  sendEvent: (event: string, payload?: string) => void;
  leaveRoom: () => void;
  isGameStarted: boolean;
  choices: string[];
  gameDetail: Game | null;
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

  const [subscribers, setSubscribers] = useState<
    Record<string, (data: string) => void>
  >({});

  const onEvent = useCallback(
    (event: string, callback: (data: unknown) => void) =>
      setSubscribers((prev) => {
        if (prev[event]) {
          return prev;
        }

        return { ...prev, [event]: callback };
      }),
    [],
  );

  useEffect(() => {
    if (ws === null) return;

    ws.onmessage = function (e) {
      const { type, data } = JSON.parse(e.data) as WebSocketMessage;
      Object.keys(subscribers).forEach((key) => {
        if (type === key) {
          subscribers[key](data);
        }
      });
    };
  }, [ws, subscribers]);

  const sendEvent = useCallback(
    (event: string, payload?: string) => {
      if (ws === null) return;
      ws.send(JSON.stringify({ type: event, data: payload }));
    },
    [ws],
  );

  const leaveRoom = () => {
    if (ws === null) return;
    ws.close(1000, "Closing normally");
  };

  const [isGameStarted, setIsGameStarted] = useState(false);
  const [choices, setChoices] = useState<string[]>([]);

  useEffect(() => {
    onEvent("game_started", () => {
      setIsGameStarted(true);
    });

    onEvent("shuffling", (data) => {
      const _choices = (data as number[]).map((choice) =>
        String.fromCodePoint(choice),
      );

      setChoices(_choices);
    });
  }, [onEvent]);

  const [gameDetail, setGameDetail] = useState<Game | null>(null);

  useEffect(() => {
    onEvent("game_detail", (data) => {
      const game: Game = {
        ...(data as GameWebSocketMessage),
        players: (data as GameWebSocketMessage).players.map((player) =>
          JSON.parse(player),
        ),
      };

      setGameDetail(game);
    });
  }, [onEvent, sendEvent]);

  return (
    <GameContext.Provider
      value={{
        onEvent,
        sendEvent,
        roomCode,
        setRoomCode,
        leaveRoom,
        isGameStarted,
        choices,
        gameDetail,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export default GameProvider;
