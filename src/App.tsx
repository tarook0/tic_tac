import React from "react";
import Board from "./game/components/Board";
import { useGameStore } from "./game/useGameStore";

export default function Game() {
  // Typing the state variables from the store
  const history = useGameStore((state) => state.history);
  const setHistory = useGameStore((state) => state.setHistory);
  const currentMove = useGameStore((state) => state.currentMove);
  const setCurrentMove = useGameStore((state) => state.setCurrentMove);

  // Derived state
  const xIsNext: boolean = currentMove % 2 === 0;
  const currentSquares: (string | null)[] = history[currentMove];

  // Typing the `handlePlay` function
  function handlePlay(nextSquares: (string | null)[]): void {
    const nextHistory: (string | null)[][] = [
      ...history.slice(0, currentMove + 1),
      nextSquares,
    ];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  // Typing the `jumpTo` function
  function jumpTo(nextMove: number): void {
    setCurrentMove(nextMove);
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        fontFamily: "monospace",
        width: "100vw",
        height: "100vh",
        padding: "1rem",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div
        style={{
          marginLeft: "1rem",
          width: "200px",
          overflowY: "auto",
        }}
      >
        <ol>
          {history.map((_, historyIndex: number) => {
            const description: string =
              historyIndex > 0
                ? `Go to move #${historyIndex}`
                : "Go to game start";

            return (
              <li key={historyIndex}>
                <button onClick={() => jumpTo(historyIndex)}>
                  {description}
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}