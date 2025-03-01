import { create } from "zustand";
import { combine } from "zustand/middleware";

export const   useGameStore = create(
    combine(
      {
        history: [Array(9).fill(null)],
        currentMove: 0,
      },
      (set, get) => {
        return {
          setHistory: (nextHistory:number[]) => {
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
        };
      }
    )
  );
  