import { combineReducers } from "redux";
import { PlayerActions, playerReducer } from "./player";
export const rootReducer = combineReducers({
  player: playerReducer
});

export type Actions = PlayerActions;
