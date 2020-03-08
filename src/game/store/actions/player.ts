import { Actions } from "../reducers";
import { Dispatch } from "redux";
import { Store } from "..";
import { v4 } from "uuid";
import { SHOT_VELOCITY, HALF_PLAYER_HEIGHT } from "../../consts";

export const playerFireShot = (): any => (
  dispatch: Dispatch<Actions>,
  getStore: () => Store
) => {
  const { player } = getStore();

  // Only allow firing one shot every interval.
  if (player.lastShotTime + 500 > new Date().getTime()) {
    return;
  }

  dispatch({ type: "PLAYER_START_SHOOTING" });
  dispatch({
    type: "SHOTS_ADD_SHOT",

    id: v4(),
    position: { x: player.position, y: 500 - HALF_PLAYER_HEIGHT },
    velocity: { x: 0, y: -1 * SHOT_VELOCITY }
  });
};
