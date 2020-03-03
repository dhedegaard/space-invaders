import React from "react";
import { useIsKeyPressed } from "./keyboard";
import { useDispatch, useSelector } from "../store";
import { v4 } from "uuid";

export const useLoop = () => {
  const isKeyPressed = useIsKeyPressed();
  const dispatch = useDispatch();
  const playerXPosition = useSelector(s => s.player.position);
  const playerXPosRef = React.useRef(playerXPosition);
  playerXPosRef.current = playerXPosition;

  const gameloop = React.useCallback(() => {
    // Handle moving from side to side.
    if (isKeyPressed("ArrowLeft")) {
      dispatch({ type: "PLAYER_MOVE_LEFT" });
    } else if (isKeyPressed("ArrowRight")) {
      dispatch({ type: "PLAYER_MOVE_RIGHT" });
    }

    // Determine the shotting state.
    if (isKeyPressed("ArrowUp")) {
      dispatch({ type: "PLAYER_START_SHOOTING" });
      dispatch({
        type: "SHOTS_ADD_SHOT",
        id: v4(),
        position: { x: playerXPosRef.current, y: 400 },
        velocity: { x: 0, y: -1 }
      });
    } else {
      dispatch({ type: "PLAYER_STOP_SHOOTING" });
    }

    // Move the position of all the shots.
    dispatch({ type: "SHOTS_TICK" });
  }, [isKeyPressed, dispatch, playerXPosRef]);

  React.useEffect(() => {
    const handle = setInterval(gameloop, 20);
    return () => clearInterval(handle);
  });
};
