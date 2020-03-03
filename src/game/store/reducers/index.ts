import { combineReducers } from "redux";
import { PlayerActions, playerReducer } from "./player";
import { shotsReducer, ShotsActions } from "./shots";
export const rootReducer = combineReducers({
  player: playerReducer,
  shots: shotsReducer
});

export type Actions = PlayerActions | ShotsActions;
