import gql from "graphql-tag";

export const PAIRS_VOLUME_QUERY = gql`
  query PairsVolume($limit: Int!, $pairIds: [ID!]!, $blockNumber: Int!) {
    pairVolumes: pairs(first: $limit, where: { id_in: $pairIds }, block: { number: $blockNumber }) {
      id
      volumeToken0
      volumeToken1
    }
  }
`;

export const TOKEN_BY_ADDRESS = gql`
  query Token($id: ID!) {
    token(id: $id) {
      id
      name
      symbol
      derivedFTM
      derivedUSD
    }
  }
`;

export const TOP_PAIRS = gql`
  fragment TokenInfo on Token {
    id
    name
    symbol
    derivedFTM
    derivedUSD
  }

  query TopPairs($limit: Int!, $excludeTokenIds: [String!]!) {
    pairs(
      first: $limit
      orderBy: reserveUSD
      orderDirection: desc
      where: { token0_not_in: $excludeTokenIds, token1_not_in: $excludeTokenIds }
    ) {
      id
      token0 {
        ...TokenInfo
      }
      token1 {
        ...TokenInfo
      }
      reserve0
      reserve1
      volumeToken0
      volumeToken1
      reserveFTM
      reserveUSD
    }
  }
`;

export const ORDERBOOK_DATA = gql`
  query pairReseveData($tokenA: String!, $tokenB: String!) {
    pairs(where: { token0: $tokenA, token1: $tokenB }) {
      id
      reserve0
      reserve1
    }
  }
`;

export const PAIR_DATA = gql`
  query pairData($tokenA: String!, $tokenB: String!) {
    pairs(where: { token0: $tokenA, token1: $tokenB }) {
      id
    }
  }
`;

export const SWAPS_DATA = gql`
  query swapsData($_24HoursAgo: Int!, $pairAddress: String!) {
    swaps(
      orderBy: timestamp
      orderDirection: asc
      where: { timestamp_gte: $_24HoursAgo, pair: $pairAddress }
    ) {
      id
      timestamp
      amount0In
      amount0Out
      amount1In
      amount1Out
    }
  }
`;
