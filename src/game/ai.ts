import { calculateWinner } from "./utils";


export function aiPlay(squares: (string | null)[], aiPlayer: string): number | null {
  let bestScore = -Infinity;
  let move: number | null = null;

  for (let i = 0; i < squares.length; i++) {
    if (!squares[i]) {
      squares[i] = aiPlayer;
      let score = minimax(squares, false, aiPlayer);
      squares[i] = null;
      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }
  return move;
}

function minimax(squares: (string | null)[], isMaximizing: boolean, aiPlayer: string): number {
  const winner = calculateWinner(squares);
  if (winner === aiPlayer) return 10;
  if (winner === "X") return -10;
  if (squares.every(Boolean)) return 0;

  let bestScore = isMaximizing ? -Infinity : Infinity;

  for (let i = 0; i < squares.length; i++) {
    if (!squares[i]) {
      squares[i] = isMaximizing ? aiPlayer : "X";
      const score = minimax(squares, !isMaximizing, aiPlayer);
      squares[i] = null;

      bestScore = isMaximizing
        ? Math.max(bestScore, score)
        : Math.min(bestScore, score);
    }
  }
  return bestScore;
}