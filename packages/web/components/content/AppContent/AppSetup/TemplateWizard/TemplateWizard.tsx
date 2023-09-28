import React, { useContext, useEffect, useState } from 'react';
import styles from './TemplateWizard.module.scss';
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material';
import { Template } from '@core/entities/template';
import { App } from '@core/entities/app';
import Step1ChooseTemplate from './Step1/Step1ChooseTemplate';
import Step2EnterDetails from './Step2/Step2EnterDetails';
import { UserTemplateInput } from '@core/entities/userTemplateInput';
import Step4Deploy from './Step4/Step4Deploy';
import Step3Review from './Step3/Step3Review';
import MessageDialogContext from '@components/context/MessageDialogContext';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CircularProgress from '@mui/material/CircularProgress';
import { CompileParams, compile } from '@services/web/compileService';

interface TemplateWizardProps {
  app: App;
  onSetupFinish: () => void;
}

export default function TemplateWizard({
  app,
  onSetupFinish,
}: TemplateWizardProps) {
  const { showMessage } = useContext(MessageDialogContext);

  const [currentStep, setCurrentStep] = useState<number>(0);
  const [selectedTemplate, setSelectedTemplate] = useState<Template>();
  const [userInput, setUserInput] = useState<UserTemplateInput>();
  const [reviewedCode, setReviewedCode] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setCurrentStep(0);
    setSelectedTemplate(undefined);
    setUserInput(undefined);
    setReviewedCode(undefined);
    setIsLoading(false);
  }, [app]);

  const steps = ['Choose Template', 'Enter Details', 'Review & Build', 'Ready'];

  const handleNext = async () => {
    if (currentStep === 3) return;

    if (currentStep === 0) {
      // Choose Template > Enter Details
      setCurrentStep(currentStep + 1);
    }

    if (currentStep === 1) {
      // Enter Details > Review
      const mergedCode = mergeInput(selectedTemplate.code, userInput);

      if (mergedCode.indexOf('{{') > 0 || mergedCode.indexOf('}}') > 0) {
        showMessage('Enter all fields', 'Please enter all required fields');
        return;
      }
      setReviewedCode(mergedCode);
      setCurrentStep(currentStep + 1);
    }

    if (currentStep === 2) {
      // Review > (Compile) > Ready
      // Compile code and call API to save
      setIsLoading(true);

      const contractName = userInput.userInputs.find(
        (item) => item.key === 'contractName',
      ).value;

      const param: CompileParams = {
        appId: app.appId,
        contractName: contractName,
        code: reviewedCode,
        templateId: selectedTemplate.templateId,
      };

      const isSuccessful = await compile(param);

      setIsLoading(false);
      if (isSuccessful) {
        setCurrentStep(currentStep + 1);
      } else {
        showMessage(
          'Compilation Failed',
          'There were errors compiling your contract.',
        );
      }
    }
  };

  const handleFinish = async () => {
    onSetupFinish && onSetupFinish();
  };

  const handleBack = async () => {
    if (currentStep === 0) return;
    setCurrentStep(currentStep - 1);
  };

  const handleInputUpdated = (key: string, value: string) => {
    setUserInput((prevState) => {
      // Check if input with the same key already exists
      const existingInputIndex = prevState?.userInputs.findIndex(
        (input) => input.key === key,
      );

      // Copy the existing inputs to a new array or create a new empty array if no inputs exist
      const newUserInputs = [...(prevState?.userInputs || [])];

      if (existingInputIndex != null && existingInputIndex >= 0) {
        // If input with the same key exists, update its value
        newUserInputs[existingInputIndex] = { key, value };
      } else {
        // If it doesn't exist, add it to the array
        newUserInputs.push({ key, value });
      }

      // Return the new state
      return { userInputs: newUserInputs };
    });
  };

  const mergeInput = (code: string, userInput: UserTemplateInput) => {
    if (!userInput?.userInputs || userInput.userInputs.length === 0) {
      return code;
    }

    // Create a key-value map from userInput
    const inputMap = new Map(
      userInput.userInputs.map((input) => [input.key, input.value]),
    );

    // Use regex to replace placeholders with values from userInput
    let newCode = code.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      return inputMap.get(key) || match; // If the key doesn't exist, return the original placeholder
    });

    newCode = newCode.replaceAll('\\n', '\n');

    return newCode;
  };

  return (
    <>
      <div className={styles.stepContainer}>
        <Stepper activeStep={currentStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>

      {currentStep === 0 && (
        <>
          <Step1ChooseTemplate
            onSelect={(template) => setSelectedTemplate(template)}
          />
          <div className={styles.actionButtonsContainer}>
            <Button
              color="primary"
              disabled={false}
              variant="outlined"
              onClick={() => handleBack()}
            >
              Cancel
            </Button>
            <Button
              color="primary"
              disabled={selectedTemplate === undefined}
              variant="contained"
              endIcon={<ArrowForwardIcon />}
              onClick={() => handleNext()}
            >
              Enter Details
            </Button>
          </div>
        </>
      )}

      {currentStep === 1 && (
        <>
          <Step2EnterDetails
            app={app}
            template={selectedTemplate}
            onInputUpdated={(key, value) => handleInputUpdated(key, value)}
          />
          <div className={styles.actionButtonsContainer}>
            <Button
              color="primary"
              disabled={false}
              variant="outlined"
              onClick={() => handleBack()}
            >
              Back
            </Button>
            <Button
              color="primary"
              disabled={false}
              variant="contained"
              endIcon={<ArrowForwardIcon />}
              onClick={() => handleNext()}
            >
              Review Code
            </Button>
          </div>
        </>
      )}

      {currentStep === 2 && (
        <>
          <Step3Review app={app} code={reviewedCode} />
          <div className={styles.actionButtonsContainer}>
            <Button
              color="primary"
              disabled={isLoading}
              variant="outlined"
              onClick={() => handleBack()}
            >
              Back
            </Button>
            <Button
              color="primary"
              disabled={isLoading}
              variant="contained"
              endIcon={
                isLoading ? (
                  <CircularProgress size="1rem" />
                ) : (
                  <ArrowForwardIcon />
                )
              }
              onClick={() => handleNext()}
            >
              Compile
            </Button>
          </div>
        </>
      )}

      {currentStep === 3 && (
        <>
          <Step4Deploy app={app} />

          <div className={styles.actionButtonsContainer}>
            <Button
              color="primary"
              disabled={false}
              variant="contained"
              onClick={() => handleFinish()}
            >
              Finish
            </Button>
          </div>
        </>
      )}
    </>
  );
}
