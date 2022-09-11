import { useState, useEffect } from "react";
const Patterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const initialValue = ["", "", "", "", "", "", "", "", ""];
const Xo = () => {
  const [values, setValues] = useState(initialValue);
  const [player, setPlayer] = useState("O");
  const [info, setInfo] = useState({ winner: "none", state: "none" });

  useEffect(() => {
    checkWin();
    if (player === "X") setPlayer("O");
    else setPlayer("X");
  }, [values]);

  useEffect(() => {
    if (info.state !== "none") {
      alert(`Win: ${info.winner}`);
      setValues(initialValue);
    }
    const isFull = values.every((item) => item !== "");
    if (isFull && info.state === "none") {
      console.log("full no winner");
      alert("No winner!!!");
      setValues(initialValue);
    }
  }, [info]);

  const handleClick = (cell) => {
    if (values[cell] !== "") return;
    const cloneArr = values.map((val, idx) => {
      if (idx === cell && val === "") {
        return player;
      }
      return val;
    });
    setValues(cloneArr);
  };

  const checkWin = () => {
    Patterns.forEach((currPattern) => {
      const firstPlayer = values[currPattern[0]];
      if (firstPlayer === "") return;
      let foundWinningPattern = true;
      currPattern.forEach((idx) => {
        if (values[idx] !== firstPlayer) {
          foundWinningPattern = false;
        }
      });
      if (foundWinningPattern) {
        setInfo({ winner: player, state: "Won" });
      }
    });
  };

  return (
    <div className="container">
      {values.map((cell, cellIndex) => (
        <div
          className="cell"
          key={String("index" + cellIndex)}
          onClick={() => handleClick(cellIndex)}
        >
          {cell}
        </div>
      ))}
    </div>
  );
};

export default Xo;

// import React, { useState } from "react";
// const Patterns = [
//   [0, 1, 2],
//   [3, 4, 5],
//   [6, 7, 8],
//   [0, 3, 6],
//   [1, 4, 7],
//   [2, 5, 8],
//   [0, 4, 8],
//   [2, 4, 6],
// ];
// const Xo = () => {
//   const initialValue = [
//     [null, null, null],
//     [null, null, null],
//     [null, null, null],
//   ];
//   const [val, setVal] = useState(initialValue);
//   const [flag, setFlag] = useState(false);
//   const handleClick = (rowIndex, cellIndex) => {
//     let xo = "";
//     console.log(`row: ${rowIndex} cell: ${cellIndex}`);
//     const clone = [...val];
//     if (flag) xo = "O";
//     else xo = "X";

//     clone[rowIndex][cellIndex] = xo;
//     setVal(clone);
//     setFlag((prev) => !prev);
//     const isFull = val.every((firstDime) =>
//       firstDime.every((secondDime) => secondDime !== null)
//     );
//     if (isFull) setVal(initialValue);
//     console.log("isFull: ", isFull);
//   };
//   return (
//     <div className="container">
//       {val.map((row, rowIndex) =>
//         row.map((cell, cellIndex) => (
//           <div
//             className="req"
//             key={String(rowIndex + cellIndex)}
//             onClick={() => handleClick(rowIndex, cellIndex)}
//           >
//             {cell}
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default Xo;
