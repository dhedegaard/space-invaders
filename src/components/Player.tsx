import React from "react";
import { useSelector } from "../game/store";

// Renders the player, based on their current position.
export const Player = () => {
  const position = useSelector(s => s.player.position);
  const leftX = React.useMemo(() => position - 5, [position]);

  return <rect x={leftX} y={500} width={10} height={5} fill="green" />;
};
