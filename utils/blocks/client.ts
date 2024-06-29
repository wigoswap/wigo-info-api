import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client/core";
import fetch from "cross-fetch";

export const blockClient = new ApolloClient({
  link: new HttpLink({
    fetch,
    uri: "https://gateway-arbitrum.network.thegraph.com/api/5dace53f482f1751985afdebcb310dba/subgraphs/id/2CosRXHL3aQXC24wfjzYthxpjmAKCC8eTiSUtGawfnNn",
  }),
  cache: new InMemoryCache(),
});
