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
import { Header, Toast, notify, Loading } from "../../../components";

import { get } from "../../../utils";

const ElectoralGroup = props => {
  const [state, setState] = useState({ loading: true, electoralGroups: [] });
  useEffect(() => {
    const fetch = async () => {
      const data = await get("electoral-groups");
      if (data.success) {
        console.log(data);
        setState({
          loading: false,
          electoralGroups: data.electoralGroups
        });
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
                  <Loading />
                ) : state.electoralGroups.length > 0 ? (
                  <Table>
                    <thead>
                      <tr>
                        <td>Denominacion</td>
                        <td>Numero</td>
                        <td>Color</td>
                      </tr>
                    </thead>
                    <tbody>
                      {state.electoralGroups.map(row => (
                        <tr key={row.join("-")}>
                          {row.map(data => (
                            <td key={data}>{data}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                ) : (
                  <h2 className="text-center">No existen Grupos Electorales</h2>
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
