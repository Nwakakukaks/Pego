import React, { useContext, useState } from 'react';
import styles from './AppDetails.module.scss';
import { Box, Button, Tab, Tabs, Typography } from '@mui/material';
import { App } from '@core/entities/app';
import Overview from './Overview/Overview';
import BuildSource from './BuildSource/BuildSource';
import Functions from './Functions/Functions';
import Analytics from './Analytics/Analytics';
import { Blockchains } from '@core/enums/blockchains';

interface AppDetailsProps {
  app: App;
  blockchain: Blockchains;
  walletAddress: string;
}

export default function AppDetails({
  app,
  blockchain,
  walletAddress,
}: AppDetailsProps) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  function a11yProps(index: number) {
    return {
      id: `tab-${index}`,
      'aria-controls': `tabpanel-${index}`,
    };
  }

  interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }

  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`tabpanel-${index}`}
        aria-labelledby={`tab-${index}`}
        {...other}
      >
        {value === index && <>{children}</>}
      </div>
    );
  }

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Details" {...a11yProps(0)} />
          <Tab label="Analytics" {...a11yProps(1)} />
          <Tab label="Functions" {...a11yProps(2)} />
          <Tab label="Source" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Overview
          app={app}
          blockchain={blockchain}
          walletAddress={walletAddress}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Analytics app={app} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Functions app={app} />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <BuildSource app={app} />
      </TabPanel>
    </>
  );
}
