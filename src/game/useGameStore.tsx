import { create } from "zustand";
import { combine } from "zustand/middleware";

// Define the types for the state
enum GameStatus {
  Menu = "menu",
  InProgress = "inProgress",
  End = "end",
}
interface GameState {
  history: (string | null)[][];
  currentMove: number;
  gameStatus: GameStatus;
  // selectedLevel: "easy" | "medium" | "hard";
  selectedGameType: "singlePlayer" | "multiPlayer";
}

// Define the types for the actions
interface GameActions {
  setHistory: (
    nextHistory:
      | (string | null)[][]
      | ((prevHistory: (string | null)[][]) => (string | null)[][])
  ) => void;
  setCurrentMove: (
    nextCurrentMove: number | ((prevCurrentMove: number) => number)
  ) => void;
  setGameStatus: (status: GameStatus) => void;
  // setSelectedLevel: (level: "easy" | "medium" | "hard") => void;
  setSelectedGameType: (type: "singlePlayer" | "multiPlayer") => void;
  startGame: () => void;
}

// Combine the state and actions into a single type
type GameStore = GameState & GameActions;

// Create the store with types
export const useGameStore = create<GameStore>()(
  combine(
    {
      history: [Array(9).fill(null)],
      currentMove: 0,
      gameStatus: GameStatus.Menu as GameStatus, // Explicitly type `gameStatus`
      // selectedLevel: "easy" as "easy" | "medium" | "hard", // Explicitly type `selectedLevel`
      selectedGameType: "singlePlayer" as "singlePlayer" | "multiPlayer", // Explicitly type `selectedLevel`
    },
    (set) => ({
      setHistory: (nextHistory) => {
        set((state) => ({
          history:
            typeof nextHistory === "function"
              ? nextHistory(state.history)
              : nextHistory,
        }));
      },
      setCurrentMove: (nextCurrentMove) => {
        set((state) => ({
          currentMove:
            typeof nextCurrentMove === "function"
              ? nextCurrentMove(state.currentMove)
              : nextCurrentMove,
        }));
      },
      setGameStatus: (status) => {
        set({ gameStatus: status });
      },
      // setSelectedLevel: (level) => {
      //   set({ selectedLevel: level });
      // },
      setSelectedGameType: (type) => {
        set({ selectedGameType: type });
      },
      startGame: () => {
        set({
          gameStatus: GameStatus.InProgress,
          history: [Array(9).fill(null)],
          currentMove: 0,
        });
      },
    })
  )
);
