

interface MoveHistoryProps {
  history: (string | null)[][];
  jumpTo: (nextMove: number) => void;
}

export default function MoveHistory({ history, jumpTo }: MoveHistoryProps) {
  return (
    <div style={{ marginLeft: "1rem", width: "200px", overflowY: "auto" }}>
      <ol>
        {history.map((_, historyIndex) => {
          const description =
            historyIndex > 0 ? `Go to move #${historyIndex}` : "Go to game start";
          return (
            <li key={historyIndex} style={{ marginBottom: 4 }}>
              <button
                style={{
                  background: historyIndex === 0 ? "rebeccapurple" : "#39383b9d",
                }}
                onClick={() => jumpTo(historyIndex)}
              >
                {description}
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}