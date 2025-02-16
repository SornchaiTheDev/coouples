import type { AvatarConfig } from "react-nice-avatar";

export interface Game {
  status: string;
  players: AvatarConfig[];
  score: number;
}

export interface GameWebSocketMessage {
  status: string;
  players: string[];
  score: number;
}
