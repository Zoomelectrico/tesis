/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Col, Row, Card, CardHeader, CardBody } from 'reactstrap';
import { Header, Toast, notify } from '../../components';

const DashHome = ({ user, location }) => {
  const params = new URLSearchParams(location.search);
  const reason = params.get('reason');
  const vote = params.get('vote') === 'true';
  const bool = params.get('bool') === 'true';
  useEffect(() => {
    if (reason) {
      notify(reason.replace(/[-]/g, ' '), bool);
    }
    if (vote) {
      notify('Felicidades ha Votado', true);
    }
  }, []);
  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <h2>Bienvenid@ {`${user.firstName} ${user.lastName}`}</h2>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col sm="12">
                    <h3>Anuncios: </h3>
                    <ul>
                      {!user.carnet || !user.major ? (
                        <li>
                          {' '}
                          Por favor, complete su{' '}
                          <Link to="/app/dashboard/profile">Perfil</Link>{' '}
                        </li>
                      ) : null}
                    </ul>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      <Toast />
    </>
  );
};

export default DashHome;
