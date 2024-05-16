import { ApolloClient, InMemoryCache } from "@apollo/client";

import { createHttpLink } from "@apollo/client";

import { setContext } from "@apollo/client/link/context";

import * as SecureStore from "expo-secure-store";

const httpLink = createHttpLink({
  uri: "https://5tjxjfpx-3000.asse.devtunnels.ms/",
});

const authLink = setContext(async (_parent, { headers }) => {
  const access_token = await SecureStore.getItemAsync("access_token");

  return {
    headers: {
      ...headers,
      authorization: access_token ? `Bearer ${access_token}` : "",
    },
  };
});



const client = new ApolloClient({
//   uri: "https://q1zmq7t9-3000.asse.devtunnels.ms",
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
