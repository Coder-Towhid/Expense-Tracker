import { jwtDecode } from "jwt-decode";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";
import { CategoryContext } from "./context/CategoryContext";

const refetch = async () => {
  const { user } = useContext(AuthContext);
  const decodedToken = jwtDecode(user);

  const { updateCategory } = useContext(CategoryContext);
  try {
    const response = await fetch(
      `http://localhost:3001/expense/category/v1/categories/${decodedToken.userid}`,
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
};

export default refetch;
