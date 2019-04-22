import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import { Header } from "../../components";

class DashVote extends React.Component {
  state = {};
  render() {
    return (
      <>
        <Header />
        <Container className="mt--7">
          <Row>
            <Col md="12">
              <Card style={{ backgroundColor: "#f5f7f9" }}>
                <CardHeader>
                  <h2>Emision del Voto</h2>
                </CardHeader>
                <CardBody>
                  <Container fluid>
                    <Row>
                      <Col sm="12">
                        <h2>Federacion de Centro de Estudiantes</h2>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="6">
                        <FormGroup>
                          <Label for="federation">
                            Voto Lista Junta Directiva
                          </Label>
                          <Input
                            className="form-control-alternative"
                            type="select"
                            name="federation"
                            id="federation"
                          >
                            <option value="Option 1">Option 1</option>
                            <option value="Option 2">Option 2</option>
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <FormGroup>
                          <Label for="sports">
                            Voto Lista Coordinacion Deportiva
                          </Label>
                          <Input
                            className="form-control-alternative"
                            type="select"
                            name="sports"
                            id="sports"
                          >
                            <option value="Option 1">Option 1</option>
                            <option value="Option 2">Option 2</option>
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <FormGroup>
                          <Label for="culture">
                            Voto Lista Coordinacion de Cultura
                          </Label>
                          <Input
                            className="form-control-alternative"
                            type="select"
                            name="culture"
                            id="culture"
                          >
                            <option value="Option 1">Option 1</option>
                            <option value="Option 2">Option 2</option>
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <FormGroup>
                          <Label for="services">
                            Voto Lista Coordinacion de Servicios e
                            Infraestructura
                          </Label>
                          <Input
                            className="form-control-alternative"
                            type="select"
                            name="services"
                            id="services"
                          >
                            <option value="Option 1">Option 1</option>
                            <option value="Option 2">Option 2</option>
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <FormGroup>
                          <Label for="academic">
                            Voto Lista Coordinacion Academica
                          </Label>
                          <Input
                            className="form-control-alternative"
                            type="select"
                            name="academic"
                            id="academic"
                          >
                            <option value="Option 1">Option 1</option>
                            <option value="Option 2">Option 2</option>
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <FormGroup>
                          <Label for="responsability">
                            Voto Lista Coordinacion de Resp. Social
                            Universitaria
                          </Label>
                          <Input
                            className="form-control-alternative"
                            type="select"
                            name="responsability"
                            id="responsability"
                          >
                            <option value="Option 1">Option 1</option>
                            <option value="Option 2">Option 2</option>
                          </Input>
                        </FormGroup>
                      </Col>
                    </Row>
                  </Container>
                  <Container fluid className="mt-3">
                    <Row>
                      <Col sm="12">
                        <h2>Consejero Academico</h2>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="6">
                        <FormGroup>
                          <Label for="adviser">
                            Voto por Consejero Academico
                          </Label>
                          <Input
                            className="form-control-alternative"
                            type="select"
                            name="adviser"
                            id="adviser"
                          >
                            <option value="Option 1">Option 1</option>
                            <option value="Option 2">Option 2</option>
                          </Input>
                        </FormGroup>
                      </Col>
                    </Row>
                  </Container>
                  <Container fluid className="mt-3">
                    <Row>
                      <Col sm="12">
                        <h2>
                          Consejo de Escuela, Facultad y Centro de Estudiantes
                          de Escuela
                        </h2>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <FormGroup>
                          <Label for="school">
                            Voto para el Centro de Estudiantes
                          </Label>
                          <Input
                            className="form-control-alternative"
                            type="select"
                            name="school"
                            id="school"
                          >
                            <option value="option 1">Opcion 1</option>
                            <option value="option 1">Opcion 1</option>
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup>
                          <Label for="school-council">
                            Voto para el Consejo de Escuela
                          </Label>
                          <Input
                            className="form-control-alternative"
                            type="select"
                            name="school-council"
                            id="school-council"
                          >
                            <option value="option 1">Opcion 1</option>
                            <option value="option 1">Opcion 1</option>
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup>
                          <Label for="faculty-council">
                            Voto para el Consejo de Facultad
                          </Label>
                          <Input
                            className="form-control-alternative"
                            type="select"
                            name="faculty-council"
                            id="faculty-council"
                          >
                            <option value="option 1">Opcion 1</option>
                            <option value="option 1">Opcion 1</option>
                          </Input>
                        </FormGroup>
                      </Col>
                    </Row>
                  </Container>
                  <Container fluid className="mt-3">
                    <Row>
                      <Col md="6" />
                      <Col md="6" className="d-flex justify-content-end">
                        <Button color="success" className="my-auto">
                          Votar
                        </Button>
                      </Col>
                    </Row>
                  </Container>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default DashVote;
