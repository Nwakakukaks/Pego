import FlatCardItem from '@components/FlatCardItem/FlatCardItem';
import React, { useEffect, useState } from 'react';
import { Skeleton } from '@mui/material';
import styles from './SideBar.module.scss';
import { App } from '@core/entities/app';
import CreateAppDialog from '@components/dialogs/CreateAppDialog/CreateAppDialog';
import { SelectedMenu } from '@core/enums/menu';
import { fetchDapps } from '@services/web/appService';
import Link from 'next/link'

interface SideBarProps {
  isOpen: boolean;
  selectedMenu: SelectedMenu;
  selectedApp: App;
  refreshTrigger: number;
  onSelectMenu: (selectedMenu: SelectedMenu, selectedApp?: App) => void;
}

const SideBar = ({
  isOpen,
  selectedMenu,
  selectedApp,
  refreshTrigger,
  onSelectMenu,
}: SideBarProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showCreateAppDialog, setShowCreateAppDialog] = useState(false);
  const [apps, setApps] = useState<App[]>();

  useEffect(() => {
    loadApps();
  }, [refreshTrigger]);

  const loadApps = async () => {
    setIsLoading(true);

    const userApps: App[] = await fetchDapps();

    setApps(userApps);

    setIsLoading(false);
  };

  const handleNewConversationClick = () => {
    setShowCreateAppDialog(true);
  };

  const handleCreatedApp = async (name: string) => {
    setShowCreateAppDialog(false);

    await loadApps();
  };

  const handleSelectMenu = (menu: SelectedMenu) => {
    onSelectMenu && onSelectMenu(menu);
  };

  const handleSelectApp = (app: App) => {
    onSelectMenu && onSelectMenu(SelectedMenu.App, app);
  };

  return (
    <>
      <div
        id="sidebar-wrapper"
        style={{ marginLeft: `${isOpen ? '0' : '-360px'}` }}
      >
        <div className="sidebar">
          <Link href="/" >
           <p className='mb-4 ml-3' >Zhelp</p>
          </Link>
          {isLoading && (
            <nav className="tree-nav">
              <Skeleton
                className={styles.skeletonLoader}
                variant="rounded"
                height={60}
                animation="wave"
              />
              <Skeleton
                className={styles.skeletonLoader}
                variant="rounded"
                height={60}
                animation="wave"
              />
            
            </nav>
          )}
          <a
            onClick={() => handleSelectMenu(SelectedMenu.Dashboard)}
            style={{ cursor: 'pointer' }}
          >
            <FlatCardItem
              name="Dashboard"
              description=""
              isSelected={selectedMenu === SelectedMenu.Dashboard}
            />
          </a>
          <a
            onClick={() => handleSelectMenu(SelectedMenu.Wallets)}
            style={{ cursor: 'pointer' }}
          >
            <FlatCardItem
              name="Wallets"
              description=""
              isSelected={selectedMenu === SelectedMenu.Wallets}
            />
          </a>
          <hr />
          <h6 className='mt-4 ml-2'>My Apps</h6>
          {!isLoading && (
            <nav className="tree-nav">
              {apps?.map((app) => {
                return (
                  <a
                    key={app.appId}
                    onClick={() => handleSelectApp(app)}
                    style={{ cursor: 'pointer' }}
                  >
                    <FlatCardItem
                      name={app.name}
                      description="Smart Contract"
                      isSelected={
                        selectedMenu === SelectedMenu.App &&
                        app.appId === selectedApp?.appId
                      }
                    />
                  </a>
                );
              })}
              <a
                className="tree-nav__item-title highlight"
                onClick={() => handleNewConversationClick()}
              >
                CREATE NEW APP
              </a>
            </nav>
          )}
        </div>
      </div>
      {showCreateAppDialog && (
        <CreateAppDialog
          show={true}
          onCancel={() => setShowCreateAppDialog(false)}
          onCreated={(name) => handleCreatedApp(name)}
        />
      )}
    </>
  );
};

export default SideBar;
