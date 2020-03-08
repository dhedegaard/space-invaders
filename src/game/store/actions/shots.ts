import { Dispatch } from "redux";
import { Actions } from "../reducers";
import { Store } from "..";
import { getShotsCollisions } from "../selectors/shots";
import { ENEMY_WIDTH, GAME_WIDTH, ENEMY_POSITION_TICKS } from "../../consts";
import min from "lodash/min";
import max from "lodash/max";
import groupBy from "lodash/groupBy";
import maxBy from "lodash/maxBy";
import { v4 } from "uuid";

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
    dispatch({
      type: "ENEMIES_REMOVE",
      id: collision.enemyId
    });
  }
};

export const enemiesHandleTick = (): any => (
  dispatch: Dispatch<Actions>,
  getState: () => Store
) => {
  const { enemies } = getState();

  // If we've updated recently, skip.
  if (enemies.lastTick + 300 >= new Date().getTime()) {
    return;
  }

  // Determine if we should change direction.
  const { direction } = enemies;
  let newDirection = direction;
  switch (direction) {
    case "LEFT":
      const minX = min(enemies.enemies.map(e => e.position.x));
      if (minX - ENEMY_POSITION_TICKS < ENEMY_WIDTH) {
        newDirection = "RIGHT";
      }
      break;
    case "RIGHT":
      const maxX = max(enemies.enemies.map(e => e.position.x));
      if (maxX + ENEMY_POSITION_TICKS > GAME_WIDTH - ENEMY_WIDTH) {
        newDirection = "LEFT";
      }
      break;
  }
  dispatch({ type: "ENEMIES_TICK", direction: newDirection });

  // Find an enemy with no enemy in front, and fire a shot from it.
  if (new Date().getTime() > enemies.lastShot + 1000) {
    const frontEnemies = Object.values(
      groupBy(enemies.enemies, e => e.position.x)
    ).map(enemiesPerColumn => maxBy(enemiesPerColumn, e => e.position.y));
    if (frontEnemies.length > 0) {
      const randomEnemy =
        frontEnemies[Math.floor(Math.random() * frontEnemies.length)];
      dispatch({ type: "ENEMIES_FIRED_SHOT" });
      dispatch({
        type: "SHOTS_ADD_SHOT",
        id: v4(),
        position: {
          x: randomEnemy.position.x,
          y: randomEnemy.position.y + ENEMY_WIDTH
        },
        velocity: { x: 0, y: 1 }
      });
    }
  }
};
