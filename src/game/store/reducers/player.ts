const initialState = {
  /** The center X position (not the left side). */
  position: 400,
  lastShotTime: 0
};

type State = typeof initialState;

const DELTA_MOVEMENT = 4;
const SIDE_BUFFER = 15;

export const playerReducer = (
  state: State = initialState,
  action: PlayerActions
): State => {
  switch (action.type) {
    case "PLAYER_MOVE_LEFT":
      return {
        ...state,
        position: Math.max(state.position - DELTA_MOVEMENT, SIDE_BUFFER)
      };
    case "PLAYER_MOVE_RIGHT":
      return {
        ...state,
        position: Math.min(state.position + DELTA_MOVEMENT, 800 - SIDE_BUFFER)
      };
    case "PLAYER_START_SHOOTING":
      return {
        ...state,
        lastShotTime: new Date().getTime()
      };
    case "PLAYER_STOP_SHOOTING":
      return {
        ...state
      };
    default:
      return state;
  }
};

export type PlayerActions =
  | {
      type: "PLAYER_MOVE_LEFT";
    }
  | {
      type: "PLAYER_MOVE_RIGHT";
    }
  | {
      type: "PLAYER_START_SHOOTING";
    }
  | {
      type: "PLAYER_STOP_SHOOTING";
    };
