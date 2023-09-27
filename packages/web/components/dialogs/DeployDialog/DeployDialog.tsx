import React, { useContext, useState, useEffect } from 'react';
import styles from './DeployDialog.module.scss';
import { Modal, Button, Form } from 'react-bootstrap';
import MessageDialogContext from '@components/context/MessageDialogContext';
import { Blockchains } from '@core/enums/blockchains';
import { Environments } from '@core/enums/environments';
import { App } from '@core/entities/app';

interface DeployDialogProps {
  show: boolean;
  app: App;
  blockchain: Blockchains;
  environment: Environments;
  onCancel: () => void;
  onDeploy: (gasLimit: string, args: Record<string, string>) => void;
}

export default function DeployDialog({
  show,
  app,
  blockchain,
  environment,
  onCancel,
  onDeploy,
}: DeployDialogProps) {
  const [gasLimit, setGasLimit] = useState<string>('2500000');
  const [constructorInputs, setConstructorInputs] = useState<
    Record<string, string>
  >({});

  const constructorParams =
    app.contractAbi.find((item) => item.type === 'constructor')?.inputs || [];

  useEffect(() => {
    // Initialize state with constructor parameter names
    const initialInputs = constructorParams.reduce((acc, param) => {
      acc[param.name] = '';
      return acc;
    }, {} as Record<string, string>);
    setConstructorInputs(initialInputs);
  }, [constructorParams]);

  const handleDeployClick = () => {
    onDeploy(gasLimit, constructorInputs);
  };

  const handleInputChange = (paramName: string, value: string) => {
    setConstructorInputs((prev) => ({ ...prev, [paramName]: value }));
  };

  return (
    <Modal
      show={show}
      size="lg"
      onHide={onCancel}
      backdrop="static"
      centered={true}
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Deploy Contract</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          You are about to deploy {app.name} to {blockchain}: {environment}.
        </div>
        <Form className="mt-3">
          <Form.Group className="mb-3">
            <Form.Label>Gas Limit</Form.Label>
            <Form.Control
              type="number"
              placeholder="Eg: 2500000"
              value={gasLimit}
              onChange={(e) => setGasLimit(e.target.value)}
            />
          </Form.Group>
          {constructorParams.map((param) => (
            <Form.Group key={param.name} className="mb-3">
              <Form.Label>{param.name}</Form.Label>
              <Form.Control
                type="text"
                placeholder={param.type}
                value={constructorInputs[param.name] || ''}
                onChange={(e) => handleInputChange(param.name, e.target.value)}
              />
            </Form.Group>
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleDeployClick}>
          Deploy
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
