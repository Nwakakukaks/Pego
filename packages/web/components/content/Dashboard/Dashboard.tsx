import { App } from '@core/entities/app';
import {
  Grid,
  Box,
  Card,
  Button,
  CardActionArea,
  CardContent,
  Typography,
  CardActions,
  Avatar,
  CardHeader,
  CardMedia,
  IconButton,
} from '@mui/material';
import { fetchDapps } from '@services/web/appService';
import React, { useEffect, useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import seedColor from 'seed-color';
import { formatFullDate } from '@core/helpers/datetimeHelper';

interface DashboardProps {
  onSelectApp: (selectedApp: App) => void;
}

const Dashboard = ({ onSelectApp }: DashboardProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [apps, setApps] = useState<App[]>();

  useEffect(() => {
    loadApps();
  }, []);

  const loadApps = async () => {
    setIsLoading(true);

    const userApps: App[] = await fetchDapps();

    setApps(userApps);

    setIsLoading(false);
  };

  const handleSelect = (app: App) => {
    onSelectApp(app);
  };

  return (
    <>
      <h3>My Apps</h3>
      <Grid container spacing={3}>
        {!isLoading && apps && apps.length === 0 && (
          <div>You do not have any apps yet.</div>
        )}
        {!isLoading &&
          apps &&
          apps.map((app) => (
            <Grid key={app.appId} item xs={12} sm={6} md={4}>
              <Box my={1}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardHeader
                    avatar={
                      <Avatar
                        sx={{ bgcolor: seedColor(app.name).toHex() }}
                        aria-label="recipe"
                      >
                        {app.name.slice(0, 1).toUpperCase()}
                      </Avatar>
                    }
                    action={
                      <IconButton aria-label="settings">
                        <MoreVertIcon />
                      </IconButton>
                    }
                    title={app.name}
                    subheader={formatFullDate(app.createdDateUTC)}
                  />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      {app.description ? app.description : 'Smart Contract'}
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                      <FavoriteIcon />
                    </IconButton>
                    <Button onClick={() => handleSelect(app)}>View</Button>
                  </CardActions>
                </Card>
              </Box>
            </Grid>
          ))}
      </Grid>
    </>
  );
};

export default Dashboard;
