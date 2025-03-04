import { useEffect, useState } from "react";
import { useGameStore } from "../useGameStore";

interface SelectoreProps {
  status: string;
}
const Selectore = ({ status }: SelectoreProps) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const selectedGameType = useGameStore((state) => state.selectedGameType);
  const setSelectedGameType = useGameStore(
    (state) => state.setSelectedGameType
  );

  // Update isMobile state on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Only render the component if it's a mobile view
  if (isMobile) return null;

  return (
    <div
      style={{
        display: "block",
        width: "20%",
        flexDirection: "column",
        height: "100%",
        alignContent: "space-around",
        gap: "1rem",
      }}
    >
      {/* Game Mode Selector */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label style={{ margin: "1rem" }}>
          <input
            type="radio"
            checked={selectedGameType === "singlePlayer"}
            onChange={() => setSelectedGameType("singlePlayer")}
          />
          Single Player
        </label>
        <label style={{ margin: "1rem" }}>
          <input
            type="radio"
            checked={selectedGameType === "multiPlayer"}
            onChange={() => setSelectedGameType("multiPlayer")}
          />
          Multi Player
        </label>
      </div>
      <div style={{ width: "100%", margin: "1rem" }}>{status}</div>
    </div>
  );
};

export default Selectore;
