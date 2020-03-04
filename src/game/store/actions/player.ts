import { Actions } from "../reducers";
import { Dispatch } from "redux";
import { Store } from "..";
import { v4 } from "uuid";

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
    position: { x: player.position, y: 500 },
    velocity: { x: 0, y: -8 }
  });
};
