import React, { useContext, useState } from 'react';
import styles from './BuildSource.module.scss';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from '@mui/material';
import { App } from '@core/entities/app';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface BuildSourceProps {
  app: App;
}

export default function BuildSource({ app }: BuildSourceProps) {
  return (
    <div className={styles.container}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Source Code</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box p={2} className={styles.codeBlock}>
            <pre style={{ overflowX: 'auto', whiteSpace: 'pre-wrap' }}>
              <code>{app.contractCode}</code>
            </pre>
          </Box>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>ABI</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box p={2} className={styles.codeBlock}>
            <pre style={{ overflowX: 'auto', whiteSpace: 'pre-wrap' }}>
              <code>{JSON.stringify(app.contractAbi)}</code>
            </pre>
          </Box>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>ByteCode</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box p={2} className={styles.codeBlock}>
            <pre style={{ overflowX: 'auto', whiteSpace: 'pre-wrap' }}>
              <code>{app.contractByteCode}</code>
            </pre>
          </Box>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
