import React from "react";
import { useLoop } from "../game/loop";
import { Player } from "./Player";
import { Shots } from "./Shots";
import { GAME_HEIGHT, GAME_WIDTH } from "../game/consts";

const Background = () => (
  <rect x="0" y="0" width={GAME_WIDTH} height={GAME_HEIGHT} fill="black" />
);

const Gameboard = () => {
  useLoop();
  return (
    <svg width={GAME_WIDTH} height={GAME_HEIGHT}>
      <Background />
      <Player />
      <Shots />
    </svg>
  );
};

export default Gameboard;
