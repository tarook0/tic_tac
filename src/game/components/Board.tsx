import styled from "styled-components";
import { calculateStatus, calculateTurns, calculateWinner } from "../utils";
import Square from "./Square";
import Selectore from "./Selectore";

// Define the types for the props
interface BoardProps {
  xIsNext: boolean; // Indicates whether it's X's turn
  squares: (string | null)[]; // Array of square values (either "X", "O", or null)
  onPlay: (nextSquares: (string | null)[]) => void; // Callback function for handling a play
}

const BoardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  width: 100%;
  height: 100%;
  border: 1px solid #999;

  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    width: 100%;
    height: 95%;
    border: 1px solid #999;
  }
`;
const StatusContainer = styled.div`
  display: block;
  background: #7e1e3c;
  width: 100%;
  flex-direction: column;
  gap: 1rem;
  @media (min-width: 768px) {
    display: none;
  }
`;
export default function Board({ xIsNext, squares, onPlay }: BoardProps) {
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
      <Selectore status={status} />
      <BoardContainer>
        {squares.map((_, i: number) => (
          <Square
            key={`square-${i}`}
            value={squares[i]}
            onSquareClick={() => handleClick(i)}
          />
        ))}
      </BoardContainer>
      <StatusContainer>
        {/* Status Display */}
        <div style={{ width: "100%", margin: "0.5rem" }}>{status}</div>
      </StatusContainer>
    </>
  );
}
