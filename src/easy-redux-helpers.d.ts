import { Reducer, AnyAction, ActionCreator, Action } from "redux";
import { Selector } from "reselect";
import { ComponentClass } from "../../../../Library/Caches/typescript/3.1/node_modules/@types/react";

type State = any;
// ***************
// createReducer()
// ***************
/**
 * A reducer with immer is a reducer that optionally returns state
 */
export type ReducerWithImmer<State, A extends Action = AnyAction> = (
  state: State | undefined,
  action: AnyAction
) => State | undefined;

export type SetOfReducers<S = State, A extends Action = AnyAction> = {
  [key: string]: ReducerWithImmer<S, A>;
};
/**
 * The config of a reducer. It defines the initial state and a set of
 * reducers of type ReducerWithImmer
 */
export type ReducerConfig<State, Action extends AnyAction> = SetOfReducers<
  State,
  Action
> & {
  initialState: State;
};
export type createReducer<S = State, A extends Action = AnyAction> = (
  config: ReducerConfig<S, A>
) => Reducer;

// ***************
// connect()
// ***************
/**
 * An object in which each key is the name of the prop and each value is a string
 * that specifies the part of the state that is mapped to it, for example:
 * userName: "state.profile.name"
 */
export interface PropsConfig<S, R> {
  [key: string]: string | Selector<S, R>;
}
/**
 * An object in which each key is the name of the action as the component will use it
 * and the value is an action creator. All actions are mapped to the props.actions object
 * in the component.
 */
export interface ActionsConfig<AnyAction> {
  [key: string]: ActionCreator<AnyAction>;
}
/**
 * A configuration object to connect the component to redux. Can have
 * props property of type PropsConfig and an actions property of type ActionsConfig
 */
export interface ConnectConfig<S, R, A> {
  props: PropsConfig<S, R> | undefined;
  actions: ActionsConfig<A> | undefined;
}

export type ConfigurableConnect = {
  to: (ConnectConfig) => ComponentClass;
};
/**
 * connects a component to redux by calling the `to` method with a ConnectConfig
 */
export type connect = (ComponentClass) => ConfigurableConnect;
