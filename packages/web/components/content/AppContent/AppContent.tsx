import { App } from '@core/entities/app';
import React, { useContext, useEffect, useState } from 'react';
import CreateAppSelection from './AppSetup/CreateAppSelection/CreateAppSelection';
import styles from './AppContent.module.scss';
import TemplateWizard from './AppSetup/TemplateWizard/TemplateWizard';
import { Button } from '@mui/material';
import { deleteDapp, fetchDapps } from '@services/web/appService';
import ConfirmDialog from '@components/dialogs/ConfirmDialog/ConfirmDialog';
import { AppStatuses } from '@core/enums/appStatuses';
import AppDetails from './AppDetails/AppDetails';
import { AppCreationModes } from '@core/enums/appCreationModes';
import { Blockchains } from '@core/enums/blockchains';

interface AppContentProps {
  app: App;
  blockchain: Blockchains;
  walletAddress: string;
  onDeletedApp: () => void;
  onRefreshApp: () => void;
}

const AppContent = ({
  app,
  blockchain,
  walletAddress,
  onDeletedApp,
  onRefreshApp,
}: AppContentProps) => {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [currentApp, setCurrentApp] = useState(app);
  const [selectedAppCreationMode, setSelectedAppCreationMode] =
    useState<AppCreationModes>(AppCreationModes.Template);
  const [isBegin, setIsBegin] = useState<boolean>(false);

  const handleDeleteApp = async () => {
    await deleteDapp({ appId: currentApp.appId });
    setShowConfirmDialog(false);
    onDeletedApp && onDeletedApp();
  };

  const handleSetupFinish = async () => {
    onRefreshApp && onRefreshApp();
  };

  useEffect(() => {
    setCurrentApp(app);
  }, [app]);

  return (
    <>
      {currentApp.status === AppStatuses.PendingContract && !isBegin && (
        <>
          <h3>Select an option to begin</h3>
          <CreateAppSelection
            onSelect={(selected) => setSelectedAppCreationMode(selected)}
          />
          <div className={styles.actionButtonsContainer}>
            <Button
              color="error"
              variant="outlined"
              onClick={() => setShowConfirmDialog(true)}
            >
              Delete App
            </Button>
            <Button
              color="primary"
              disabled={selectedAppCreationMode !== AppCreationModes.Template}
              variant="contained"
              onClick={() => setIsBegin(true)}
            >
              Begin Setup
            </Button>
          </div>
        </>
      )}

      {currentApp.status === AppStatuses.PendingContract &&
        selectedAppCreationMode === AppCreationModes.Template &&
        isBegin && (
          <>
            <h3>Create App from Template</h3>
            <TemplateWizard
              app={currentApp}
              onSetupFinish={() => handleSetupFinish()}
            />
          </>
        )}

      {(currentApp.status === AppStatuses.Compiled ||
        currentApp.status === AppStatuses.DeployedToPegoMainnet ||
        currentApp.status === AppStatuses.DeployedToPegoTestnet ) && (
        <>
          <AppDetails
            app={currentApp}
            blockchain={blockchain}
            walletAddress={walletAddress}
          />
          <div className={styles.actionButtonsContainer}>
            <Button
              color="error"
              variant="outlined"
              onClick={() => setShowConfirmDialog(true)}
            >
              Delete App
            </Button>
          </div>
        </>
      )}

      {showConfirmDialog && (
        <ConfirmDialog
          show={true}
          title="Confirm Delete?"
          description="Are you sure you want to delete this currentApp?"
          onCancel={() => setShowConfirmDialog(false)}
          onConfirm={() => handleDeleteApp()}
        />
      )}
    </>
  );
};

export default AppContent;
