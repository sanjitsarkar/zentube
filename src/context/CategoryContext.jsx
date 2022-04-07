import axios from "axios";
import React, {
  useState,
  createContext,
  useContext,
  useReducer,
  useEffect,
} from "react";
import { initialState, reducer } from "../reducers/reducer";
import {
  ACTION_TYPE_FAILURE,
  ACTION_TYPE_LOADING,
  ACTION_TYPE_SUCCESS,
} from "../utils";

const CategoryContext = createContext();

const CategoryProvider = ({ children }) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [categories, dispatchCategories] = useReducer(reducer, initialState);
  const [categoryInfo, dispatchCategoryInfo] = useReducer(
    reducer,
    initialState
  );
  const fetchCategories = () => {
    dispatchCategories({ type: ACTION_TYPE_LOADING });
    axios
      .get("/api/categories")
      .then((res) => {
        dispatchCategories({
          type: ACTION_TYPE_SUCCESS,
          payload: res.data.categories,
        });
      })
      .catch((err) => {
        dispatchCategories({
          type: ACTION_TYPE_FAILURE,
          payload: err.message,
        });
      });
  };
  const fetchCategoryInfo = (categoryId) => {
    dispatchCategoryInfo({ type: ACTION_TYPE_LOADING });
    axios
      .get(`/api/categories/${categoryId}`)
      .then((res) => {
        dispatchCategoryInfo({
          type: ACTION_TYPE_SUCCESS,
          payload: res.data.category,
        });
      })
      .catch((err) => {
        dispatchCategoryInfo({
          type: ACTION_TYPE_FAILURE,
          payload: err.message,
        });
      });
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
