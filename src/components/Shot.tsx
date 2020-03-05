import React from "react";
import { SHOT_WIDTH, SHOT_HEIGHT } from "../game/consts";

type Props = {
  x: number;
  y: number;
};

const COLOR = "#fff";

// Repressents a shot, somewhere on the board.
export const Shot: React.FC<Props> = props => {
  const leftX = React.useMemo(() => props.x - Math.floor(SHOT_WIDTH / 2), [
    props.x
  ]);
  const topY = React.useMemo(() => props.y - Math.floor(SHOT_HEIGHT / 2), [
    props.y
  ]);

  return (
    <rect
      x={leftX}
      y={topY}
      width={SHOT_WIDTH}
      height={SHOT_HEIGHT}
      fill={COLOR}
    />
  );
};
