import React, { useEffect } from "react";
import {
  Row,
  Col,
  Container,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Label,
  Input,
  Button
} from "reactstrap";
import { Navbar, Toast, notify } from "../components";

// firstName, lastName, dni, carnet, email, password

const Register = props => {
  useEffect(() => {
    document.body.classList.add("bg-default");
    return function cleanup() {
      document.body.classList.remove("bg-default");
    };
  }, []);

  const register = async e => {
    e.preventDefault();
    const [err, data] = await props.register();
    if (err) {
      notify("Hubo un error con el Registro", false);
      return;
    }
    props.history.push("/app/dashboard");
  };

  return (
    <div className="main-content">
      <Navbar {...props} />
      <div className="header bg-gradient-info py-7 py-lg-8">
        <Container>
          <Row className="justify-content-center">
            <Col sm="12" md="10" lg="7">
              <Card style={{ backgroundColor: "#f5f7f9" }}>
                <CardHeader>
                  <h3>Registrarse</h3>
                </CardHeader>
                <CardBody className="p-3">
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <Label for="firstName">Nombres</Label>
                        <Input
                          onChange={props.onChangeRegister}
                          className="form-control-alternative"
                          type="text"
                          name="firstName"
                          id="firstName"
                          placeholder="Nombres"
                        />
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <Label for="lastName">Apellidos</Label>
                        <Input
                          onChange={props.onChangeRegister}
                          className="form-control-alternative"
                          type="text"
                          name="lastName"
                          id="lastName"
                          placeholder="Apellido"
                        />
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <Label for="dni">Cedula de Identidad</Label>
                        <Input
                          onChange={props.onChangeRegister}
                          className="form-control-alternative"
                          type="number"
                          name="dni"
                          id="dni"
                          placeholder="00000000"
                        />
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <Label for="email">Correo Electronico</Label>
                        <Input
                          onChange={props.onChangeRegister}
                          className="form-control-alternative"
                          type="email"
                          name="email"
                          id="email"
                          placeholder="email@correo.unimet.edu.ve"
                        />
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <Label for="password">Contrasena</Label>
                        <Input
                          onChange={props.onChangeRegister}
                          className="form-control-alternative"
                          type="password"
                          name="password"
                          id="password"
                          placeholder="********"
                        />
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <Label for="rePassword">Repita la Contrasena</Label>
                        <Input
                          onChange={props.onChangeRegister}
                          className="form-control-alternative"
                          type="password"
                          name="rePassword"
                          id="rePassword"
                          placeholder="********"
                        />
                      </FormGroup>
                    </Col>
                    <Col md="12 d-flex justify-content-center">
                      <Button
                        color="success"
                        className="my-auto"
                        onClick={register}
                      >
                        Registrarse
                      </Button>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <Toast />
    </div>
  );
};

export default Register;
