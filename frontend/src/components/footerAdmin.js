import React from "react";
import { Row, Col } from "reactstrap";

const FooterAdmin = props => (
  <footer className="footer">
    <Row className="align-items-center justify-content-xl-between">
      <Col xl="6">
        <div className="copyright text-center text-xl-left text-muted">
          © 2019 Jose Roberto Quevedo
        </div>
      </Col>
      <Col xl="6" className="text-right">
        <a href="https://github.com/zoomelectrico/tesis">
          Read me{" "}
          <span role="img" aria-label="emoji">
            📚
          </span>
        </a>
      </Col>
    </Row>
  </footer>
);

export default FooterAdmin;
