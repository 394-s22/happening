import { Modal, Button } from "react-bootstrap";
import React, { useState } from "react";

const AddEvent = ({showAddEvent, setShowAddEvent}) => {

    const [title, setTitle] = useState("");
    const [location, setLocation] = useState("");
    const [time, setTime] = useState("");
    const [description, setDescription] = useState("");
    const [picture, setPicture] = useState("");

    const handleClose = () => setShowAddEvent(false)
    
    return(
        <Modal show={showAddEvent} onHide={handleClose} backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>Add Event</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="mb-3">
                    <label htmlFor="titleinput" className="form-label">Title</label>
                    <input 
                        type="text" 
                        value={title} 
                        onChange={(e)=>setTitle(e.target.value)}
                        className="form-control" 
                        id="titleinput" 
                        aria-describedby="entertitle"></input>
                </div>
                <div className="mb-3">
                    <label htmlFor="locationinput" className="form-label">Location</label>
                    <input 
                        type="text" 
                        value={location} 
                        onChange={(e)=>setLocation(e.target.value)}
                        className="form-control" 
                        id="locationinput" 
                        aria-describedby="enterlocation"></input>
                </div>
                <div className="mb-3">
                    <label htmlFor="timeinput" className="form-label">Time</label>
                    <input 
                        type="text" 
                        value={time} 
                        onChange={(e)=>setTime(e.target.value)}
                        className="form-control" 
                        id="timeinput" 
                        aria-describedby="entertime"></input>
                </div>
                <div className="mb-3">
                    <label htmlFor="descriptioninput" className="form-label">Description</label>
                    <input 
                        type="text" 
                        value={description} 
                        onChange={(e)=>setDescription(e.target.value)}
                        className="form-control" 
                        id="descriptioninput" 
                        aria-describedby="enterdescription"></input>
                </div>
                <div className="mb-3">
                    <label htmlFor="pictureinput" className="form-label">Picture URL</label>
                    <input 
                        type="text" 
                        value={picture} 
                        onChange={(e)=>setPicture(e.target.value)}
                        className="form-control" 
                        id="pictureinput" 
                        aria-describedby="enterpicture"></input>
                </div>
            </Modal.Body>
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

export default AddEvent;