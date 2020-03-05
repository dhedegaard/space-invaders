import React from "react";
import { useSelector } from "../game/store";
import { PLAYER_WIDTH, PLAYER_HEIGHT } from "../game/consts";

// Renders the player, based on their current position.
export const Player = () => {
  const position = useSelector(s => s.player.position);
  const leftX = React.useMemo(() => position - Math.floor(PLAYER_WIDTH / 2), [
    position
  ]);

  return (
    <rect
      x={leftX}
      y={500}
      width={PLAYER_WIDTH}
      height={PLAYER_HEIGHT}
      fill="green"
    />
  );
};
