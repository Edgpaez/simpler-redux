import createReducer from "./createReducer";

let reducer;

beforeAll(() => {
  const config = {
    initialState: {
      counter: 0
    },

    INCREMENT: (state, action) => {
      state.counter = state.counter + action.payload.amount;
    },
    DECREMENT: (state, action) => {
      state.counter = state.counter - action.payload.amount;
    }
  };

  reducer = createReducer(config);
});

it("creates a reducer with initial state", () => {
  expect(reducer(undefined, {})).toEqual({ counter: 0 });
});

it("handles actions and freezes", () => {
  expect(
    reducer({ counter: 1 }, { type: "INCREMENT", payload: { amount: 2 } })
  ).toEqual({ counter: 3 });
  expect(
    Object.isFrozen(
      reducer({ counter: 1 }, { type: "INCREMENT", payload: { amount: 2 } })
    )
  ).toBeTruthy();
});

it("works for unhandled actions", () => {
  expect(reducer({ counter: 1 }, { type: "POTATO" })).toEqual({ counter: 1 });
});

it("uses returned state when reducer returns", () => {
  const r = createReducer({
    initialState: { todos: [] },

    ADD_TODO: (state, action) => ({ todos: [action.payload.text] })
  });

  expect(r({}, { type: "ADD_TODO", payload: { text: "potato" } })).toEqual({
    todos: ["potato"]
  });
});
