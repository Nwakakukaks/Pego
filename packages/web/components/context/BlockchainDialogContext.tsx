import React from 'react';

interface BlockchainDialogContextInterface {
  showBlockchainSelection: () => void;
}

const defaultBlockchainDialogContext: BlockchainDialogContextInterface = {
  showBlockchainSelection: () => {},
};

const BlockchainDialogContext = React.createContext(
  defaultBlockchainDialogContext,
);

export default BlockchainDialogContext;
