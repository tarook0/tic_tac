interface SquareProbs {
  value: string | null;
  onSquareClick: () => void;
}
function Square({ value, onSquareClick }: SquareProbs) {
  return (
    <button
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 0,
        backgroundColor:
          value === null ?  "#fff" : "#504d4d" ,
          // value === "X" ? "blue" : value === "O" ? "red" : "#fff",
        border: "1px solid #999",
        outline: 0,
        borderRadius: 0,
        fontSize: "10rem",
        fontWeight: "bold",
      }}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}
export default Square;
