import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { AppCreationModes } from '@core/enums/appCreationModes';

interface AppCreationModeCardProps {
  appCreationMode: AppCreationModes;
  selected: boolean;
  onSelect?: () => void;
}

export default function AppCreationModeCard({
  appCreationMode,
  selected,
  onSelect,
}: AppCreationModeCardProps) {
  let display: {
    title: string;
    subtitle: string;
  } = {
    title: '',
    subtitle: '',
  };

  if (appCreationMode === AppCreationModes.Template) {
    display = {
      title: 'Create from Template',
      subtitle:
        'Create your Smart Contract from a collection of pre-defined templates. No coding required.',
    };
  }
  if (appCreationMode === AppCreationModes.Custom) {
    display = {
      title: 'Use Custom Code',
      subtitle: '(Coming soon) Create your Smart Contract with your own code.',
    };
  }
  if (appCreationMode === AppCreationModes.Import) {
    display = {
      title: 'Import Existing Contract',
      subtitle:
        '(Coming Soon) Import an existing Smart Contract which has previously been deployed.',
    };
  }

  return (
    <Card
      style={{ borderTop: selected ? 'solid 5px orange' : 'none' }}
      onClick={onSelect && onSelect}
    >
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {display.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {display.subtitle}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
