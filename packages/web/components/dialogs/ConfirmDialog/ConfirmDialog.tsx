import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

interface ConfirmDialogProps {
  show: boolean;
  title: string;
  description: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function ConfirmDialog({
  show,
  title,
  description,
  onCancel,
  onConfirm,
}: ConfirmDialogProps) {
  return (
    <Modal
      show={show}
      size="lg"
      onHide={onCancel}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{description}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="primary" onClick={onConfirm ? onConfirm : () => {}}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
