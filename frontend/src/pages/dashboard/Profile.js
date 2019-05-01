import React, { useState, useEffect } from "react";
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

const DashProfile = props => {
  const { updateUser } = props;
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    major: "",
    carnet: "",
    dni: ""
  });

  const onChange = (key, value) => {
    setUser({ ...user, [key]: value });
  };

  useEffect(() => {
    const { user: _user } = props;
    setUser({ ..._user });
  }, [props.user]);

  return (
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
                      <Label for="firstName">Nombres</Label>
                      <Input
                        className="form-control-alternative"
                        type="text"
                        name="firstName"
                        id="firstName"
                        value={user.firstName || ""}
                        onChange={e => onChange(e.target.name, e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label for="lastName">Apellidos</Label>
                      <Input
                        className="form-control-alternative"
                        type="text"
                        name="lastName"
                        id="lastName"
                        value={user.lastName || ""}
                        onChange={e => onChange(e.target.name, e.target.value)}
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
                        value={user.dni || ""}
                        onChange={e => onChange(e.target.name, e.target.value)}
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
                        value={user.carnet || ""}
                        onChange={e => onChange(e.target.name, e.target.value)}
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
                        onChange={e => onChange(e.target.name, e.target.value)}
                        value={user.major}
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
                        value={user.email}
                        onChange={e => onChange(e.target.name, e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6" />
                  <Col md="6" className="d-flex justify-content-end">
                    <Button
                      color="success"
                      className="my-auto"
                      onClick={e => updateUser(e, user)}
                    >
                      Actualizar
                    </Button>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col md="12" lg="4">
            <Row>
              {user.privilege < 2 ? (
                <Col sm="12" className="mb-3">
                  <Card className="bg-gradient-warning py-5 px-3 border-0">
                    <Row className="justify-content-center">
                      <Button
                        color="neutral"
                        className="my-auto"
                        onClick={e => e.preventDefault()}
                      >
                        Solicitar - Representante Electoral
                      </Button>
                    </Row>
                  </Card>
                </Col>
              ) : null}
              <Col sm="12" className="mb-3">
                <Card className="bg-gradient-success py-5 px-3 border-0">
                  <Row className="justify-content-center">
                    <Button
                      color="neutral"
                      className="my-auto"
                      onClick={e => e.preventDefault()}
                    >
                      Realizar Queja Formal
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
};

export default DashProfile;
