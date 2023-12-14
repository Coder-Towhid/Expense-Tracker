import { useRef } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useCategories } from "../../context/CategoryContext";

const AddCategoryModal = ({ show, handleClose }) => {

    const nameRef = useRef()
    const {addCategory}= useCategories()

    function handleSubmit(e){
        e.preventDefault()
        addCategory({
            name: nameRef.current.value
        })
        handleClose()
    }
  return (
    <Modal show={show} onHinde={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>New Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control ref={nameRef} type="text" required />
          </Form.Group>

          <div>
            <Button variant="primary" type="submit">
              Add
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
};

export default AddCategoryModal;
