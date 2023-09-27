import React, { useContext, useState } from 'react';
import styles from './AddVersionDialog.module.scss';
import { Modal, Button, Form } from 'react-bootstrap';
import MessageDialogContext from '@components/context/MessageDialogContext';

interface AddVersionDialogProps {
  show: boolean;
  onCancel: () => void;
  onAddedVersion: (version: string) => void;
}

export default function AddVersionDialog({
  show,
  onCancel,
  onAddedVersion,
}: AddVersionDialogProps) {
  const { showMessage } = useContext(MessageDialogContext);

  const [input, setInput] = useState<string>('1.1.0');

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
        <Modal.Title>Add a new version</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="mt-3">
          <Form.Group className="mb-3">
            <Form.Label>Version</Form.Label>
            <Form.Control
              type="input"
              placeholder="Eg: 1.0.0"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => onCancel()}>
          Cancel
        </Button>
        <Button variant="primary" onClick={() => onAddedVersion(input)}>
          Add Version
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
