import React, { useState, useEffect } from "react";
import vfs_fonts from "pdfmake/build/vfs_fonts";
import pdfMake from "pdfmake/build/pdfmake";
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
import { Header, notify, Toast, Loading } from "../../../components";
import { get, generateDD, _fetch } from "../../../utils";

const Postulations = props => {
  const [state, setState] = useState({ loading: true, postulations: [] });
  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await get("postulations");
        console.log(data);
        setState({ loading: false, postulations: data.postulations });
      } catch (err) {
        notify("Ha ocurrido un Error, pruebe refrescando la pagina!", false);
      }
    };
    fetch();
  }, []);

  const download = async e => {
    try {
      e.preventDefault();
      const res = await _fetch(e.target.dataset.id);
      console.log(res);
      const [err, dd] = await generateDD(res.postulation);
      if (err) {
        console.log(err);
        return notify("Ha ocurrido un error", false);
      }
      pdfMake.vfs = vfs_fonts.pdfMake.vfs;
      pdfMake.createPdf(dd).open();
    } catch (err) {
      console.log(err);
      notify("Ha ocurrido un Error al ver la postulacion", false);
    }
  };

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
                ) : state.postulations.length > 0 ? (
                  <Table>
                    <thead>
                      <tr>
                        <td>#</td>
                        <td>Grupo Electoral</td>
                        <td>Descargar</td>
                      </tr>
                    </thead>
                    <tbody>
                      {state.postulations.map(row => (
                        <tr key={row.join("-")}>
                          {row.map((data, i) =>
                            i === row.length - 1 ? (
                              <td>
                                <Button
                                  color="infor"
                                  size="sm"
                                  onClick={download}
                                  className="my-auto"
                                  data-id={data}
                                  key={data}
                                >
                                  Descargar
                                </Button>
                              </td>
                            ) : (
                              <td key={data}>{data}</td>
                            )
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                ) : (
                  <p className="text-center">
                    <strong>No</strong> hay ninguna postulacion
                  </p>
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

export default Postulations;
