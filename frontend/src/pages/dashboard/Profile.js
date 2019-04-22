import React from "react";
import {
  Container,
  Col,
  Row,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Label,
  Input,
  Button
} from "reactstrap";
import { Header } from "../../components";
import { majors } from "../../utils";

const DashProfile = props => (
  <>
    <Header />
    <Container fluid className="mt--7">
      <Row>
        <Col md="12" lg="8">
          <Card style={{ backgroundColor: "#f5f7f9" }}>
            <CardHeader>
              <h2>Informacion del Usuario</h2>
            </CardHeader>
            <CardBody>
              <Row>
                <Col md="6">
                  <FormGroup>
                    <Label for="first-name">Nombres</Label>
                    <Input
                      className="form-control-alternative"
                      type="text"
                      name="first-name"
                      id="first-name"
                    />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <Label for="last-name">Apellidos</Label>
                    <Input
                      className="form-control-alternative"
                      type="text"
                      name="last-name"
                      id="last-name"
                    />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <Label for="dni">Cedula de Identidad</Label>
                    <Input
                      className="form-control-alternative"
                      type="number"
                      name="dni"
                      id="dni"
                    />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <Label for="carnet">Carnet</Label>
                    <Input
                      className="form-control-alternative"
                      type="number"
                      name="carnet"
                      id="carnet"
                    />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <Label for="major">Carrera</Label>
                    <Input
                      className="form-control-alternative"
                      type="select"
                      name="major"
                      id="major"
                    >
                      {majors.map(major => (
                        <option key={major} value={major}>
                          {major}
                        </option>
                      ))}
                    </Input>
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <Label for="email">Correo Electronico</Label>
                    <Input
                      className="form-control-alternative"
                      type="email"
                      name="email"
                      id="email"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="6" />
                <Col md="6" className="d-flex justify-content-end">
                  <Button color="success" className="my-auto">
                    Actualizar
                  </Button>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
        <Col md="12" lg="4">
          <Row>
            <Col sm="12" className="mb-3">
              <Card className="bg-gradient-warning py-5 px-3 border-0">
                <Row className="justify-content-center">
                  <Button color="neutral" className="my-auto">
                    Solicitar Algo
                  </Button>
                </Row>
              </Card>
            </Col>
            <Col sm="12" className="mb-3">
              <Card className="bg-gradient-info py-5 px-3 border-0">
                <Row className="justify-content-center">
                  <Button color="neutral" className="my-auto">
                    Solicitar Algo
                  </Button>
                </Row>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  </>
);

export default DashProfile;
