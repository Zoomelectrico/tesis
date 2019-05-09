import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Table
} from "reactstrap";
import { Header, Toast, notify } from "../../../components";

import { get } from "../../../utils";

const ElectoralGroup = props => {
  const [state, setState] = useState({ loading: false, electoralGroup: {} });
  useEffect(() => {
    const fetch = async () => {
      const data = await get("electoral-groups");
      if (data.success) {
        setState({ loading: true, electoralGroup: data.electoralGroup });
        return;
      }
      notify("Ha Ocurrido un Error refresca la pagina", false);
    };
    fetch();
  }, []);
  return (
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
                {state.loading ? (
                  <h2>Loading ...</h2>
                ) : (
                  <Table>
                    <thead>
                      <tr>
                        <td>Denominacion</td>
                        <td>Numero</td>
                        <td>Color</td>
                      </tr>
                    </thead>
                    <tbody>
                      {state.electoralGroup.map(row => (
                        <tr key={row.join("-")}>
                          {row.map(data => (
                            <td key={data}>{data}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      <Toast />
    </>
  );
};

export default ElectoralGroup;
