import React from "react";
import { Container, Col, Row, Card, CardHeader, CardBody } from "reactstrap";
import { Header } from "../../components";

const DashHome = props => (
  <>
    <Header />
    <Container className="mt--7" fluid>
      <Row>
        <Col>
          <Card>
            <CardHeader>{/* */}</CardHeader>
            <CardBody>{/* */}</CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  </>
);

export default DashHome;
