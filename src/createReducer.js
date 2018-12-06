import produce from "immer";

export default ({ initialState, ...reducers }) => {
  return (state = initialState, action) => {
    const srcReducer = reducers[action.type];

    return produce(state, draft => {
      srcReducer && srcReducer(draft, action);
    });
  };
};
