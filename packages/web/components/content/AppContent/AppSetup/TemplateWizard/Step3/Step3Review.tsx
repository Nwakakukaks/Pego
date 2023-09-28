import React, { useState } from 'react';
import styles from './Step3Review.module.scss';
import { Template } from '@core/entities/template';
import { UserTemplateInput } from '@core/entities/userTemplateInput';
import { App } from '@core/entities/app';
import { Box, Paper, Typography } from '@mui/material';

interface Step3ReviewProps {
  app: App;
  code: string;
}

export default function Step3Review({ app, code }: Step3ReviewProps) {
  return (
    <div>
      <h4>{app.name} Contract Code</h4>
      <Typography variant="body1">
        Here is the code ready for review.
      </Typography>
      <Box mt={2}>
        <Paper elevation={2}>
          <Box p={2}>
            <pre style={{ overflowX: 'auto', whiteSpace: 'pre-wrap' }}>
              <code>{code}</code>
            </pre>
          </Box>
        </Paper>
      </Box>
    </div>
  );
}
