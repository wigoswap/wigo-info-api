# Documentation

All WigoSwap pairs consist of two different tokens. FTM is not a native currency in WigoSwap, and is represented only by WFTM in the pairs. 

The canonical WFTM address used by the WigoSwap interface is `0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83`.

Results are cached for 5 minutes (or 300 seconds).

## [`/summary`](https://api.wigoswap.io/api/summary)

Returns data for the top ~1000 WigoSwap pairs, sorted by reserves. 

### Request

`GET https://api.wigoswap.io/api/summary`

### Response

```json5
{
  "updated_at": 1234567,              // UNIX timestamp
  "data": {
    "0x..._0x...": {                  // Fantom token addresses, joined by an underscore
      "price": "...",                 // price denominated in token1/token0
      "base_volume": "...",           // last 24h volume denominated in token0
      "quote_volume": "...",          // last 24h volume denominated in token1
      "liquidity": "...",             // liquidity denominated in USD
      "liquidity_FTM": "..."          // liquidity denominated in FTM
    },
    // ...
  }
}
```

## [`/tokens`](https://api.wigoswap.io/api/tokens)

Returns the tokens in the top ~1000 pairs on WigoSwap, sorted by reserves.

### Request

`GET https://api.wigoswap.io/api/tokens`

### Response

```json5
{
  "updated_at": 1234567,              // UNIX timestamp
  "data": {
    "0x...": {                        // the address of the Fantom token
      "name": "...",                  // not necessarily included for Fantom tokens
      "symbol": "...",                // not necessarily included for Fantom tokens
      "price": "...",                 // price denominated in USD
      "price_FTM": "...",             // price denominated in FTM
    },
    // ...
  }
}
```

## [`/tokens/0x...`](https://api.wigoswap.io/api/tokens/0xE992bEAb6659BFF447893641A378FbbF031C5bD6)

Returns the token information, based on address.

### Request

`GET https://api.wigoswap.io/api/tokens/0xE992bEAb6659BFF447893641A378FbbF031C5bD6`

### Response

```json5
{
  "updated_at": 1234567,              // UNIX timestamp
  "data": {
    "name": "...",                    // not necessarily included for Fantom tokens
    "symbol": "...",                  // not necessarily included for Fantom tokens
    "price": "...",                   // price denominated in USD
    "price_FTM": "...",               // price denominated in FTM
  }
}
```

## [`/pairs`](https://api.wigoswap.io/api/pairs)

Returns data for the top ~1000 WigoSwap pairs, sorted by reserves.

### Request

`GET https://api.wigoswap.io/api/pairs`

### Response

```json5
{
  "updated_at": 1234567,              // UNIX timestamp
  "data": {
    "0x..._0x...": {                  // the asset ids of FTM and Fantom tokens, joined by an underscore
      "pair_address": "0x...",        // pair address
      "base_name": "...",             // token0 name
      "base_symbol": "...",           // token0 symbol
      "base_address": "0x...",        // token0 address
      "quote_name": "...",            // token1 name
      "quote_symbol": "...",          // token1 symbol
      "quote_address": "0x...",       // token1 address
      "price": "...",                 // price denominated in token1/token0
      "base_volume": "...",           // volume denominated in token0
      "quote_volume": "...",          // volume denominated in token1
      "liquidity": "...",             // liquidity denominated in USD
      "liquidity_FTM": "..."          // liquidity denominated in FTM
    },
    // ...
  }
}
```
