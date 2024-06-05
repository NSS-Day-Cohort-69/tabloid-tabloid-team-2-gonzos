import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

const ConfirmDelete = ({ isOpen, toggle, confirmDelete, typeName }) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Confirm Deletion</ModalHeader>
      <ModalBody>
        Are you positive you want to delete this {typeName}?
      </ModalBody>
      <ModalFooter>
        <Button onClick={confirmDelete}>Delete</Button>{" "}
        <Button onClick={toggle}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
};

export default ConfirmDelete;
