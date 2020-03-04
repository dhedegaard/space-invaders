import React from "react";
import { useSelector } from "../game/store";

// Renders the player, based on their current position.
const WIDTH = 20;
const HEIGHT = 10;

export const Player = () => {
  const position = useSelector(s => s.player.position);
  const leftX = React.useMemo(() => position - Math.floor(WIDTH / 2), [
    position
  ]);

  return <rect x={leftX} y={500} width={WIDTH} height={HEIGHT} fill="green" />;
};
