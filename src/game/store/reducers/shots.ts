type Point = { x: number; y: number };

type Shot = {
  id: string;
  position: Point;
  velocity: Point;
};

const initialState = {
  shots: [] as Shot[]
};

type State = typeof initialState;

export const shotsReducer = (
  state: State = initialState,
  action: ShotsActions
): State => {
  switch (action.type) {
    case "SHOTS_ADD_SHOT":
      return {
        ...state,
        shots: [
          ...state.shots,
          {
            id: action.id,
            position: action.position,
            velocity: action.velocity
          }
        ]
      };
    case "SHOTS_REMOVE_SHOT":
      return {
        ...state,
        shots: [...state.shots.filter(e => e.id !== action.id)]
      };
    case "SHOTS_TICK":
      return {
        ...state,
        shots: state.shots.map(shot => ({
          ...shot,
          position: {
            x: shot.position.x + shot.velocity.x,
            y: shot.position.y + shot.velocity.y
          }
        }))
      };
    default:
      return state;
  }
};

export type ShotsActions =
  | {
      type: "SHOTS_ADD_SHOT";
      id: string;
      position: Point;
      velocity: Point;
    }
  | {
      type: "SHOTS_REMOVE_SHOT";
      id: string;
    }
  | {
      type: "SHOTS_TICK";
    };
