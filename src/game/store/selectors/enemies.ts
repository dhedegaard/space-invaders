import { createSelector } from "reselect";
import { Store } from "..";

const getEnemies = (store: Store) => store.enemies.enemies;

export const getEnemyPositions = createSelector(getEnemies, enemies =>
  enemies.map(e => ({
    ...e.position,
    id: e.id
  }))
);
