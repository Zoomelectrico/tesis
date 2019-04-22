import React from "react";
import { Container, Row, Col, Card, CardBody, CardHeader } from "reactstrap";
import { Pie } from "react-chartjs-2";
import { Header } from "../../components";

const data = {
  labels: ["Red", "Green", "Yellow"],
  datasets: [
    {
      data: [300, 50, 100],
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
    }
  ]
};

const Results = props => (
  <>
    <Header />
    <Container fluid className="mt--7">
      <Row>
        <Col md="6">
          <Card style={{ backgroundColor: "#f5f7f9" }}>
            <CardHeader>
              <h2> Resultados FCE </h2>
            </CardHeader>
            <CardBody>
              <Row>
                <Col sm="12">
                  <Pie data={data} />
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
        <Col md="6">
          <Card style={{ backgroundColor: "#f5f7f9" }}>
            <CardHeader>
              <h2> Resultados FCE 2 </h2>
            </CardHeader>
            <CardBody>
              <Row>
                <Col sm="12">
                  <Pie data={data} />
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  </>
);

export default Results;
