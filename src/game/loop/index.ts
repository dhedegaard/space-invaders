import React from "react";
import { useIsKeyPressed } from "./keyboard";
import { useDispatch } from "../store";
import { playerFireShot } from "../store/actions/player";

export const useLoop = () => {
  const isKeyPressed = useIsKeyPressed();
  const dispatch = useDispatch();

  const gameloop = React.useCallback(() => {
    // Handle moving from side to side.
    if (isKeyPressed("ArrowLeft")) {
      dispatch({ type: "PLAYER_MOVE_LEFT" });
    } else if (isKeyPressed("ArrowRight")) {
      dispatch({ type: "PLAYER_MOVE_RIGHT" });
    }

    // Determine the shotting state.
    if (isKeyPressed("ArrowUp")) {
      dispatch(playerFireShot());
    } else {
      dispatch({ type: "PLAYER_STOP_SHOOTING" });
    }

    // Move the position of all the shots.
    dispatch({ type: "SHOTS_TICK" });

    // Move the enemies.
    dispatch({ type: "ENEMIES_TICK" });
  }, [isKeyPressed, dispatch]);

  // Run the gameloop 50 times a minute.
  React.useEffect(() => {
    const handle = setInterval(gameloop, 20);
    return () => clearInterval(handle);
  });
};
