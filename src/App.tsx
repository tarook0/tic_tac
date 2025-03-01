import Board from "./game/components/Board";
import { useGameStore } from "./game/useGameStore";


export default function Game() {
  const history = useGameStore((state) => state.history);
  const setHistory = useGameStore((state) => state.setHistory);
  const currentMove = useGameStore((state) => state.currentMove);
  const setCurrentMove = useGameStore((state) => state.setCurrentMove);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
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
          {history.map((_, historyIndex) => {
            const description =
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

