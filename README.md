# simpler-redux

simpler-redux is a tiny lib that eliminates most boilerplate when:

- creating reducers (by leveraging [immer](https://github.com/mweststrate/immer))
- connecting components to redux

## Example

#### createReducer

```javascript
// in your reducers
import { createReducer } from "simpler-redux";

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
import { connect } from "simpler-redux";

class MyComponent extends from React.Component {
    // ...
}

export default connect(MyComponent).to({
    props: {
      title: "state.info.name", // you can use dot notation to get data from the state
      total: getTotal // you can use selectors
    },
    actions: {
      onAdd: () => ({type: "INCREMENT"}) // receives action creators
    }
  })
```
