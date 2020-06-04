import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "@aws-amplify/ui/dist/style.css";
// import ApolloClient from "apollo-boost";
// import { ApolloProvider } from "@apollo/react-hooks";
// *aws
// import { createAppSyncLink, AUTH_TYPE } from "aws-appsync";
import { createAuthLink } from "aws-appsync-auth-link";
import Amplify from "aws-amplify";
import appSyncConfig from "./aws-exports";
// import { createAuthLink } from 'aws-appsync-auth-link';
// import { createSubscriptionHandshakeLink } from 'aws-appsync-subscription-link';
// *apollo
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  ApolloLink,
  gql,
} from "@apollo/client";
// import typeDefs from "./typeDefs";

import { InMemoryCache } from "apollo-cache-inmemory";
// @ts-ignore
import apolloLogger from "apollo-link-logger";
import ApolloLinkTracer from "apollo-link-tracer";
import { Reporter } from "@convoy/tracer";

import LogCache from "apollo-cache-logger";

// const apiReporter = new Reporter({
//   flushHandler: async (timings, traces) => {
//     // Report traces to API
//   },
// });

Amplify.configure(appSyncConfig);

const config: any = {
  url: appSyncConfig.aws_appsync_graphqlEndpoint,
  region: appSyncConfig.aws_appsync_region,
  auth: {
    type: appSyncConfig.aws_appsync_authenticationType,
    apiKey: appSyncConfig.aws_appsync_apiKey,
  },
};

const link = ApolloLink.from([
  apolloLogger,
  // @ts-ignore
  createAuthLink(config),
  createHttpLink({ uri: config.url }),
]);

const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
    cartItems: [Launch]!
  }

  extend type Launch {
    isInCart: Boolean!
  }

  extend type Mutation {
    addOrRemoveFromCart(id: ID!): [Launch]
  }
`;

const resolvers = {
  Query: {
    writeSome: () => {
      return { hoge: "huga" };
    },
  },
  Mutation: {
    writeAnything: () => {
      return { data: { todos: false } };
    },
  },
};

const cache: any = new LogCache(new InMemoryCache(), {
  logger: (msg: any) => console.log(msg),
});

const client = new ApolloClient({
  link,
  cache,
  typeDefs,
  resolvers,
  connectToDevTools: true,
});

const WRITE_SOME = gql`
  query GetTodosNetworkStatusAndFilter {
    writeSome @client {
      todos
    }
  }
`;

// const cach = new InMemoryCache();

cache.writeQuery({
  query: WRITE_SOME,
  data: {
    todos: true,
    visibilityFilter: "SHOW_ALL",
    networkStatus: {
      __typename: "NetworkStatus",
      isConnected: false,
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
