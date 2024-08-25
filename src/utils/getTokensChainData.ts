import _ from "lodash";
import multicallv2 from "./multicall";
import erc20 from "./abi/erc20.json";

const getTokensChainData = async (addressArray?: string[]): Promise<any[]> => {
  const tokens = addressArray;
  if (!tokens) {
    console.error("No raw address list found");
    return [];
  }

  const chunkSize = 200;
  const chunkArray = tokens.length >= chunkSize ? _.chunk(tokens, chunkSize) : [tokens];

  const tokensWithChainData = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const chunk of chunkArray) {
    const tokenInfoCalls = chunk.flatMap((address) => [
      {
        address,
        name: "symbol",
      },
      {
        address,
        name: "name",
      },
      {
        address,
        name: "decimals",
      },
    ]);
    // eslint-disable-next-line no-await-in-loop
    const tokenInfoResponse = await multicallv2(erc20, tokenInfoCalls);
    const data = chunk.map((address, i) => ({
      name: tokenInfoResponse[i * 3 + 1][0],
      symbol: tokenInfoResponse[i * 3][0],
      address,
      chainId: 56,
      decimals: tokenInfoResponse[i * 3 + 2][0],
      logoURI: `https://assets-cdn.trustwallet.com/blockchains/smartchain/assets/${address}/logo.png`,
    }));
    tokensWithChainData.push(...data);
  }

  return tokensWithChainData;
};

export default getTokensChainData;
