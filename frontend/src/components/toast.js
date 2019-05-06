import React from "react";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const Toast = props => (
  <>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnVisibilityChange
      draggable
      pauseOnHover
    />
  </>
);

const notify = (msg, success) => {
  const config = {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
  };
  if (success) {
    toast.success(msg, config);
  } else {
    toast.error(msg, config);
  }
};

export { Toast, notify };
