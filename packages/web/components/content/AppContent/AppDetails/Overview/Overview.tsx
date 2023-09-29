
  import React, { useContext, useEffect, useState } from 'react';
import styles from './Overview.module.scss';
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Typography,
} from '@mui/material';
import { App } from '@core/entities/app';
import { Environments } from '@core/enums/environments';
import {
  deployContract,
  getExplorerAddressUrl,
  getExplorerTxUrl,
  shortenHash,
} from '@modules/blockchains/Network/providers/walletProvider';
import MessageDialogContext from '@components/context/MessageDialogContext';
import DeployDialog from '@components/dialogs/DeployDialog/DeployDialog';
import { Blockchains } from '@core/enums/blockchains';
import { updateAppDeployment } from '@services/web/appService';
import { formatDate } from '@core/helpers/datetimeHelper';

interface OverviewProps {
  app: App;
  blockchain: Blockchains;
  walletAddress: string;
}

type Row = {
  environment: Environments;
  status: string;
  wallet: string;
  contractAddress: string;
  transactionHash: string;
  date: string;
};

export default function Overview({
  app,
  blockchain,
  walletAddress,
}: OverviewProps) {
  const { showMessage } = useContext(MessageDialogContext);

  const [isDeploying, setIsDeploying] = useState(false);
  const [deployEnvironment, setDeployEnvironment] = useState<Environments>();
  const [showDeployDialog, setShowDeployDialog] = useState(false);
  const [tableRows, setTableRows] = useState<Row[]>([]);
  const [currentApp, setCurrentApp] = useState<App>(app);

  useEffect(() => {
    refresh(app);
  }, [app]);

  const refresh = (app: App) => {
    // Map the deployments to rows
    const rows: Row[] =
      app.deployments?.map((deployment) => ({
        environment: deployment.environment,
        status: deployment.transactionHash ? 'Deployed' : 'Not Deployed',
        wallet: deployment.walletAddress,
        contractAddress: deployment.contractAddress || null,
        transactionHash: deployment.transactionHash || null,
        date: formatDate(deployment.createdDateUTC),
      })) || [];

    // Add a default row for each environment if it doesn't already exist
    [Environments.PegoMainnet, Environments.PegoTestnet,].forEach((env) => {
      if (!rows.find((row) => row.environment === env)) {
        rows.push({
          environment: env,
          status: 'Not Deployed',
          wallet: null,
          contractAddress: null,
          transactionHash: null,
          date: null,
        });
      }
    });

    setTableRows(rows);
    setCurrentApp(app);
  };

  const prepareDeployment = async (environment: Environments) => {
    setDeployEnvironment(environment);
    setShowDeployDialog(true);
  };

  const deploy = async (gasLimit: string, args: Record<string, string>) => {
    try {
      setIsDeploying(true);

      // const initialSupply = BigInt(1000) * BigInt(10**18); 1000000000000000000000
      // const parsedArgs = [initialSupply.toString()];

      // Deploy contract
      const parsedArgs = getArgumentValues(args);

      const deploymentReceipt = await deployContract(
        app.contractByteCode,
        app.contractAbi,
        parsedArgs,
        deployEnvironment,
        gasLimit.toString(),
      );
      console.log(
        `Contract deployed at address: ${deploymentReceipt.contractAddress} on transaction ${deploymentReceipt.transactionHash}`,
      );

      // const deploymentReceipt = {
      //   transactionHash:
      //     '0x5625115c852b2be45d82f88d96dac19d4a8d0565abcf76cca65e10a95f742a45',
      //   contractAddress: '0x8c8538493537859b23de8bc76dd2044bcfc533d3',
      // };

      // Update app
      const response = await updateAppDeployment({
        app,
        walletAddress,
        environment: deployEnvironment,
        blockchain,
        transactionHash: deploymentReceipt.transactionHash,
        contractAddress: deploymentReceipt.contractAddress,
      });
      if (response) {
        const updatedApp: App = response as App;
        if (updatedApp) {
          refresh(updatedApp);
        }

        showMessage(
          'Deployment Successful',
          'Your contract has been successfully deployed.',
        );
      } else {
        showMessage(
          'Deployment Incomplete',
          'Your contract was deployed successfully but failed to update on Pegora.',
        );
      }

      setIsDeploying(false);
    } catch (error) {
      console.error('Error deploying contract: ', error);
      setIsDeploying(false);
      showMessage(
        'Deployment Failed',
        'An error occured while deploying your contract. Try increasing the gas limit.',
      );
    }
  };

  const getArgumentValues = (args: Record<string, string>): string[] => {
    return Object.values(args);
  };

  return (
    <div className={styles.container}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="table">
          <TableHead>
            <TableRow>
              <TableCell>Environment</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Transaction Hash</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Deployed Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableRows.map((row, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{row.environment}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>
                  {row.transactionHash ? (
                    <a rel='noreferrer'
                      target="_blank"
                      href={getExplorerTxUrl(
                        row.environment,
                        row.transactionHash,
                      )}
                    >
                      {shortenHash(row.transactionHash)}
                    </a>
                  ) : (
                    'N/A'
                  )}
                </TableCell>
                <TableCell>
                  {row.wallet ? (
                    <a
                     rel='noreferrer'
                      target="_blank"
                      href={getExplorerAddressUrl(row.environment, row.wallet)}
                    >
                      {shortenHash(row.wallet)}
                    </a>
                  ) : (
                    'N/A'
                  )}
                </TableCell>
                <TableCell>
                  {row.date && <>{row.date}</>}
                  {!row.date && (
                    <Button
                      variant="contained"
                      disabled={isDeploying}
                      endIcon={
                        isDeploying ? <CircularProgress size="1rem" /> : <></>
                      }
                      onClick={() => prepareDeployment(row.environment)}
                    >
                      Deploy
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <DeployDialog
        show={showDeployDialog}
        app={currentApp}
        blockchain={Blockchains.Network}
        environment={deployEnvironment}
        onCancel={() => setShowDeployDialog(false)}
        onDeploy={(gasLimit, args) => deploy(gasLimit, args)}
      />
    </div>
  );
}
