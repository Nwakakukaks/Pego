import React, { useContext, useState } from 'react';
import styles from './Analytics.module.scss';
import { Card, CardContent, Typography } from '@mui/material';
import { App } from '@core/entities/app';
import BarChartIcon from '@mui/icons-material/BarChart';

interface AnalyticsProps {
  app: App;
}

export default function Analytics({ app }: AnalyticsProps) {
  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <CardContent>
          <BarChartIcon color="warning" style={{ fontSize: 60 }} />
          <Typography variant="h5" color="textSecondary" align="center">
            Analytics & Insights
          </Typography>
          <Typography variant="body2" color="textSecondary" align="center">
            This feature is under development and will be available later.
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
