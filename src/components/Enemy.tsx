import React from "react";

type Props = {
  x: number;
  y: number;
};

const WIDTH = 10;
const HEIGHT = 5;

export const Enemy: React.FC<Props> = props => {
  const leftX = React.useMemo(() => props.x - Math.floor(WIDTH / 2), [props.x]);
  const topY = React.useMemo(() => props.y - Math.floor(HEIGHT / 2), [props.y]);

  return <rect x={leftX} y={topY} width={WIDTH} height={HEIGHT} fill="green" />;
};
