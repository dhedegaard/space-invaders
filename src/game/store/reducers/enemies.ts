import { Actions } from ".";
import { v4 } from "uuid";
import min from "lodash/min";
import max from "lodash/max";
import { GAME_WIDTH, ENEMY_WIDTH } from "../../consts";

type Direction = "LEFT" | "RIGHT";

type Enemy = {
  position: {
    /** The center X position. (Not the left side) */
    x: number;
    /** The center Y position. (Not the top) */
    y: number;
  };
  id: string;
};

const getInitialEnemies = (): Enemy[] => {
  const result: Enemy[] = [];
  for (let y = 50; y < 200; y += 40) {
    for (let x = 80; x < 750; x += 60) {
      result.push({
        position: { x, y },
        id: v4()
      });
    }
  }
  return result;
};

const initialState = {
  lastTick: 0,
  direction: "LEFT" as Direction,
  enemies: getInitialEnemies()
};

type State = typeof initialState;

const ENEMY_POSITION_TICKS = 8;
export const enemiesReducer = (
  state: State = initialState,
  action: Actions
): State => {
  switch (action.type) {
    case "ENEMIES_RESET_STATE":
      return {
        ...state,
        ...initialState
      };
    case "ENEMIES_TICK":
      // If we've updated recently, skip.
      if (state.lastTick + 300 >= new Date().getTime()) {
        return state;
      }
      const { direction } = state;

      // Determine if we should change direction.
      let newDirection = direction;
      switch (direction) {
        case "LEFT":
          const minX = min(state.enemies.map(e => e.position.x));
          if (minX - ENEMY_POSITION_TICKS < ENEMY_WIDTH) {
            newDirection = "RIGHT";
          }
          break;
        case "RIGHT":
          const maxX = max(state.enemies.map(e => e.position.x));
          if (maxX + ENEMY_POSITION_TICKS > GAME_WIDTH - ENEMY_WIDTH) {
            newDirection = "LEFT";
          }
          break;
      }

      return {
        ...state,
        lastTick: new Date().getTime(),
        direction: newDirection,
        enemies: state.enemies.map(enemy => ({
          ...enemy,
          position: {
            ...enemy.position,
            x:
              direction === "LEFT"
                ? enemy.position.x - ENEMY_POSITION_TICKS
                : enemy.position.x + ENEMY_POSITION_TICKS
          }
        }))
      };
    case "ENEMIES_REMOVE":
      return {
        ...state,
        enemies: state.enemies.filter(e => e.id !== action.id)
      };
    default:
      return state;
  }
};

export type EnemiesActions =
  | {
      type: "ENEMIES_RESET_STATE";
    }
  | {
      type: "ENEMIES_TICK";
    }
  | {
      type: "ENEMIES_REMOVE";
      id: string;
    };
