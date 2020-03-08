import { Dispatch } from "redux";
import { Actions } from "../reducers";
import { Store } from "..";
import { getShotsCollisions } from "../selectors/shots";

export const shotsHandleCollisions = (): any => async (
  dispatch: Dispatch<Actions>,
  getState: () => Store
) => {
  const state = getState();
  const collisions = getShotsCollisions(state);

  for (const collision of collisions) {
    dispatch({
      type: "SHOTS_REMOVE_SHOT",
      id: collision.shotId
    });
    if (collision.type === "enemy") {
      dispatch({
        type: "ENEMIES_REMOVE",
        id: collision.enemyId
      });
    }
  }
};
