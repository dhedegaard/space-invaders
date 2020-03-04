import React from "react";
import { useSelector } from "../game/store";
import { Enemy } from "./Enemy";
import { getEnemyPositions } from "../game/store/selectors/enemies";

export const Enemies: React.FC = () => {
  const enemies = useSelector(getEnemyPositions);
  return (
    <>
      {enemies.map(enemy => (
        <Enemy x={enemy.x} y={enemy.y} key={enemy.id} />
      ))}
    </>
  );
};
