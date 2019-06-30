import React from 'react';
import { Container, Row, Col } from 'reactstrap';

const Footer = props => (
  <footer className="py-5 mt-5">
    <Container>
      <Row className="align-items-center justify-content-xl-between">
        <Col xl="6">
          <div className="copyright text-center text-xl-left text-muted">
            © 2019 Jose Roberto Quevedo
          </div>
        </Col>
        <Col xl="6" className="text-center text-xl-right">
          <a href="https://github.com/zoomelectrico/tesis#readme">
            Read me{' '}
            <span role="img" aria-label="emoji">
              📚
            </span>
          </a>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;
