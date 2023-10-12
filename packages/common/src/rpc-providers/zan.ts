import { JsonRpcProvider, Chains, EIP1193LikeProvider } from '../types';

export interface ZANJsonRpcProviderProps {
  apiKey: string;
}

export class ZANJsonRpcProvider implements JsonRpcProvider {
  constructor(private options: ZANJsonRpcProviderProps) {}

  getRpcUrl(chain: Chains): string {
    if (chain === Chains.EthereumMainnet) {
      return `https://api.zan.top/node/v1/eth/mainnet/${this.options.apiKey}`;
    }
    throw new Error(`Unsupported chain: ${chain}`);
  }

  async create(): Promise<EIP1193LikeProvider> {
    return {
      request: async (request: { method: string; params?: any }) => {
        const { method, params } = request;
        const response = await fetch(this.getRpcUrl(Chains.EthereumMainnet), {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            jsonrpc: '2.0',
            method,
            params,
            id: 1,
          }),
        });
        const res = await response.json();
        const { result, error } = res;
        if (error) {
          throw new Error(error.message);
        }
        return result;
      },
    };
  }
}