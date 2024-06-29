import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client/core";
import fetch from "cross-fetch";

export const client = new ApolloClient({
  link: new HttpLink({
    fetch,
    uri: "https://gateway-arbitrum.network.thegraph.com/api/5dace53f482f1751985afdebcb310dba/subgraphs/id/ykYhkpzjz9FpT4RZRgFHQ84udU1581pfs4u9KcbA4yt",
  }),
  cache: new InMemoryCache(),
});
