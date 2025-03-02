import { useGameStore } from "../useGameStore";
import { calculateStatus, calculateTurns, calculateWinner } from "../utils";
import Square from "./Square";

// Define the types for the props
interface BoardProps {
  xIsNext: boolean; // Indicates whether it's X's turn
  squares: (string | null)[]; // Array of square values (either "X", "O", or null)
  onPlay: (nextSquares: (string | null)[]) => void; // Callback function for handling a play
}

export default function Board({ xIsNext, squares, onPlay }: BoardProps) {
  const selectedGameType = useGameStore((state) => state.selectedGameType);
  const setSelectedGameType = useGameStore(
    (state) => state.setSelectedGameType
  );
  // Typing the derived state
  const winner: string | null = calculateWinner(squares);
  const turns: number = calculateTurns(squares);
  const player: string = xIsNext ? "X" : "O"; // Current player ("X" or "O")
  const status: string = calculateStatus(winner, turns, player);

  // Typing the `handleClick` function
  function handleClick(i: number): void {
    // If the square is already filled or there's a winner, do nothing
    if (squares[i] || winner) return;

    // Create a copy of the squares array and update the clicked square
    const nextSquares: (string | null)[] = squares.slice();
    nextSquares[i] = player;

    // Call the `onPlay` callback with the updated squares
    onPlay(nextSquares);
  }
  console.log(squares);

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: "10rem" }}>
        {/* Game Mode Selector */}
        <div style={{ marginBottom: "1rem" }}>
          <label>
            <input
              type="radio"
              checked={selectedGameType === "singlePlayer"}
              onChange={() => setSelectedGameType("singlePlayer")}
            />
            Single Player
          </label>
          <label style={{ margin: "1rem" }}>
            <input
              type="radio"
              checked={selectedGameType === "multiPlayer"}
              onChange={() => setSelectedGameType("multiPlayer")}
            />
            Multi Player
          </label>
        </div>

        {/* Status Display */}
        <div style={{ width: "100%", margin: "0.5rem" }}>{status}</div>
      </div>{" "}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gridTemplateRows: "repeat(3, 1fr)",
          width: "80%",
          height: "100% ",
          border: "1px solid #999",
        }}
      >
        {squares.map((_, i: number) => (
          <Square
            key={`square-${i}`}
            value={squares[i]}
            onSquareClick={() => handleClick(i)}
          />
        ))}
      </div>
    </>
  );
}
