import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button
} from "reactstrap";

import { get } from "../../../utils";
import { Header, Toast, notify } from "../../../components";

const ElectoralGroup = ({ location }) => {
  const id = new URLSearchParams(location.query).get("id");
  const [demand, setDemand] = useState({ loading: true, demand: {} });

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await get(`demand/${id}`);
        setDemand({ loading: true, demand: data.demand });
      } catch (err) {
        notify(
          "Hubo un problema al cargar los datos. Refresque la Pagina",
          false
        );
      }
    };
    fetch();
  }, []);

  return (
    <>
      <Header />
      <Container className="mt--7">
        <Row>
          <Col sm="12">
            {demand.loading ? (
              <h2>Loading...</h2>
            ) : (
              <Card>
                <CardHeader>
                  <h2>{demand.electoralGroup.denomination}</h2>
                </CardHeader>
                <CardBody>{/** */}</CardBody>
              </Card>
            )}
          </Col>
        </Row>
      </Container>
      <Toast />
    </>
  );
};

export default ElectoralGroup;
