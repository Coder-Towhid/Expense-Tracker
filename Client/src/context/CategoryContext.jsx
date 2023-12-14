
import React, { useContext, useState } from "react";
import {v4 as uuidV4} from 'uuid'
const CategoryContext = React.createContext();

export const UNCATEGORIZED_ID="Uncategorized"
export function useCategories(){

    return useContext(CategoryContext);
}

// eslint-disable-next-line react/prop-types
export const CategoriesProvider = ({children})=> {
    const [categories, setCategory] =useState([])
    const  [expenses, setExpense] = useState([])

    function getCategoryExpenses(categoryId){
        return expenses.filter(expense => expense.categoryId === categoryId)
    }
    function addExpense({name, amount, categoryId}){
        setExpense(prevExpense=>{
            
            return[...prevExpense, {id: uuidV4(),name ,categoryId, amount}]
        })
    }
    function addCategory({name, amount}){
        setCategory(prevCategory=>{
            if(prevCategory.find(category => category.name === name)){
                return prevCategory
            }
            return[...prevCategory, {id: uuidV4(), name, amount}]
        })
    }
    function deleteCategory({id}){
        setCategory(prevCategory=>{
            return prevCategory.filter(category=>category.id !== id)
        })
    }
    function deleteExpense({id}){
        setExpense(prevExpense=>{
            return prevExpense.filter(expense=>expense.id !== id)
        })
    }

    return <CategoryContext.Provider value={{
        categories,
        expenses,
        getCategoryExpenses,
        addExpense,
        addCategory,
        deleteCategory,
        deleteExpense


    }}>
        {children}
    </CategoryContext.Provider>;
}