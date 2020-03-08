import { Store } from "..";

import { SHOT_WIDTH, SHOT_HEIGHT } from "../../consts";
import { getEnemyBounds } from "./enemies";
import { createSelector } from "reselect";
import { getPlayerBounds } from "./player";

const HALF_SHOT_WIDTH = Math.floor(SHOT_WIDTH / 2);
const HALF_SHOT_HEIGHT = Math.floor(SHOT_HEIGHT / 2);

/** Determines the bounds of all the shots. */
const getShotBounds = createSelector(
  (s: Store) => s.shots.shots,
  shots =>
    shots.map(e => ({
      id: e.id,
      left: e.position.x - HALF_SHOT_WIDTH,
      right: e.position.x + HALF_SHOT_WIDTH,
      top: e.position.y - HALF_SHOT_HEIGHT,
      bottom: e.position.y + HALF_SHOT_HEIGHT
    }))
);

/**
 * Determines any collisions with the shots in the system.
 *
 * @returns A list with the ID of the shot + whatever entity was hit.
 */
export const getShotsCollisions = createSelector(
  [getShotBounds, getEnemyBounds, getPlayerBounds],
  (shots, enemies, player) => {
    const result: Array<{
      shotId: string;
    } & ({ type: "enemy"; enemyId: string } | { type: "player" })> = [];

    for (const shot of shots) {
      for (const enemy of enemies) {
        // Outside on the X axis.
        if (shot.left > enemy.right || shot.right < enemy.left) {
          continue;
        }
        // Outside on the Y axis.
        if (shot.top > enemy.bottom || shot.bottom < enemy.top) {
          continue;
        }
        // Overlap!
        result.push({
          shotId: shot.id,
          type: "enemy",
          enemyId: enemy.id
        });
      }

      if (
        shot.left <= player.right &&
        shot.right >= player.left &&
        shot.top <= player.bottom &&
        shot.bottom >= player.top
      ) {
        result.push({
          shotId: shot.id,
          type: "player"
        });
      }
    }
    return result;
  }
);
