import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Table,
  Button
} from "reactstrap";
import { Header } from "../../components";
import { get } from "../../utils";

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

const electoralR = e => {
  e.preventDefault();
};

const fetch = async (demands, setDemands) => {
  try {
    const data = await get("demands");
    setDemands({ ...demands, demands: data.demands, loading: false });
  } catch (err) {
    console.log(err);
  }
};

const nothingCard = title => (
  <Card className="mb-3">
    <CardHeader>
      <h2>{title}</h2>
    </CardHeader>
    <CardBody>
      <p className="text-center">No hay nada para atender!</p>
    </CardBody>
  </Card>
);

const generateTable = state => {
  const { representative, group, postulation, complain } = state;
  return (
    <>
      {representative.length > 0
        ? table("Solicitud - Representante Electoral", {
            header: ["Codigo", "Nombre del Solicitante", "Atender"],
            body: representative.map(({ code, user: { name, _id } }) => [
              code,
              name,
              <Button
                color="info"
                sm
                outline
                onClick={electoralR}
                data-id={_id}
              >
                Aceptar
              </Button>
            ])
          })
        : nothingCard("Solicitud - Representante Electoral")}
      {group.length > 0
        ? table("Solicitud - Grupo Electoral", {
            header: [
              "Codigo",
              "Nombre del Solicitante",
              "Nombre del Grupo Electoral",
              "Atender"
            ],
            body: group.map(
              ({
                code,
                user: { name: uname, _id: u_id },
                electoralGroup: { name, _id }
              }) => [
                code,
                uname,
                name,
                <Button
                  color="info"
                  sm
                  outline
                  onClick={electoralR}
                  data-id={_id}
                  data-uid={u_id}
                >
                  Aceptar
                </Button>
              ]
            )
          })
        : nothingCard("Solicitud - Representante Electoral")}
      {postulation.length > 0
        ? table("Solicitud - Postulacion", {
            header: [
              "Codigo",
              "Nombre del Solicitante",
              "Nombre del Grupo Electoral",
              "Atender"
            ],
            body: postulation.map(
              ({
                code,
                user: { name: uname, _id: u_id },
                postulation: {
                  _id,
                  electoralGroup: { name }
                }
              }) => [
                code,
                uname,
                name,
                <Button
                  color="info"
                  sm
                  outline
                  onClick={electoralR}
                  data-id={_id}
                  data-uid={u_id}
                >
                  Aceptar
                </Button>
              ]
            )
          })
        : nothingCard("Solicitud - Postulacion")}
      {complain.length > 0
        ? table("Solicitud - Queja", {
            header: ["Codigo", "Nombre del Solicitante"],
            body: complain.map(({ code, user: { name, _id } }) => [
              code,
              name,
              <Button color="success" sm outline data-id={_id}>
                Atender
              </Button>
            ])
          })
        : nothingCard("Solicitud - Quejas")}
    </>
  );
};

const Demands = props => {
  const [state, setState] = useState({ loading: true, demands: {} });
  useEffect(() => {
    fetch(state, setState);
  }, []);
  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        {state.loading ? <h2>Loading...</h2> : generateTable(state.demands)}
      </Container>
    </>
  );
};

export default Demands;
