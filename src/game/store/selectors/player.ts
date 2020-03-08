import { createSelector } from "reselect";
import { Store } from "..";
import { PLAYER_HEIGHT, PLAYER_WIDTH } from "../../consts";

const HALF_PLAYER_WIDTH = Math.floor(PLAYER_WIDTH / 2);

/** Determines the bounds for all the enemies. */
export const getPlayerBounds = createSelector(
  (s: Store) => s.player.position,
  position => {
    return {
      left: position - HALF_PLAYER_WIDTH,
      right: position + HALF_PLAYER_WIDTH,
      top: 500,
      bottom: 500 + PLAYER_HEIGHT
    };
  }
);
