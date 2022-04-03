import React, { useState, createContext, useContext } from "react";

const ToastContext = createContext();

const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({ show: false, content: "", type: "" });
  const toggleToast = () => {
    setToast((_toast) => {
      return { ..._toast, show: !_toast.show };
    });
  };

  return (
    <ToastContext.Provider
      value={{
        toast,
        setToast,
        toggleToast,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
};

const useToast = () => useContext(ToastContext);
export { useToast, ToastProvider };
