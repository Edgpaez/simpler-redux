import createReducer from "./createReducer";
import produce, { setAutoFreeze } from "immer";

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
