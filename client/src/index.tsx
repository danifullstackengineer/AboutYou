import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import basketSlice from "./redux/slices";

export const store = configureStore({
  reducer: {
    basket: basketSlice.reducer,
  },
});

const httpLink = new HttpLink({
  uri: "/graphql",
});

const errorLink = process.env.NODE_ENV === "production"
  ? onError(({ graphQLErrors, networkError }) => {
      console.log(
        "Something went wrong with the server, please contact the website administrator if this issue persists."
      );
    })
  : onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        );

      if (networkError) console.log(`[Network error]: ${networkError}`);
    });

const client = new ApolloClient({
  link: from([errorLink, httpLink]),
  cache: new InMemoryCache({
    typePolicies: {
      SliderOneType: {
        keyFields: ["id"],
      },
      SliderTwoType: {
        keyFields: ["id"],
      },
    },
  }),
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </Provider>
  </React.StrictMode>,
  document.querySelector("#root")
);
