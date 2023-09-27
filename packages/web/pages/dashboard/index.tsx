import type { NextPage } from 'next';
import styles from '@styles/Dashboard.module.scss';
import PageHead from '@components/PageHead/PageHead';
import { useEffect, useState } from 'react';
import { Blockchains } from '@core/enums/blockchains';
import MessageDialog from '@components/dialogs/MessageDialog/MessageDialog';
import MessageDialogContext from '@components/context/MessageDialogContext';
import MainPanel from '@components/MainPanel/MainPanel';
import ConfirmDialog from '@components/dialogs/ConfirmDialog/ConfirmDialog';
import {
  isWalletConnected as isNetworkWalletConnected,
  getWallet as getNetworkWallet,
  connectWallet as connectNetworkWallet,
  isProviderAvailable as isNetworkProviderAvailable,
  isWalletReady as isNetworkWalletReady,
} from '@modules/blockchains/Network/providers/walletProvider';
import logger from '@core/logger/logger';
import { Config } from '@core/config/config';
import {
  getBlockchainNetwork,
  getBlockchainNetworkLabel,
} from '@modules/blockchains/blockchainHelper';
import { authenticateUser } from '@modules/user/userHelper';
import ConnectWallet from '@components/ConnectWallet/ConnectWallet';
import localStorageHelper from '@core/storage/localStorageHelper';
import { Environments } from '@core/enums/environments';

const DashboardPage: NextPage = () => {
  const blockchain = Blockchains.Network;

  // States
  const [messageDialogTitle, setMessageDialogTitle] = useState('');
  const [messageDialogDescription, setMessageDialogDescription] = useState('');
  const [showMessageDialog, setShowMessageDialog] = useState(false);

  const [confirmDialogTitle, setConfirmDialogTitle] = useState('');
  const [confirmDialogDescription, setConfirmDialogDescription] = useState('');
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string>();

  const showMessage = (title: string, message: string) => {
    setMessageDialogTitle(title);
    setMessageDialogDescription(message);
    setShowMessageDialog(true);
  };

  useEffect(() => {
    const init = async () => {
      logger.logInfo('init', 'Checking wallet connection.');

      // Check if wallet is already connected via SDK
      const walletConnected = await isNetworkWalletConnected();
      if (walletConnected) {
        const wallet = await getNetworkWallet();

        logger.logInfo('init', 'Wallet connected on address ' + walletAddress);

        // if (wallet.network === getBlockchainNetwork(blockchain, Config.environment)) {
        //   setIsWalletConnected(true);
        //   if (walletAddress !== wallet.address) {
        //     setWalletAddress(wallet.address);
        //   }
        // } else {
        //   const blockchainLabel = getBlockchainNetworkLabel(blockchain, Config.environment)
        //   showMessage(`Please connect to ${blockchainLabel}`, `App is currently only deployed to ${blockchainLabel}. Please switch your TronLink wallet to use ${blockchainLabel}.`);
        //   return;
        // }
        setIsWalletConnected(true);
        if (walletAddress !== wallet.address) {
          setWalletAddress(wallet.address);
        }

        localStorageHelper.storeWalletAddress(blockchain, walletAddress);

        setIsLoading(true);
        const authenticationSuccessful = await authenticateUser(
          blockchain,
          walletAddress,
        );
        setIsLoading(false);
        setIsUserAuthenticated(authenticationSuccessful);
      } else {
        logger.logInfo('init', 'Wallet not connected.');
      }

      setIsReady(true);
    };
    init();
  }, [walletAddress]);

  const handleOnConnectClick = async () => {
    if (!isNetworkProviderAvailable()) {
      showMessage(
        'Install Metamask',
        'Metamask extension is not installed. Please install it from the Chrome Web Store.',
      );
      return;
    }
    if (!isNetworkWalletReady()) {
      showMessage(
        'Open Metamask Extension First',
        'Metamask wallet is not connected. Please open the extension and connect to a wallet.',
      );
      return;
    }

    await connectNetworkWallet();
    const wallet = await getNetworkWallet();
    const walletAddress = wallet?.address;

    if (walletAddress) {
      localStorageHelper.storeWalletAddress(blockchain, walletAddress);
      localStorageHelper.storeConnectedChain(blockchain);
      setWalletAddress(walletAddress);
    }
  };

  return (
    <MessageDialogContext.Provider value={{ showMessage }}>
      <div className={styles.container}>
        <PageHead />
        <main className={styles.main}>
          {isReady && (!isWalletConnected || !isUserAuthenticated) && (
            <ConnectWallet
              blockchain={blockchain}
              onConnectClick={() => handleOnConnectClick()}
              isLoading={isLoading}
            />
          )}
          {isReady && isWalletConnected && isUserAuthenticated && (
            <MainPanel blockchain={blockchain} walletAddress={walletAddress} />
          )}
        </main>
        {showMessageDialog && (
          <MessageDialog
            show={true}
            title={messageDialogTitle}
            description={messageDialogDescription}
            onClose={() => setShowMessageDialog(false)}
          />
        )}
      </div>
    </MessageDialogContext.Provider>
  );
};

export default DashboardPage;
