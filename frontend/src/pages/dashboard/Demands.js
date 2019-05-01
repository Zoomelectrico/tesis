import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Table
} from "reactstrap";
import { Header, Footer } from "../../components";
import { env } from "../../utils";

const data = [
  {
    title: "Solicitudes - Representantes Electorales",
    data: {
      header: ["Header 1", "Header 2", "Header 3"],
      body: [
        ["Data 1", "Data 2", "Data 3"],
        ["Data 1", "Data 2", "Data 3"],
        ["Data 1", "Data 2", "Data 3"]
      ]
    }
  },
  {
    title: "Solicitudes - Grupos Electorales",
    data: {
      header: ["Header 1", "Header 2", "Header 3"],
      body: [
        ["Data 1", "Data 2", "Data 3"],
        ["Data 1", "Data 2", "Data 3"],
        ["Data 1", "Data 2", "Data 3"]
      ]
    }
  },
  {
    title: "Solicitudes - Postulaciones",
    data: {
      header: ["Header 1", "Header 2", "Header 3"],
      body: [
        ["Data 1", "Data 2", "Data 3"],
        ["Data 1", "Data 2", "Data 3"],
        ["Data 1", "Data 2", "Data 3"]
      ]
    }
  },
  {
    title: "Solicitudes - Resultados Preliminares",
    data: {
      header: ["Header 1", "Header 2", "Header 3"],
      body: [
        ["Data 1", "Data 2", "Data 3"],
        ["Data 1", "Data 2", "Data 3"],
        ["Data 1", "Data 2", "Data 3"]
      ]
    }
  }
];

const table = ({ title, data }) => (
  <Row className="mb-3 border-0" key={title}>
    <Col>
      <Card style={{ backgroundColor: "#f5f7f9" }}>
        <CardHeader>
          <h2>{title}</h2>
        </CardHeader>
        <CardBody>
          <Table hover>
            <thead>
              <tr>
                {data.header.map(header => (
                  <th key={header}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.body.map(row => (
                <tr key={row.join("-")}>
                  {row.map(_data => (
                    <td key={_data}>{_data}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </Col>
  </Row>
);

const Demands = props => {
  const [state, setState] = useState({ loading: false, demands: {} });
  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        {data.map(({ data, title }) => table({ data, title }))}
      </Container>
      <Footer />
    </>
  );
};

export default Demands;
