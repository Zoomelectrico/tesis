import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Col, Row, Card, CardHeader, CardBody } from "reactstrap";
import { Header, Footer } from "../../../components";
import { env } from "../../../utils";

const Postulation = ({ location }) => {
  const params = new URLSearchParams(location.search);
  const [postulation, setPostulation] = useState({
    loading: true,
    err: false,
    postulation: {}
  });
  useEffect(() => {
    if (!location.search) return location.push("/app/dashboard");
    setTimeout(() => {
      postulation.loading = false;
    }, 2000);
    // axios
    //   .get(`${env.API_URL}/postulation/${params.id}`)
    //   .then(({ data }) => {
    //     const { success, _postulation } = data;
    //     if (success) {
    //       const state = { ...postulation };
    //       state.postulation = _postulation;
    //       state.loading = false;
    //     } else {
    //       const state = { ...postulation };
    //       state.err = true;
    //       state.loading = false;
    //     }
    //   })
    //   .catch(err => {
    //     const state = { ...postulation };
    //     state.err = true;
    //     state.loading = false;
    //     console.log(err);
    //   });
  }, []);
  return (
    <>
      <Header />
      <Container fluid className="mt--7">
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h2>Algo</h2>
              </CardHeader>
              <CardBody>{/** Aqui Ira una Tabla */}</CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default Postulation;
