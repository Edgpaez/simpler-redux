import createReducer from "./createReducer";
import React from "react";
import { createStore } from "redux";
import Renderer from "react-test-renderer";
import { Provider } from "react-redux";
import connect from "./connect";
import { createSelector } from "reselect";

const config = {
  initialState: {
    todos: ["first"]
  },

  ADD: (state, action) => {
    state.todos.push(action.payload.text);
  }
};

const reducer = createReducer(config);
const store = createStore(reducer);
const getTotal = createSelector(
  state => state.todos,
  todos => todos.length
);

const BaseComponent = props => (
  <div>
    {props.todos.map((todo, index) => (
      <span key={index}>{todo}</span>
    ))}
    <span>Total: {props.total}</span>
    <button onClick={props.onAdd}>Add</button>
  </div>
);

const add_todo = text => ({ type: "ADD", payload: { text } });

it("connects state and selectors", () => {
  const ConnectedComponent = connect(BaseComponent).to({
    props: {
      todos: "state.todos",
      total: getTotal
    }
  });

  const tree = Renderer.create(
    <Provider store={store}>
      <ConnectedComponent />
    </Provider>
  );
  expect(tree.toJSON()).toMatchSnapshot();
});

it("connects actions", () => {
  const ConnectedComponent = connect(BaseComponent).to({
    props: {
      todos: "state.todos",
      total: getTotal
    },
    actions: {
      onAdd: add_todo
    }
  });

  const tree = Renderer.create(
    <Provider store={store}>
      <ConnectedComponent />
    </Provider>
  );

  const button = tree.root.findByType("button");
  button.props.onClick("second");
  button.props.onClick("third");
  expect(tree.toJSON()).toMatchSnapshot();
});

it("throws if the state you try to connect is is not defined", () => {
  const ConnectedComponent = connect(BaseComponent).to({
    props: {
      todos: "state.potato.potato"
    }
  });

  expect(() =>
    Renderer.create(
      <Provider store={store}>
        <ConnectedComponent />
      </Provider>
    )
  ).toThrowError(
    `Error trying to map "state.potato.potato" to prop "todos", while connecting component to redux. state.potato.potato is not defined`
  );
});

it("throws if you don't pass an action creator", () => {
  const ConnectedComponent = connect(BaseComponent).to({
    props: {
      todos: "state.todos"
    },
    actions: {
      onAdd: { type: "ADD" }
    }
  });

  expect(() =>
    Renderer.create(
      <Provider store={store}>
        <ConnectedComponent />
      </Provider>
    )
  ).toThrowError(
    `withActions expects action creators. Received object for onAdd action`
  );
});
