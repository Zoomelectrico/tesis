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

const generateTable = (headers, body) => (
  <Table>
    <thead>
      <tr>
        {headers.map(header => (
          <th key={header}>{header}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {body.map((row, i) => (
        <tr key={`key-${i}`}>
          {row.map(data => (
            <td key={data}>{data}</td>
          ))}
        </tr>
      ))}
    </tbody>
  </Table>
);

const Checkout = props => (
  <>
    <Header />
    <Container className="mt--7">
      {/* Federacion de Centros de Estudiantes */}
      <Row className="mb-4">
        <Col sm="12">
          <Card>{}</Card>
        </Col>
      </Row>

      {/* Consejo Academico */}
      <Row className="mb-4">
        <Col sm="12">
          <Card>{}</Card>
        </Col>
      </Row>

      {/* Centros de Estudiantes */}
      <Row className="mb-4">
        <Col sm="12">
          <Card>{}</Card>
        </Col>
      </Row>

      {/* Consejos de Escuela */}
      <Row className="mb-4">
        <Col sm="12">
          <Card>{}</Card>
        </Col>
      </Row>

      {/* Consejos de Facultad */}
      <Row className="mb-4">
        <Col sm="12">
          <Card>{}</Card>
        </Col>
      </Row>
    </Container>
  </>
);
