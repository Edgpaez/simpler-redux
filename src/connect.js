import { connect } from "react-redux";

const getWithDotNotation = (object, key) => {
  key = key.replace("state.", "");

  if (key.includes(".")) {
    let value = object;
    key.split(".").forEach(subkey => {
      value = value[subkey];
    });

    return value;
  }

  return object[key];
};

const buildMapStateToProps = propMap => (state, componentProps) => {
  const connectedProps = {};
  if (typeof propMap === "function") {
    return propMap(state, componentProps);
  }
  Object.keys(propMap).forEach(propName => {
    if (typeof propMap[propName] === "string") {
      // dot notation: state.potato.color
      try {
        connectedProps[propName] = getWithDotNotation(state, propMap[propName]);
      } catch (e) {
        throw new Error(
          `Error trying to map "${
            propMap[propName]
          }" to prop "${propName}", while connecting component to redux. ${
            propMap[propName]
          } is not defined`
        );
      }
    } else if (typeof propMap[propName] === "function") {
      // selectors
      connectedProps[propName] = propMap[propName].call(
        null,
        state,
        componentProps
      );
    }
  });
  return connectedProps;
};
const buildDispatchToProps = actions => dispatch => {
  const connectedActions = {};
  Object.keys(actions).forEach(key => {
    if (typeof actions[key] !== "function") {
      throw new Error(
        `withActions expects action creators. Received ${typeof actions[
          key
        ]} for ${key} action`
      );
    }

    connectedActions[key] = (...args) =>
      dispatch(actions[key].apply(null, args));
  });
  return { actions: connectedActions };
};

export default Component => {
  let stateToProps, dispatchToProps;
  return {
    to: config => {
      stateToProps = config["props"]
        ? buildMapStateToProps(config["props"])
        : undefined;
      dispatchToProps = config["actions"]
        ? buildDispatchToProps(config["actions"])
        : undefined;

      return connect(
        stateToProps,
        dispatchToProps
      )(Component);
    }
  };
};
