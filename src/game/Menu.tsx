import { useGameStore } from "./useGameStore";

export default function Menu() {
  const selectedGameType = useGameStore((state) => state.selectedGameType);
  const setSelectedGameType = useGameStore(
    (state) => state.setSelectedGameType
  );
  const startGame = useGameStore((state) => state.startGame);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        fontFamily: "monospace",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <h1>Tic Tac ❌  ⭕</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
        }}
      >
        <button
          onClick={() => setSelectedGameType("singlePlayer")}
          style={{
            backgroundColor:
              selectedGameType === "singlePlayer" ? "#b12f47" : "#fff",
            color: selectedGameType === "singlePlayer" ? "#fff" : "#000",
            padding: "0.5rem 1rem",
            border: "1px solid #999",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          singlePlayer
        </button>
        <button
          onClick={() => setSelectedGameType("multiPlayer")}
          style={{
            backgroundColor:
              selectedGameType === "multiPlayer" ? "#b12f47" : "#fff",
            color: selectedGameType === "multiPlayer" ? "#fff" : "#000",
            padding: "0.5rem 1rem",
            border: "1px solid #999",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          multiPlayer
        </button>
      </div>
      <button
        onClick={startGame}
        style={{
          backgroundColor: "#61101f",
          color: "#fff",
          padding: "0.5rem 1rem",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Start Game
      </button>
    </div>
  );
}
