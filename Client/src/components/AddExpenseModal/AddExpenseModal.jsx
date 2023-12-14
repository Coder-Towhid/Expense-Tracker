import { useRef } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { UNCATEGORIZED_ID, useCategories } from "../../context/CategoryContext";

const AddExpenseModal = ({ show, handleClose, defaultCategoryId }) => {

    const nameRef = useRef()
    const amountRef = useRef()
    const categoryIdRef = useRef()

    const {addExpense, categories}= useCategories()

    function handleSubmit(e){
        e.preventDefault()
        addExpense({
            name: nameRef.current.value,
            amount: amountRef.current.value,
            categoryId: categoryIdRef.current.value
        })
        handleClose()
    }
  return (
    <Modal show={show} onHinde={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>New Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control ref={nameRef} type="text" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="amount">
            <Form.Label>Amount</Form.Label>
            <Form.Control ref={amountRef} type="number" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="amount">
            <Form.Label>Category</Form.Label>
         <Form.Select defaultValue={defaultCategoryId} ref={categoryIdRef}>
         <option id={UNCATEGORIZED_ID}>Uncategorized</option>
          {categories.map(category=>(
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
         </Form.Select>
          </Form.Group>

          <div>
            <Button variant="primary" type="submit">
              Add Expense
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
};

export default AddExpenseModal;
