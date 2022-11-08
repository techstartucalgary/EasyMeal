import React from "react";

// Global state object
const initialUserState = {
  name: "",
};

const userContextWrapper = (component?: React.Component) => ({
  ...initialUserState,
  setName: (new_name: string) => {
    initialUserState.name = new_name;
    component?.setState({ context: userContextWrapper(component) });
  },
});

type UserDataContext = ReturnType<typeof userContextWrapper>;

export const UserDataContext = React.createContext<UserDataContext>(
  userContextWrapper()
);

interface UserDataState {
  context: UserDataContext;
}

export class UserDataContextProvider extends React.Component<
  any,
  { context: UserDataContext }
> {
  state: UserDataState = {
    context: userContextWrapper(this),
  };

  render() {
    return (
      <UserDataContext.Provider value={this.state.context}>
        {this.props.children}
      </UserDataContext.Provider>
    );
  }
}
