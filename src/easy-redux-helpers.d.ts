

export type ReducerConfig = {
  initialState: any,
  [key: string]: function(state: any, action: any) : any
}
export type createReducer = function(ReducerConfig) : function(state: object, action: any) : object



export type PropsConfig = {
  [key: string]: string
}
export type ActionsConfig = {
  [key: string]: function() : object
}

export type ConnectConfig = {
  props: (PropsConfig | function(state: object, props: object) : object)?,
  actions: any?
}
export type connect = function(React.Component) : React.Component

