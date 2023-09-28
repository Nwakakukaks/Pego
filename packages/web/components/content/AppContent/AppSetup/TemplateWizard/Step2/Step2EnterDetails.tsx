import React, { useEffect, useState } from 'react';
import styles from './Step2EnterDetails.module.scss';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import { Template } from '@core/entities/template';
import { App } from '@core/entities/app';

interface Step2EnterDetailsProps {
  app: App;
  template: Template;
  onInputUpdated: (key: string, value: string) => void;
}

export default function Step2EnterDetails({
  app,
  template,
  onInputUpdated,
}: Step2EnterDetailsProps) {
  const [inputLicense, setInputLicense] = React.useState('UNLICENSED');

  const handleLicenseChange = (event: SelectChangeEvent) => {
    const value = event.target.value as string;
    setInputLicense(value);
    onInputUpdated('license', value);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onInputUpdated(event.target.id, event.target.value);
  };

  const generateContractName = (input: string): string => {
    // Remove leading/trailing spaces
    const trimmedInput = input.trim();

    // Split the string into words
    const words = trimmedInput.split(' ');

    // Convert each word to capitalized case (first letter uppercase)
    const capitalizedWords = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
    );

    // Combine all the words into a single string
    const pascalCaseResult = capitalizedWords.join('');

    return pascalCaseResult;
  };

  const contractName = generateContractName(app.name);

  useEffect(() => {
    onInputUpdated('license', inputLicense);
    onInputUpdated('contractName', contractName);
  }, []);

  return (
    <div>
      <h4>Enter Contract Details</h4>

      <div className={styles.inputContainer}>
        <FormControl fullWidth>
          <InputLabel id="license-label">License</InputLabel>
          <Select
            labelId="license-label"
            id="license"
            value={inputLicense}
            label="License"
            onChange={handleLicenseChange}
            required
          >
            <MenuItem value="Unlicensed">Unlicensed</MenuItem>
            <MenuItem value="MIT">MIT</MenuItem>
            <MenuItem value="Apache-2.0">Apache-2.0</MenuItem>
            <MenuItem value="GPL-3.0">GPL-3.0</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div className={styles.inputContainer}>
        <TextField
          id="contractName"
          label="Smart Contract Name"
          defaultValue={contractName}
          helperText="The name used in your smart contract code. This is only viewable from code and is not visible to users."
          variant="outlined"
          required
          disabled
        />
      </div>

      {template.inputs.map((input) => (
        <div className={styles.inputContainer} key={input.key}>
          <TextField
            id={input.key}
            label={input.label}
            defaultValue={input.defaultValue}
            helperText={input.description}
            variant="outlined"
            onChange={handleInputChange}
            required
          />
        </div>
      ))}
    </div>
  );
}
