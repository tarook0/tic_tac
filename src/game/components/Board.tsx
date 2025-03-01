import { calculateStatus, calculateTurns, calculateWinner } from "../utils";
import Square from "./Square";

export default function Board({ xIsNext, squares, onPlay }) {
    const winner = calculateWinner(squares);
    const turns = calculateTurns(squares);
    const player = xIsNext ? "X" : "O";
    const status = calculateStatus(winner, turns, player);
  
    function handleClick(i) {
      if (squares[i] || winner) return;
      const nextSquares = squares.slice();
      nextSquares[i] = player;
      onPlay(nextSquares);
    }
  
    return (
      <>
        <div style={{ width: "20%", margin: "0.5rem" }}>{status}</div>
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
          {squares.map((_, i) => (
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
  