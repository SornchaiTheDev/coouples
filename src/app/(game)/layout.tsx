import GameProvider from "@/providers/GameProvider";

export default function GameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <GameProvider>{children}</GameProvider>;
}
