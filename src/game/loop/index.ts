import React from "react";
import { useIsKeyPressed } from "./keyboard";
import { useDispatch } from "../store";
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
  }, [isKeyPressed, dispatch]);

  React.useEffect(() => {
    const handle = setInterval(gameloop, 20);
    return () => clearInterval(handle);
  });
};
