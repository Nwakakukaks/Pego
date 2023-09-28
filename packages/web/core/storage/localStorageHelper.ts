import { Blockchains } from '@core/enums/blockchains';

class LocalStorageHelper {
  storeWalletAddress(chain: Blockchains, address: string): void {
    window?.localStorage?.setItem(`bf_walletaddress_${chain}`, address);
  }
  getWalletAddress(chain: Blockchains): string | null {
    return window?.localStorage?.getItem(`bf_walletaddress_${chain}`) || null;
  }
  clearWalletAddress(chain: Blockchains): void {
    window?.localStorage?.removeItem(`bf_walletaddress_${chain}`);
  }

  storeAuthToken(token: string): void {
    window?.localStorage?.setItem('bf_authToken', token);
  }
  getAuthToken(): string | null {
    return window?.localStorage?.getItem('bf_authToken') || null;
  }
  clearAuthToken(): void {
    window?.localStorage?.removeItem('bf_authToken');
  }
  hasAuthToken(): boolean {
    return this.getAuthToken() !== null;
  }

  storeConnectedChain(blockchain: Blockchains): void {
    window?.localStorage?.setItem('bf_connectedChain', blockchain);
  }
  getConnectedChain(): string | null {
    return window?.localStorage?.getItem('bf_connectedChain') || null;
  }
  clearConnectedChain(): void {
    window?.localStorage?.removeItem('bf_connectedChain');
  }
}

export default new LocalStorageHelper();
