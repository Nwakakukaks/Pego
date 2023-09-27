import React from 'react';

interface ConfirmDialogContextInterface {
  showConfirm: (title: string, message: string, onConfirm: () => void) => void;
}

const defaultConfirmDialogContext: ConfirmDialogContextInterface = {
  showConfirm: () => {},
};

const ConfirmDialogContext = React.createContext(defaultConfirmDialogContext);

export default ConfirmDialogContext;
