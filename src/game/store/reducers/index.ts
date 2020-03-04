import { combineReducers } from "redux";
import { PlayerActions, playerReducer } from "./player";
import { shotsReducer, ShotsActions } from "./shots";
import { EnemiesActions, enemiesReducer } from "./enemies";
export const rootReducer = combineReducers({
  player: playerReducer,
  shots: shotsReducer,
  enemies: enemiesReducer
});

export type Actions = PlayerActions | ShotsActions | EnemiesActions;
