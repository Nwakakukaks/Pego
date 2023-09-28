import { Blockchains } from '@core/enums/blockchains';
import { Environments } from '@core/enums/environments';
import {
  TableContainer,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table,
  Button,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import styles from './Wallets.module.scss';
import { UserWallet } from '@core/entities/userWallet';
import { fetchUserWallet } from '@services/web/userService';
import { formatDate } from '@core/helpers/datetimeHelper';

interface WalletsProps {
  blockchain: Blockchains;
  walletAddress: string;
}

type Row = {
  blockchain: string;
  walletAddress: string;
  connectedDate: string;
};

const Wallets = ({ blockchain, walletAddress }: WalletsProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userWallets, setUserWallets] = useState<UserWallet[]>();

  useEffect(() => {
    // TODO: change to fetch all wallets
    loadUserWallets();
  }, []);

  const loadUserWallets = async () => {
    setIsLoading(true);

    const wallet: UserWallet = await fetchUserWallet(walletAddress);

    setUserWallets([wallet]);

    setIsLoading(false);
  };

  return (
    <>
      <h3>Linked Wallets</h3>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Blockchain</TableCell>
              <TableCell>Wallet Address</TableCell>
              <TableCell>Connected Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userWallets &&
              userWallets.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{blockchain}</TableCell>
                  <TableCell>{row.walletAddress}</TableCell>
                  <TableCell>{formatDate(row.createdDateUTC)}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className={styles.buttonContainer}>
        <Button variant="contained">Link a new wallet</Button>
      </div>
    </>
  );
};

export default Wallets;
