import React, { useState, useEffect } from "react";
import { Container, Col, Row, Card, Button } from "reactstrap";
import { Header, notify, Loading } from "../../../components";
import { get, post } from "../../../utils";
import { Checkout } from "../postulate";

const Postulation = ({ location, history }) => {
  const params = new URLSearchParams(location.search);
  const [state, setState] = useState({
    loading: true,
    postulation: {},
    demand: {}
  });
  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await get(`demand/${params.get("id")}`);
        console.log(data);
        setState({
          loading: false,
          postulation: data.demand.postulation,
          demand: data.demand
        });
      } catch (err) {
        notify("Ha Ocurrido un Error. Intente Refrescando el navegador", false);
      }
    };
    fetch();
  }, []);

  const accept = async e => {
    try {
      e.preventDefault();
      const { pid, id } = e.target.dataset;
      const data = await post("demand-accept-pos", { pid, id });
      console.log(data);
      history.push(
        "/app/dashboard/demands?reason=Postulacion-registrada-correctamente&bool=true"
      );
    } catch (err) {
      console.log(err);
      notify("Ha ocurrido un Error al Guardar");
    }
  };

  return (
    <>
      <Header />
      {state.loading ? (
        <Container fluid className="mt--7">
          <Row>
            <Col sm="12">
              <Card>
                <Loading />
              </Card>
            </Col>
          </Row>
        </Container>
      ) : (
        <>
          <Checkout postulation={state.postulation} />
          <Container>
            <Row>
              <Col sm="12" className="d-flex justify-content-end">
                <Button
                  color="success"
                  className="my-auto"
                  onClick={accept}
                  data-id={state.demand._id}
                  data-pid={state.postulation._id}
                >
                  Aceptar Postulacion
                </Button>
              </Col>
            </Row>
          </Container>
        </>
      )}
    </>
  );
};

export default Postulation;
