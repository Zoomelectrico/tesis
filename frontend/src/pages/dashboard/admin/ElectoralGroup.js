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

const ElectoralGroup = ({ location, history }) => {
  const id = new URLSearchParams(location.query).get("id");
  const [state, setState] = useState({ loading: true, demand: {} });

  useEffect(() => {
    const fetch = async () => {
      try {
        if (!id) {
          console.log("eoa");
          history.push(
            "/app/dashboard/demands?reason=No-se-encuentra-el-grupo-electoral"
          );
        }
        const data = await get(`demand/${id}`);
        setState({ loading: true, demand: data.demand });
      } catch (err) {
        notify(
          "Hubo un problema al cargar los datos. Refresque la Pagina",
          false
        );
      }
    };
    console.log(1);
    fetch();
  }, []);

  const { electoralGroup } = state.demand;
  return (
    <>
      <Header />
      <Container className="mt--7">
        <Row>
          <Col sm="12">
            {state.loading ? (
              <h2>Loading...</h2>
            ) : (
              <Card>
                <CardHeader>
                  <h2>{electoralGroup.denomination}</h2>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col sm="12">
                      <img
                        src={electoralGroup.logo}
                        alt={`${electoralGroup.denomination} Logo`}
                        className="text-center mb-3"
                      />
                      <h2 className="text-center">
                        {electoralGroup.denomination}
                      </h2>
                    </Col>
                    <Col sm="12">
                      <ul>
                        <li>
                          Representante:{" "}
                          {`${electoralGroup.representative.firstName} ${
                            electoralGroup.representative.lastName
                          }`}
                        </li>
                        <li>Color: {electoralGroup.colorName}</li>
                        <li>Numero: {electoralGroup.number}</li>
                      </ul>
                    </Col>
                    <Col sm="12" md="6" />
                    <Col sm="12" md="6">
                      <Button className="my-auto justify-content-end mb-3 mr-3">
                        Aceptar
                      </Button>
                    </Col>
                  </Row>
                </CardBody>
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
