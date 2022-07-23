import React, { useContext } from "react";
import FieldContext from "./FieldContext";

const PieceComponent = ({ color, name, action, index }) => {
  let requiresImg = true;

  const { field, setField } = useContext(FieldContext);

  let src = require("./images/skins/default/black/bishop.svg").default;

  switch (color) {
    case "_":
      requiresImg = false;
      break;
    case "black":
      switch (name) {
        case "bishop":
          src = require("./images/skins/default/black/bishop.svg").default;
          break;
        case "king":
          src = require("./images/skins/default/black/king.svg").default;
          break;
        case "knight":
          src = require("./images/skins/default/black/knight.svg").default;
          break;
        case "pawn":
          src = require("./images/skins/default/black/pawn.svg").default;
          break;
        case "queen":
          src = require("./images/skins/default/black/queen.svg").default;
          break;
        case "rook":
          src = require("./images/skins/default/black/rook.svg").default;
      }
      break;
    case "white":
      switch (name) {
        case "bishop":
          src = require("./images/skins/default/white/bishop.svg").default;
          break;
        case "king":
          src = require("./images/skins/default/white/king.svg").default;
          break;
        case "knight":
          src = require("./images/skins/default/white/knight.svg").default;
          break;
        case "pawn":
          src = require("./images/skins/default/white/pawn.svg").default;
          break;
        case "queen":
          src = require("./images/skins/default/white/queen.svg").default;
          break;
        case "rook":
          src = require("./images/skins/default/white/rook.svg").default;
      }
      break;
  }

  const handleClick = () => {
    action.current.push(index);
    console.log(action.current);
    if (action.current.length < 2) return;
    const first = action.current[0];
    const second = action.current[1];
    if (field[first][0] !== "_" && field[second][0] === "_") {
      setField((prev) => {
        let next = [...prev];
        next[second] = prev[first];
        next[first] = prev[second];
        return [...next];
      });
    }
    action.current = [];
  };

  return (
    <div className="box">
      <div className="overlay" onClick={handleClick} />
      {requiresImg ? (
        <img src={src} alt={`${color} ${name}`} className={name} />
      ) : null}
    </div>
  );
};

export default PieceComponent;
