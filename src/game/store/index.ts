import {
  TypedUseSelectorHook,
  useDispatch as realUseDispatch,
  useSelector as realUseSelector
} from "react-redux";
import thunk from "redux-thunk";
import { createStore, Dispatch, applyMiddleware } from "redux";
import { rootReducer, Actions } from "./reducers";

export const store = createStore(rootReducer, applyMiddleware(thunk));
export type Store = ReturnType<typeof store["getState"]>;

export const useDispatch: () => Dispatch<Actions> = realUseDispatch;

export const useSelector: TypedUseSelectorHook<Store> = realUseSelector;
