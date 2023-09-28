import React, { useState } from 'react';
import styles from './Step4Deploy.module.scss';
import { Template } from '@core/entities/template';
import { UserTemplateInput } from '@core/entities/userTemplateInput';
import { App } from '@core/entities/app';

interface Step4DeployProps {
  app: App;
}

export default function Step4Deploy({ app }: Step4DeployProps) {
  return (
    <div>
      <h4>Your Contact Is Ready</h4>
      <div>You can now proceed to deploy the contract.</div>
    </div>
  );
}
