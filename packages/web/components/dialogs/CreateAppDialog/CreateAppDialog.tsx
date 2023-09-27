import React, { useContext, useState } from 'react';
import styles from './CreateAppDialog.module.scss';
import { Modal, Button, Form } from 'react-bootstrap';
import MessageDialogContext from '@components/context/MessageDialogContext';
import { createDapp } from '@services/web/appService';

interface CreateAppDialogProps {
  show: boolean;
  onCancel: () => void;
  onCreated: (name: string) => void;
}

export default function CreateAppDialog({
  show,
  onCancel,
  onCreated,
}: CreateAppDialogProps) {
  const { showMessage } = useContext(MessageDialogContext);

  const [isLoading, setIsLoading] = useState(false);
  const [inputName, setInputName] = useState<string>();
  const [inputDescription, setInputDescription] = useState<string>();

  const handleCreateApp = async () => {
    if (!inputName) {
      showMessage('Enter app name', 'Please enter a name for your app.');
      return;
    }

    setIsLoading(true);

    await createDapp({
      name: inputName,
      description: inputDescription,
    });

    setIsLoading(false);
    onCreated(inputName);
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
        <Modal.Title>Create New App</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="mt-3">
          <Form.Group className="mb-3">
            <Form.Label>App Name</Form.Label>
            <Form.Control
              type="input"
              placeholder="Enter a name for your app"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="input"
              placeholder="Description (optional)"
              value={inputDescription}
              onChange={(e) => setInputDescription(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => onCancel()}>
          Cancel
        </Button>
        {!isLoading && (
          <Button variant="primary" onClick={() => handleCreateApp()}>
            Create App
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}
