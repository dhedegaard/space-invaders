import React from "react";
import { useLoop } from "../game/loop";
import { Player } from "./Player";

const Background = () => (
  <rect x="0" y="0" width="800" height="600" fill="black" />
);

const Gameboard = () => {
  useLoop();
  return (
    <svg width="800" height="600">
      <Background />
      <Player />
    </svg>
  );
};

export default Gameboard;
