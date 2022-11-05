import React from "react";

// Global state object
const initialCounterState = {
  count: 0,
};

const counterContextWrapper = (component?: React.Component) => ({
  ...initialCounterState,
  increment: () => {
    initialCounterState.count += 1;
    component?.setState({ context: counterContextWrapper(component) });
  },
  decrement: () => {
    initialCounterState.count -= 1;
    component?.setState({ context: counterContextWrapper(component) });
  },
});

type CounterContext = ReturnType<typeof counterContextWrapper>;

export const CounterContext = React.createContext<CounterContext>(
  counterContextWrapper()
);

interface CounterState {
  context: CounterContext;
}

export class CounterContextProvider extends React.Component {
  state: CounterState = {
    context: counterContextWrapper(this),
  };

  render() {
    return (
      <CounterContext.Provider value={this.state.context}>
        {this.props.children}
      </CounterContext.Provider>
    );
  }
}
