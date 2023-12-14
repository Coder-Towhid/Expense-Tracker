import { Button, Stack } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import CategoryCard from "../../components/CategoryCard/CategoryCard";

import AddCategoryModal from "../../components/AddCategoryModal/AddCategoryModal";
import "./home.css";
import { useState } from "react";
import { useCategories } from "../../context/CategoryContext";
import AddExpenseModal from "../../components/AddExpenseModal/AddExpenseModal";
const Home = () => {
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [addExpenseModalCategoryId, setAddExpenseModalCategoryId] = useState();

  const { categories, getCategoryExpenses } = useCategories();
  

  function openAddExpenseModal(categoryId){
      setShowAddExpenseModal(true)
      setAddExpenseModalCategoryId(categoryId)
  }
  return (
    <>
      <Container className="my-4">
        <Stack direction="horizontal" gap="2" className="mb-4">
          <h1 className="me-auto">Categories</h1>
          <Button
            variant="primary"
            onClick={() => setShowAddCategoryModal(true)}
          >
            Add Category
          </Button>
          <Button variant="outline-primary" onClick={openAddExpenseModal}>Add Expense</Button>
        </Stack>
        <div className="cardList">
          {categories.map((category) => {
            const amount = getCategoryExpenses(category.id).reduce(
              (total, expense)=> total + parseFloat(expense.amount), 0 
            );
           
            return <CategoryCard key={category.id} name={category.name} amount={amount} onAddExpenseClick={()=> openAddExpenseModal(category.id)}/>;
          })}
        </div>
      </Container>

      <AddCategoryModal
        show={showAddCategoryModal}
        handleClose={() => setShowAddCategoryModal(false)}
      />
      <AddExpenseModal show={showAddExpenseModal}
      defaultCategoryId={addExpenseModalCategoryId}
      handleClose={()=> setShowAddExpenseModal(false)} />
    </>
  );
};

export default Home;
