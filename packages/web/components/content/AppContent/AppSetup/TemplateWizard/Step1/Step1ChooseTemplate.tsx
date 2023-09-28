import React, { useState } from 'react';
import styles from './Step1ChooseTemplate.module.scss';
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';
import { Template } from '@core/entities/template';
import { TEMPLATES } from '@templates/index';

interface Step1ChooseTemplateProps {
  onSelect?: (selected: Template) => void;
}

export default function Step1ChooseTemplate({
  onSelect,
}: Step1ChooseTemplateProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<Template>();

  const handleSelect = (selected: Template) => {
    setSelectedTemplate(selected);
    onSelect && onSelect(selected);
  };

  const templates = TEMPLATES;

  return (
    <div>
      <Grid container spacing={3}>
        {templates.map((template) => (
          <Grid key={template.templateId} item xs={12} sm={6} md={4}>
            <Box my={1}>
              <Card
                style={{
                  borderTop:
                    selectedTemplate?.templateId === template.templateId
                      ? 'solid 5px orange'
                      : 'none',
                }}
                onClick={() => handleSelect(template)}
              >
                <CardActionArea>
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {template.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {template.description}
                    </Typography>
                    <CardActions>
                      <Button size="small">Select</Button>
                    </CardActions>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Box>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
