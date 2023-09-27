import React from 'react';
import styles from './MessageHeader.module.scss';
import { AppBar, Box, Toolbar, Typography, IconButton } from '@mui/material';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import AddIcon from '@mui/icons-material/Add';
import AddCircleIcon from '@mui/icons-material/AddCircle';

interface MessageHeaderProps {
  title: string;
  subtitle: string;
  onMenuClick: () => void;
  onNewVersionClick: () => void;
}

const MessageHeader = ({
  title,
  subtitle,
  onMenuClick,
  onNewVersionClick,
}: MessageHeaderProps) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className="muiAppBar">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => onMenuClick()}
          >
            <KeyboardDoubleArrowLeftIcon />
          </IconButton>
          <Typography variant="body1" component="div" sx={{ flexGrow: 1 }}>
            <div className={styles.textWrapper}>
              <span className={styles.name}>{title}</span>
              <span className={styles.description}>{subtitle}</span>
            </div>
          </Typography>
          {subtitle.indexOf('Version') >= 0 && (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => onNewVersionClick()}
            >
              <AddCircleIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default MessageHeader;
