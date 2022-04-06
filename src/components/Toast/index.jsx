import React, { useEffect, useState } from "react";
import { useToast } from "../../context/ToastContext";

const Toast = ({ content, type, show = false, duration = 2000 }) => {
  const { toggleToast } = useToast();
  const [hide, setHide] = useState(true);
  useEffect(() => {
    let timer;
    if (show) {
      setHide(false);
      timer = setTimeout(() => {
        setHide(true);
        toggleToast();
      }, duration);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [show]);
  return (
    <div
      id="toast"
      className={`toast-container toast-${type} ${!hide ? "toast-open" : ""} `}
    >
      {content}
    </div>
  );
};

export default Toast;
