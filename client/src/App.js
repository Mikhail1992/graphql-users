import React, { Component } from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import theme from "./theme";
import Users from "./components/Users";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <Users />
        </ThemeProvider>
      </ApolloProvider>
    );
  }
}

export default App;
