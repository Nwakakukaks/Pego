import React, { useState } from 'react';
import styles from './Functions.module.scss';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TextField,
  Box,
  Button,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { App } from '@core/entities/app';

interface FunctionsProps {
  app: App;
}

export default function Functions({ app }: FunctionsProps) {
  const contractAbi = app.contractAbi;

  const parseContractAbi = (contractAbi) => {
    return contractAbi.filter((item) => item.type === 'function');
  };

  const [parsedAbi, setParsedAbi] = useState(parseContractAbi(contractAbi));

  return (
    <div className={styles.container}>
      {parsedAbi.map((func, index) => {
        return (
          <Accordion key={index} sx={{ marginBottom: '20px' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">
                {func.name}{' '}
                <span className={styles.muted}>
                  {func.stateMutability === 'view' ? 'View' : 'Transaction'}
                </span>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box>
                {func.inputs.map((input, index) => (
                  <TextField
                    key={index}
                    label={input.name}
                    helperText={`Type: ${input.type}`}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                ))}
              </Box>
              <div className={styles.buttonContainer}>
                <Button variant="outlined">Send</Button>
              </div>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
}
