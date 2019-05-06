import React from "react";
import { Link } from "react-router-dom";
import { Container, Col, Row, Card, CardHeader, CardBody } from "reactstrap";
import { Header } from "../../components";

const DashHome = ({ user }) => (
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
                        {" "}
                        Por favor, complete su{" "}
                        <Link to="/app/dashboard/profile">Perfil</Link>{" "}
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
  </>
);

export default DashHome;
