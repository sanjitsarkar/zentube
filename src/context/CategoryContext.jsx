import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { initialState, reducer } from "../reducers/reducer";
import {
  ACTION_TYPE_FAILURE,
  ACTION_TYPE_LOADING,
  ACTION_TYPE_SUCCESS,
  callApi,
} from "../utils";

const CategoryContext = createContext();

const CategoryProvider = ({ children }) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [categories, dispatchCategories] = useReducer(reducer, initialState);
  const [categoryInfo, dispatchCategoryInfo] = useReducer(
    reducer,
    initialState
  );
  const fetchCategories = async () => {
    try {
      dispatchCategories({ type: ACTION_TYPE_LOADING });
      const result = await callApi("get", "categories");
      dispatchCategories({
        type: ACTION_TYPE_SUCCESS,
        payload: result.data.categories,
      });
    } catch (err) {
      dispatchCategories({
        type: ACTION_TYPE_FAILURE,
        payload: err.message,
      });
    }
  };
  const fetchCategoryInfo = async (categoryId) => {
    dispatchCategoryInfo({ type: ACTION_TYPE_LOADING });
    try {
      const result = await callApi("get", `categories/${categoryId}`);
      dispatchCategoryInfo({
        type: ACTION_TYPE_SUCCESS,
        payload: result.data.categories,
      });
    } catch (err) {
      dispatchCategoryInfo({
        type: ACTION_TYPE_FAILURE,
        payload: err.message,
      });
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <CategoryContext.Provider
      value={{
        categories,
        fetchCategories,
        activeCategory,
        setActiveCategory,
        fetchCategoryInfo,
        categoryInfo,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

const useCategory = () => useContext(CategoryContext);
export { useCategory, CategoryProvider };
