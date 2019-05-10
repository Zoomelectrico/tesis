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
import { Header, Toast, notify, Loading } from "../../components";
import { get, post } from "../../utils";

const Demands = props => {
  const reason = new URLSearchParams(props.location.search).get("reason");
  const [state, setState] = useState({ loading: true, demands: {} });
  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await get("demands");
        setState({ ...state, demands: data.demands, loading: false });
      } catch (err) {
        console.log(err);
      }
    };
    if (reason) {
      notify(reason.replace(/[-]/g, " "), false);
    }
    fetch();
  }, []);

  const table = (title, data) => {
    if (data.header && data.body) {
      return (
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
    }
    return nothingCard(title);
  };

  const electoralR = async (e, state, setState) => {
    try {
      e.preventDefault();
      const { id, user: userId, idx } = e.target.dataset;
      const data = await post("demand-accept-rep/", { id, userId });
      if (data.success) {
        notify("El representante Electoral ha sido creado exitosament", true);
        setState({
          ...state,
          representative: [
            ...state.demands.representative.slice(0, idx),
            ...state.demands.representative.slice(idx + 1)
          ]
        });
      }
    } catch (err) {
      notify(
        "Ha ocurrido un error, refresque el navegador y vuelva a intentar",
        false
      );
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

  const generateTable = (state, setState) => {
    const {
      demands: { representative, group, postulation, complain }
    } = state;
    return (
      <>
        {representative.length > 0
          ? table("Solicitud - Representante Electoral", {
              header: ["Codigo", "Nombre del Solicitante", "Atender"],
              body: representative.map(
                (
                  { code, _id: id, user: { firstName, lastName, _id } },
                  idx
                ) => [
                  code,
                  `${firstName} ${lastName}`,
                  <Button
                    color="info"
                    size="sm"
                    outline
                    onClick={e => electoralR(e, state, setState)}
                    data-user={_id}
                    data-id={id}
                    data-idx={idx}
                  >
                    Atender
                  </Button>
                ]
              )
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
                  _id,
                  user: { firstName, lastName },
                  electoralGroup: { denomination }
                }) => [
                  code,
                  `${firstName} ${lastName}`,
                  denomination,
                  <Button
                    color="info"
                    size="sm"
                    outline
                    onClick={e => electoralGroup(e)}
                    data-id={_id}
                  >
                    Atender
                  </Button>
                ]
              )
            })
          : nothingCard("Solicitud - Grupo Electoral")}
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
                  user: { firstName, lastName, _id: u_id },
                  postulation: {
                    _id,
                    electoralGroup: { denomination }
                  }
                }) => [
                  code,
                  `${firstName} ${lastName}`,
                  denomination,
                  <Button
                    color="info"
                    size="sm"
                    outline
                    onClick={electoralR}
                    data-id={_id}
                    data-uid={u_id}
                  >
                    Atender
                  </Button>
                ]
              )
            })
          : nothingCard("Solicitud - Postulacion")}
        {complain.length > 0
          ? table("Solicitud - Queja", {
              header: ["Codigo", "Nombre del Solicitante"],
              body: complain.map(
                ({ code, user: { firstName, lastName, _id } }) => [
                  code,
                  `${firstName} ${lastName}`,
                  <Button color="success" size="sm" outline data-id={_id}>
                    Atender
                  </Button>
                ]
              )
            })
          : nothingCard("Solicitud - Quejas")}
      </>
    );
  };

  const electoralGroup = async e => {
    try {
      e.preventDefault();
      props.history.push(
        `/app/dashboard/electoral-group?id=${e.target.dataset.id}`
      );
    } catch (err) {
      notify(
        "Ha ocurrido un error, refresque el navegador y vuelva a intentar",
        false
      );
    }
  };

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        {state.loading ? (
          <Card>
            <CardBody>
              <div className="d-flex justify-content-center p-4">
                <img
                  alt="uvote logo"
                  className="mb-3"
                  src={require("../../assets/img/logo-color.svg")}
                  height="125px"
                  width="auto"
                />
              </div>
              <h2 className="text-center">Loading ...</h2>
            </CardBody>
          </Card>
        ) : (
          generateTable(state, setState)
        )}
      </Container>
      <Toast />
    </>
  );
};

export default Demands;
