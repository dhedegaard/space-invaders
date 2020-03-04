import React from "react";
import { useSelector } from "../game/store";
import { Enemy } from "./Enemy";

export const Enemies: React.FC = () => {
  const enemies = useSelector(s => s.enemies.enemies);
  return (
    <>
      {enemies.map(enemy => (
        <Enemy x={enemy.position.x} y={enemy.position.y} key={enemy.id} />
      ))}
    </>
  );
};
