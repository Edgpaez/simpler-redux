# easy-redux-helpers

easy-redux-helpers is a tiny lib that eliminates most boilerplate when:

- creating reducers (by leveraging [immer](https://github.com/mweststrate/immer))
- connecting components to redux

## Example

#### createReducer

```javascript
// in your reducers
import { createReducer } from "easy-redux-helpers";

const config = {
  // first set initial state
  initialState: {
    counter: 0
  },

  // declare the reducer for each action
  // create a new state by modifying the previous, no need to return new state
  INCREMENT: (state, action) => {
    state.counter = state.counter + action.payload.amount;
  },
  DECREMENT: (state, action) => {
    state.counter = state.counter - action.payload.amount;
  }
};

reducer = createReducer(config);
```

The state returned by reducers created using `createReducer` is immutable ([immer](https://github.com/mweststrate/immer) does the hard work)

#### connect

```javascript
// when connecting components to redux
import React from "react";
import { connect } from "easy-redux-helpers";
import increment from "./actions";

class MyComponent extends from React.Component {
    // can use props as
    // this.props.title
    // can use actions as
    // this.props.actions.increment()
}

export default connect(MyComponent).to({
    props: {
      title: "state.info.name", // you can use dot notation to get data from the state
      total: getTotal // you can use selectors
    },
    actions: {
      increment // receives action creators
    }
  })

  // increment is defined at actions.js as
  // export const increment = () => ({type: "INCREMENT"})
```

`connect`

`props` can also be a function, for example:

```javascript
export default connect(MyComponent).to({
  props: (state, props) => ({
    title: state.title.toUpperCase(),
    total: props.todos.length
  })
});
```

## Install

`yarn install easy-redux-helpers`
or
`npm install easy-redux-helpers`

Chances are, you're already using `react-redux`, which this lib uses as a [peerDependency](https://yarnpkg.com/lang/en/docs/dependency-types/#toc-peerdependencies). In case you're not, you should install it too:
`yarn install react-redux`
or
`npm install react-redux`
