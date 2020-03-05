import React from "react";
import { ENEMY_WIDTH, ENEMY_HEIGHT } from "../game/consts";

type Props = {
  x: number;
  y: number;
};

export const Enemy: React.FC<Props> = props => {
  const leftX = React.useMemo(() => props.x - Math.floor(ENEMY_WIDTH / 2), [
    props.x
  ]);
  const topY = React.useMemo(() => props.y - Math.floor(ENEMY_HEIGHT / 2), [
    props.y
  ]);

  return (
    <rect
      x={leftX}
      y={topY}
      width={ENEMY_WIDTH}
      height={ENEMY_HEIGHT}
      fill="green"
    />
  );
};
