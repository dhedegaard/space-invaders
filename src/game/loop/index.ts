import React from "react";
import { useIsKeyPressed } from "./keyboard";
import { useDispatch } from "../store";
import { playerFireShot } from "../store/actions/player";
import { shotsHandleCollisions } from "../store/actions/shots";
import { enemiesHandleTick } from "../store/actions/enemies";

export const useLoop = () => {
  const isKeyPressed = useIsKeyPressed();
  const dispatch = useDispatch();

  const gameloop = React.useCallback(() => {
    // Handle moving from side to side.
    const moveLeft = isKeyPressed("ArrowLeft");
    const moveRight = isKeyPressed("ArrowRight");
    if (moveLeft && !moveRight) {
      dispatch({ type: "PLAYER_MOVE_LEFT" });
    } else if (moveRight && !moveLeft) {
      dispatch({ type: "PLAYER_MOVE_RIGHT" });
    }

    // Determine the shotting state.
    if (isKeyPressed(" ")) {
      dispatch(playerFireShot());
    } else {
      dispatch({ type: "PLAYER_STOP_SHOOTING" });
    }

    // Move the position of all the shots.
    dispatch({ type: "SHOTS_TICK" });

    // Move the enemies.
    dispatch(enemiesHandleTick());

    // Handle shot collisions.
    dispatch(shotsHandleCollisions());
  }, [isKeyPressed, dispatch]);

  // Run the gameloop 50 times a minute.
  React.useEffect(() => {
    const handle = setInterval(gameloop, 20);
    return () => clearInterval(handle);
  });
};
