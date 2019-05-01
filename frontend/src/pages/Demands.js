import React, { lazy, Suspense, useState, useEffect } from "react";
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
import { Header, Footer } from "../components";
import { env } from "../utils";

const Demands = props => {
  const [demands, setDemands] = useState({
    loading: true,
    err: false,
    demands: {}
  });
  useEffect(() => {
    const fetch = async () => {
      try {
        const [
          {
            data: {
              success: successElectoralRepresentatives,
              electoralRepresentatives
            }
          },
          {
            data: { success: successElectoralGroups, electoralGroups }
          },
          {
            data: { success: successResults, results }
          }
        ] = await Promise.all([
          axios.get(`${env.API_URL}/`),
          axios.get(`${env.API_URL}/`),
          axios.get(`${env.API_URL}/`)
        ]);
        if (
          ![
            successElectoralGroups,
            successElectoralRepresentatives,
            successResults
          ].includes(false)
        ) {
          const state = {
            ...demands,
            loading: false,
            demands: {
              electoralRepresentatives,
              electoralGroups,
              results
            }
          };
          setDemands(state);
        } else {
          const state = {
            ...demands,
            loading: false,
            err: true
          };
          setDemands(state);
        }
      } catch (err) {
        const state = {
          ...demands,
          loading: false,
          err
        };
        setDemands(state);
      }
    };
    fetch();
  }, []);
  return (
    <Container fluid>
      <Row className="mb-3">
        <Col sm="12">
          <Card>
            <CardHeader>
              <h2>Peticiones de Representante Electoral</h2>
            </CardHeader>
            <CardBody>{/** */}</CardBody>
          </Card>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col sm="12">
          <Card>
            <CardHeader>
              <h2>Peticiones de Grupo Electoral</h2>
            </CardHeader>
            <CardBody>{/** */}</CardBody>
          </Card>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col sm="12">
          <Card>
            <CardHeader>
              <h2>Peticiones de Postulacion</h2>
            </CardHeader>
            <CardBody>{/** */}</CardBody>
          </Card>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col sm="12">
          <Card>
            <CardHeader>
              <h2>Resultados Previos</h2>
            </CardHeader>
            <CardBody>{/** */}</CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Demands;
