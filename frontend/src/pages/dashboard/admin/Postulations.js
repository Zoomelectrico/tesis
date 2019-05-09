import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Table
} from "reactstrap";
import { Header } from "../../../components";

const Postulations = props => (
  <>
    <Header />
    <Container className="mt--7">
      <Row>
        <Col sm="12">
          <Card>
            <CardHeader>
              <h2>Grupos Electorales - Postulaciones</h2>
            </CardHeader>
            <CardBody>
              <Table>
                <thead>
                  <tr>
                    <td>#</td>
                    <td>Grupo Electoral</td>
                    <td>Descargar</td>
                  </tr>
                </thead>
                <tbody>{/** Rows */}</tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  </>
);

export default Postulations;
