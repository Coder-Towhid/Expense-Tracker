import { Button, Stack } from "react-bootstrap";

import { jwtDecode } from "jwt-decode";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddCategoryModal from "../../components/AddCategoryModal/AddCategoryModal";
import AddExpenseModal from "../../components/AddExpenseModal/AddExpenseModal";
import CategoryCard from "../../components/CategoryCard/CategoryCard";
import UncategorizedCard from "../../components/Uncategorized/UncategorizedCard";
import ViewExpensesModal from "../../components/ViewExpenses/ViewExpensesModal";
import { AuthContext } from "../../context/AuthContext";
import {
  CategoryContext,
  UNCATEGORIZED_ID,
} from "../../context/CategoryContext";

import { SERVER_URL } from "../../helper/constants";
import "./home.css";
const Home = () => {
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [viewExpensesModalCategoryId, setViewExpensesModalCategoryId] =
    useState();
  const [addExpenseModalCategoryId, setAddExpenseModalCategoryId] = useState();

  const { categories, updateCategory } = useContext(CategoryContext);



  function openAddExpenseModal(categoryId) {
    setShowAddExpenseModal(true);
    setAddExpenseModalCategoryId(categoryId);
  }

  const { user, authDispatch } = useContext(AuthContext);

  const decodedToken = jwtDecode(user);

  const handleSignout = () => {
    localStorage.removeItem("token");
    authDispatch({ type: "LOG_OUT" });

    
    
  };

  useEffect(() => {
    (async function () {
      try {
        const response = await fetch(
          `${SERVER_URL}/expense/category/v1/categories/${decodedToken.userid}`,
          {
            method: "GET",
            headers: {
              authorization: user,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          const result = await response.json();

          updateCategory(result);
        } else {
          console.log(response);
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, [user]);

  return (
    <>
      <Stack direction="horizontal" className="mb-4">
        <h1 className="text-center">Hello - {decodedToken.username}</h1>
        <Button onClick={handleSignout}>Sign Out</Button>
      </Stack>

      <Stack direction="horizontal" gap="2" className="mb-4">
        <h1 className="me-auto">Categories</h1>
        <Button variant="primary" onClick={() => setShowAddCategoryModal(true)}>
          Add Category
        </Button>
        <Button variant="outline-primary" onClick={openAddExpenseModal}>
          Add Expense
        </Button>
      </Stack>
      <div className="cardList">
        <UncategorizedCard
          onAddExpenseClick={openAddExpenseModal}
          onViewExpenseClick={() =>
            setViewExpensesModalCategoryId(UNCATEGORIZED_ID)
          }
        />

        {categories.map((category, index) => {
          return (
            <CategoryCard
              key={category?.id || index}
              category={category}
              onAddExpenseClick={() => openAddExpenseModal(category.id)}
              onViewExpenseClick={() =>
                setViewExpensesModalCategoryId(category.id)
              }
            />
          );
        })}
      </div>

      <AddCategoryModal
        show={showAddCategoryModal}
        handleClose={() => setShowAddCategoryModal(false)}
      />
      <AddExpenseModal
        show={showAddExpenseModal}
        defaultCategoryId={addExpenseModalCategoryId}
        handleClose={() => setShowAddExpenseModal(false)}
      />
      <ViewExpensesModal
        categoryId={viewExpensesModalCategoryId}
        handleClose={() => setViewExpensesModalCategoryId()}
      />
    </>
  );
};

export default Home;
