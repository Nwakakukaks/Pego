import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

interface MessageDialogProps {
  show: boolean;
  title: string;
  description: string;
  onClose: () => void;
}

export default function MessageDialog({
  show,
  title,
  description,
  onClose,
}: MessageDialogProps) {
  return (
    <Modal
      show={show}
      size="lg"
      onHide={onClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{description}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
