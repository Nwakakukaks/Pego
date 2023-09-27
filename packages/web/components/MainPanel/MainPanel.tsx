import MessageHeader from '@components/MessageHeader/MessageHeader';
import SideBar from '@components/SideBar/SideBar';
import { Blockchains } from '@core/enums/blockchains';
import React, { useContext, useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { SelectedMenu } from '@core/enums/menu';
import { App } from '@core/entities/app';
import Dashboard from '@components/content/Dashboard/Dashboard';
import AppContent from '@components/content/AppContent/AppContent';
import Wallets from '@components/content/Wallets/Wallets';
import AddVersionDialog from '@components/dialogs/AddVersionDialog/AddVersionDialog';
import MessageDialogContext from '@components/context/MessageDialogContext';

interface MainPanelProps {
  blockchain: Blockchains;
  walletAddress: string;
}

const MainPanel = ({ blockchain, walletAddress }: MainPanelProps) => {
  const { showMessage } = useContext(MessageDialogContext);

  const [selectedMenu, setSelectedMenu] = useState<SelectedMenu>(
    SelectedMenu.Dashboard,
  );
  const [selectedApp, setSelectedApp] = useState<App>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [showAddVersionDialog, setShowAddVersionDialog] = useState(false);
  const [appListRefreshTrigger, setAppListRefreshTrigger] = useState(0);

  const handleSelectMenu = async (
    selectedMenu: SelectedMenu,
    selectedApp?: App,
  ) => {
    setSelectedMenu(selectedMenu);
    setSelectedApp(selectedApp);
  };

  const getHeaderTitle = () => {
    if (selectedMenu === SelectedMenu.App) {
      return selectedApp.name;
    } else {
      if (selectedMenu === SelectedMenu.Dashboard) {
        return 'Dashboard';
      }
      if (selectedMenu === SelectedMenu.Wallets) {
        return 'Wallets';
      }
    }
  };

  const getHeaderSubtitle = () => {
    if (selectedMenu === SelectedMenu.App) {
      return 'Version 1.0.0';
    } else {
      if (selectedMenu === SelectedMenu.Dashboard) {
        return 'Overview of your apps';
      }
      if (selectedMenu === SelectedMenu.Wallets) {
        return 'Linked wallets';
      }
    }
  };

  const handleAppListRefresh = () => {
    setAppListRefreshTrigger((prev) => prev + 1);
    handleSelectMenu(SelectedMenu.Dashboard);
  };

  const handleAddVersion = (version: string) => {
    showMessage(
      'Coming Soon',
      'Adding new version feature will be available soon.',
    );
  };

  return (
    <>
      <Container fluid>
        <Row className="flex-container">
          <SideBar
            isOpen={isMenuOpen}
            selectedMenu={selectedMenu}
            selectedApp={selectedApp}
            refreshTrigger={appListRefreshTrigger}
            onSelectMenu={(selectedMenu, selectedApp) =>
              handleSelectMenu(selectedMenu, selectedApp)
            }
          />

          <div id="page-content-wrapper">
            <MessageHeader
              title={getHeaderTitle()}
              subtitle={getHeaderSubtitle()}
              onMenuClick={() => setIsMenuOpen(!isMenuOpen)}
              onNewVersionClick={() => setShowAddVersionDialog(true)}
            />
            <div className="page-content">
              {selectedMenu === SelectedMenu.Dashboard && (
                <Dashboard
                  onSelectApp={(app) => handleSelectMenu(SelectedMenu.App, app)}
                />
              )}
              {selectedMenu === SelectedMenu.Wallets && (
                <Wallets
                  blockchain={blockchain}
                  walletAddress={walletAddress}
                />
              )}
              {selectedMenu === SelectedMenu.App && (
                <AppContent
                  app={selectedApp}
                  blockchain={blockchain}
                  walletAddress={walletAddress}
                  onDeletedApp={() => handleAppListRefresh()}
                  onRefreshApp={() => handleAppListRefresh()}
                />
              )}
            </div>
          </div>
        </Row>
      </Container>
      <AddVersionDialog
        show={showAddVersionDialog}
        onCancel={() => setShowAddVersionDialog(false)}
        onAddedVersion={(version) => handleAddVersion(version)}
      />
    </>
  );
};

export default MainPanel;
