import React, { useState, useRef } from "react";
import PieceComponent from "./PieceComponent";
import FieldContext from "./FieldContext";

const BoardComponent = () => {
  const [field, setField] = useState(
    [].concat(
      [
        ["black", "rook"],
        ["black", "knight"],
        ["black", "bishop"],
        ["black", "queen"],
        ["black", "king"],
        ["black", "bishop"],
        ["black", "knight"],
        ["black", "rook"],
      ],
      Array(8).fill(["black", "pawn"]),
      Array(4 * 8).fill(["_", "_"]),
      Array(8).fill(["white", "pawn"]),
      [
        ["white", "rook"],
        ["white", "knight"],
        ["white", "bishop"],
        ["white", "queen"],
        ["white", "king"],
        ["white", "bishop"],
        ["white", "knight"],
        ["white", "rook"],
      ]
    )
  );

  const action = useRef([]);

  return (
    <FieldContext.Provider value={{ field, setField }}>
      <div className="board">
        {[...field].map((elem, i) => (
          <PieceComponent
            key={i}
            color={elem[0]}
            name={elem[1]}
            action={action}
            index={i}
          />
        ))}
      </div>
    </FieldContext.Provider>
  );
};

export default BoardComponent;
