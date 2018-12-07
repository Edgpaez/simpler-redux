export type ReducerConfig = {
  initialState: any,
  [key: string]: function(state: any, action: any) : any
}
export type createReducer = function(ReducerConfig) : function



export type connect = function(ReducerConfig) : function

