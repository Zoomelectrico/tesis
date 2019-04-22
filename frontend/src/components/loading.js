import React from "react";
import { Spinner } from "reactstrap";

const Loading = () => (
  <div
    className="d-flex justify-content-center"
    style={{
      height: "100vh",
      minHeight: "100vh",
      maxHeight: "100vh",
      width: "100vw",
      maxWidth: "100vw",
      minWidth: "100vw"
    }}
  >
    <Spinner
      size="lg"
      color="primary"
      style={{ width: "3rem", height: "3rem" }}
    />
  </div>
);

export default Loading;
