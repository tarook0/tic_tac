import { create } from 'zustand';
import { combine } from 'zustand/middleware';

// Define the types for the state
interface GameState {
  history: (string | null)[][]; // Array of arrays of "X", "O", or null
  currentMove: number;
}

// Define the types for the actions
interface GameActions {
  setHistory: (nextHistory: (string | null)[][] | ((prevHistory: (string | null)[][]) => (string | null)[][])) => void;
  setCurrentMove: (nextCurrentMove: number | ((prevCurrentMove: number) => number)) => void;
}

// Combine the state and actions into a single type
type GameStore = GameState & GameActions;

// Create the store with types
export const useGameStore = create<GameStore>()(
  combine(
    {
      history: [Array(9).fill(null)], // Initial history is an array of arrays of null
      currentMove: 0,
    },
    (set) => ({
      setHistory: (nextHistory: (string | null)[][] | ((prevHistory: (string | null)[][]) => (string | null)[][])) => {
        set((state) => ({
          history:
            typeof nextHistory === "function"
              ? nextHistory(state.history) // If it's a function, call it with the current history
              : nextHistory, // Otherwise, use the provided value
        }));
      },
      setCurrentMove: (nextCurrentMove: number | ((prevCurrentMove: number) => number)) => {
        set((state) => ({
          currentMove:
            typeof nextCurrentMove === "function"
              ? nextCurrentMove(state.currentMove) // If it's a function, call it with the current move
              : nextCurrentMove, // Otherwise, use the provided value
        }));
      },
    })
  )
);