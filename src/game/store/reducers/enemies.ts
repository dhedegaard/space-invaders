import { Actions } from ".";
import { v4 } from "uuid";

type Direction = "LEFT" | "RIGHT";

type Enemy = {
  position: { x: number; y: number };
  id: string;
};

const getInitialEnemies = (): Enemy[] => {
  const result: Enemy[] = [];
  for (let y = 50; y < 200; y += 40) {
    for (let x = 40; x < 790; x += 60) {
      result.push({
        position: { x, y },
        id: v4()
      });
    }
  }
  return result;
};

const initialState = {
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
    case "ENEMIES_TICK":
      const { direction } = state;
      return {
        ...state,
        enemies: state.enemies.map(enemy => ({
          ...enemy,
          position: {
            ...enemy.position,
            x:
              direction === "LEFT" ? enemy.position.x - 1 : enemy.position.x + 1
          }
        }))
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
    };
