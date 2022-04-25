import { Modal, Button } from "bootstrap";
import React from "react";

const AddEvent = ({showAddEvent, setShowAddEvent}) => {

    const handleClose = () => setShowAddEvent(false)
    
    return(
        <Modal show={showAddEvent} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Event</Modal.Title>
            </Modal.Header>
            <Modal.Body>Form goes here.</Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
                Submit
            </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AddEvent