import produce from "immer";

export default ({ initialState, ...reducers }) => {
  return (state = initialState, action) => {
    const srcReducer = reducers[action.type];

    return produce(state, draft => {
      if (srcReducer) {
        return srcReducer(draft, action);
      }
    });
  };
};
