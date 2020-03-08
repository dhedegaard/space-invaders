import { Actions } from ".";
import { v4 } from "uuid";
import { ENEMY_POSITION_TICKS } from "../../consts";

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
  lastShot: 0,
  direction: "LEFT" as Direction,
  enemies: getInitialEnemies()
};

type State = typeof initialState;

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
    case "ENEMIES_FIRED_SHOT":
      return {
        ...state,
        lastShot: new Date().getTime()
      };
    case "ENEMIES_TICK":
      return {
        ...state,
        lastTick: new Date().getTime(),
        enemies: state.enemies.map(enemy => ({
          ...enemy,
          position: {
            ...enemy.position,
            x:
              state.direction === "LEFT"
                ? enemy.position.x - ENEMY_POSITION_TICKS
                : enemy.position.x + ENEMY_POSITION_TICKS
          }
        }))
      };
    case "ENEMIES_SET_DIRECTION":
      return {
        ...state,
        direction: action.direction
      };
    case "ENEMIES_MOVE_CLOSER":
      return {
        ...state,
        lastTick: new Date().getTime(),
        enemies: state.enemies.map(enemy => ({
          ...enemy,
          position: {
            ...enemy.position,
            y: enemy.position.y + 20
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
    }
  | {
      type: "ENEMIES_FIRED_SHOT";
    }
  | {
      type: "ENEMIES_SET_DIRECTION";
      direction: "LEFT" | "RIGHT";
    }
  | {
      type: "ENEMIES_MOVE_CLOSER";
    };
