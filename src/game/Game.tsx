import { useEffect } from "react";
import Board from "./components/Board";
import MoveHistory from "./components/MoveHistory";
import { useGameStore } from "./useGameStore";
import { calculateWinner } from "./utils";
import { aiPlay } from "./ai";
import styled from "styled-components";
const AI_PLAYER = "O"; // Define the AI player

// Styled container for the game
const Container = styled.div`
     display: flex;
    flex-direction: row;
    font-family: monospace;
    width: 100vw;
    height: 100vh;
    padding: 1rem;
    box-sizing: border-box;

  @media (max-width: 768px) {
    flex-direction: column; /* Stack vertically on mobile */
    padding: 0rem;
    width: 100vw;
    height: 100vh;
  }
`;

// Styled container for the board
const BoardContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    align-items: start;
    flex-direction: column;
    height: 100vh; /* Ensure the board takes at least 50% of the screen height on mobile */
  }
`;

export default function Game() {
  const {
    history,
    setHistory,
    currentMove,
    setCurrentMove,
    gameStatus,
    selectedGameType,
  } = useGameStore();

  // Derived state
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  const winner = calculateWinner(currentSquares); // Check for a winner
  // const turns = calculateTurns(currentSquares); // Calculate remaining turns

  // Handle a player's move
  const handlePlay = (nextSquares: (string | null)[]) => {
    if (gameStatus !== "inProgress" || winner) return;

    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  };

  // AI move logic (only for single-player mode)
  useEffect(() => {
    if (
      selectedGameType !== "singlePlayer" || // Only act in single-player mode
      gameStatus !== "inProgress" || // Only act if the game is in progress
      winner || // Don't act if there's already a winner
      xIsNext // Only act when it's the AI's turn
    )
      return;

    const makeAIMove = () => {
      const aiMove = aiPlay(currentSquares, AI_PLAYER);
      if (aiMove === null) return;

      const newSquares = [...currentSquares];
      newSquares[aiMove] = AI_PLAYER;
      const newHistory = [...history.slice(0, currentMove + 1), newSquares];

      setHistory(newHistory);
      setCurrentMove(newHistory.length - 1);
    };

    // Add a slight delay for the AI move to feel more natural
    const timer = setTimeout(makeAIMove, 500);
    return () => clearTimeout(timer);
  }, [currentMove, gameStatus, winner, xIsNext, selectedGameType]);

  return (
    <Container>
      {/* Game Board */}
      <BoardContainer>
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </BoardContainer>

      {/* Move History */}
      <MoveHistory history={history} jumpTo={setCurrentMove} />
    </Container>
  );
}
