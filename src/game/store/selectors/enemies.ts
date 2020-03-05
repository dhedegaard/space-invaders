import { createSelector } from "reselect";
import { Store } from "..";
import { ENEMY_WIDTH, ENEMY_HEIGHT } from "../../consts";

const HALF_ENEMY_WIDTH = Math.floor(ENEMY_WIDTH / 2);
const HALF_ENEMY_HEIGHT = Math.floor(ENEMY_HEIGHT / 2);

const getEnemies = (store: Store) => store.enemies.enemies;

/** Flattens the enemies with their current position. */
export const getEnemyPositions = createSelector(getEnemies, enemies =>
  enemies.map(e => ({
    ...e.position,
    id: e.id
  }))
);

/** Determines the bounds for all the enemies. */
export const getEnemyBounds = createSelector(
  (s: Store) => s.enemies.enemies,
  enemies =>
    enemies.map(e => ({
      id: e.id,
      left: e.position.x - HALF_ENEMY_WIDTH,
      right: e.position.x + HALF_ENEMY_WIDTH,
      top: e.position.y - HALF_ENEMY_HEIGHT,
      bottom: e.position.y + HALF_ENEMY_HEIGHT
    }))
);
