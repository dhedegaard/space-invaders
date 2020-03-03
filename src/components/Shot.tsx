import React from "react";

type Props = {
  x: number;
  y: number;
};

const WIDTH = 2;
const HEIGHT = 8;
const COLOR = "#fff";

// Repressents a shot, somewhere on the board.
export const Shot: React.FC<Props> = props => {
  const leftX = React.useMemo(() => props.x - Math.floor(WIDTH / 2), [props.x]);
  const topY = React.useMemo(() => props.y - Math.floor(HEIGHT / 2), [props.y]);

  return <rect x={leftX} y={topY} width={WIDTH} height={HEIGHT} fill={COLOR} />;
};
