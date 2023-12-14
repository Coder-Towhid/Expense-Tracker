import { Button, Card, Stack } from "react-bootstrap";

// eslint-disable-next-line react/prop-types
const CategoryCard = ({ name, amount, onAddExpenseClick }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title
          className="d-flex justify-content-between align-items-baseline
    fw-normal mb-3"
        >
          <div className="me-2">{name}</div>
          <div>{amount}</div>
        </Card.Title>

        <Stack direction="horizontal" gap="2" className="mt-4">
          <Button variant="outline-primary" onClick={onAddExpenseClick}>
            Add Expense
          </Button>
          <Button variant="outline-secondary">View Expense</Button>
        </Stack>
      </Card.Body>
    </Card>
  );
};

export default CategoryCard;
