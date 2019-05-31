import React, { useEffect } from 'react';
import { Row, Col, Container } from 'reactstrap';
import { Navbar } from '../components';

const NotFound = props => {
  useEffect(() => {
    document.body.classList.add('bg-default');
    return function cleanup() {
      document.body.classList.remove('bg-default');
    };
  }, []);
  return (
    <div className="main-content">
      <Navbar {...props} />
      <div className="header bg-gradient-info py-7 py-lg-8">
        <Container>
          <Row className="justify-content-center">
            <Col md="7">
              <h2 className="text-center text-white">
                Error 404 <br /> No encontramos esta ruta{' '}
                <span role="img" aria-label="emoji">
                  🙅
                </span>
              </h2>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default NotFound;
