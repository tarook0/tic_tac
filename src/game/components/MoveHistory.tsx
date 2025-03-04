import React from "react";

interface MoveHistoryProps {
  history: (string | null)[][];
  jumpTo: (nextMove: number) => void;
}

export default function MoveHistory({ history, jumpTo }: MoveHistoryProps) {
  return (
    <div style={{ marginInline: "1rem", width: "auto", overflowY: "auto" }}>
      <ol style={{ display: "grid", flexDirection: "column", gap: "8px" }}>
        {history.map((_, historyIndex) => {
          const description =
            historyIndex > 0
              ? `Go to move #${historyIndex}`
              : "Go to game start";
          return (
            <li key={historyIndex} style={{ listStyleType: "none" }}>
              <button
                style={{
                  background:
                    historyIndex === 0 ? "rebeccapurple" : "#39383b9d",
                  padding: "8px",
                  borderRadius: "4px",
                }}
                onClick={() => jumpTo(historyIndex)}
              >
                {description}
              </button>
            </li>
          );
        })}
      </ol>
      <style>
        {`
          @media (max-width: 600px) {
            div {
              display: grid;              
              gap: 8px;
            }
            ol {
              flex-direction: row;
              padding:0rem;
              grid-template-columns: repeat(4, 1fr);
              
            }
          }
        `}
      </style>
    </div>
  );
}
