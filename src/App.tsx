import Game from "./game/Game";
import Menu from "./game/Menu";
import { useGameStore } from "./game/useGameStore";

export default function App() {
  const gameStatus = useGameStore((state) => state.gameStatus);

  return (
    <>
      {gameStatus === "menu" ? (
        <Menu />
      ) : (
        <Game />
      )}
    </>
  );
}