import React from 'react';

interface MessageDialogContextInterface {
  showMessage: (title: string, message: string) => void;
}

const defaultMessageDialogContext: MessageDialogContextInterface = {
  showMessage: () => {},
};

const MessageDialogContext = React.createContext(defaultMessageDialogContext);

export default MessageDialogContext;
