const initialState = {
  position: 400
};

type State = typeof initialState;

const DELTA_MOVEMENT = 2;
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
    };
