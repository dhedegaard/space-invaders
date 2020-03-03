import React from "react";
import { useSelector } from "../game/store";
import { Shot } from "./Shot";

export const Shots: React.FC = () => {
  const shots = useSelector(s => s.shots.shots);

  return (
    <>
      {shots.map(shot => (
        <Shot key={shot.id} x={shot.position.x} y={shot.position.y} />
      ))}
    </>
  );
};
