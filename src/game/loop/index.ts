import React from "react";
import { useIsKeyPressed } from "./keyboard";
import { useDispatch, useSelector } from "../store";
import { v4 } from "uuid";

export const useLoop = () => {
  const isKeyPressed = useIsKeyPressed();
  const dispatch = useDispatch();
  const playerState = useSelector(s => ({
    position: s.player.position,
    lastShotTime: s.player.lastShotTime
  }));
  const playerStateRef = React.useRef(playerState);
  playerStateRef.current = playerState;

  const gameloop = React.useCallback(() => {
    // Handle moving from side to side.
    if (isKeyPressed("ArrowLeft")) {
      dispatch({ type: "PLAYER_MOVE_LEFT" });
    } else if (isKeyPressed("ArrowRight")) {
      dispatch({ type: "PLAYER_MOVE_RIGHT" });
    }

    // Determine the shotting state.
    if (isKeyPressed("ArrowUp")) {
      if (playerStateRef.current.lastShotTime + 500 <= new Date().getTime()) {
        dispatch({ type: "PLAYER_START_SHOOTING" });
        dispatch({
          type: "SHOTS_ADD_SHOT",
          id: v4(),
          position: { x: playerStateRef.current.position, y: 500 },
          velocity: { x: 0, y: -8 }
        });
      }
    } else {
      dispatch({ type: "PLAYER_STOP_SHOOTING" });
    }

    // Move the position of all the shots.
    dispatch({ type: "SHOTS_TICK" });
  }, [isKeyPressed, dispatch, playerStateRef]);

  // Run the gameloop 50 times a minute.
  React.useEffect(() => {
    const handle = setInterval(gameloop, 20);
    return () => clearInterval(handle);
  });
};
