import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Label
} from "reactstrap";
import { Navbar, Footer } from "../components";
import { majors, env } from "../utils";

const Home = props => {
  useEffect(() => {
    document.body.classList.add("bg-default");
    return function cleanup() {
      document.body.classList.remove("bg-default");
    };
  }, []);
  const [formData, setFormData] = useState({
    name: "",
    major: "",
    email: "",
    message: ""
  });

  const onChangeForm = e => {
    e.preventDefault();
    const data = {
      ...formData,
      [e.target.name]: [e.target.value]
    };
    setFormData(data);
  };

  const [electoralR, setElectoralR] = useState("");

  const onChangeER = e => {
    e.preventDefault();
    setElectoralR(e.target.value);
  };

  const sendForm = async e => {
    e.preventDefault();
    const { data } = await axios.post(`${env.API_URL}/home-form`, formData);
    if (data && data.success) {
      // All good, send a flash
    } else {
      // Send a flash
    }
  };

  return (
    <>
      <div className="main-content">
        <Navbar {...props} />
        <div className="header bg-gradient-info py-7 py-lg-8">
          <Container>
            <div className="header-body text-center mb-7">
              <Row className="justify-content-center">
                <Col lg="5" md="6">
                  <h1 className="text-white">Bienvenido!</h1>
                  <p className="text-lead text-light">
                    Vota Unimet es un proyecto piloto, unico en su clase en
                    Venezuela{" "}
                    <span aria-label="venezuela flag" role="img">
                      🇻🇪
                    </span>
                  </p>
                </Col>
              </Row>
            </div>
          </Container>
          <div className="separator separator-bottom separator-skew zindex-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="fill-default"
                points="2560 0 2560 100 0 100"
              />
            </svg>
          </div>
          <Container>
            <Row>
              <Col sm="12" md="12" lg="4" className="mb-3">
                <Card>
                  <CardHeader className="p-3">
                    <div className="text-muted text">
                      <h2>Como funciona</h2>
                    </div>
                  </CardHeader>
                  <CardBody>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Voluptatum aspernatur nihil, assumenda est sequi corporis
                    suscipit in veritatis quod natus!
                  </CardBody>
                </Card>
              </Col>
              <Col sm="12" md="12" lg="4" className="mb-3">
                <Card>
                  <CardHeader className="p-3">
                    <div className="text-muted text">
                      <h2>Como funciona</h2>
                    </div>
                  </CardHeader>
                  <CardBody>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Voluptatum aspernatur nihil, assumenda est sequi corporis
                    suscipit in veritatis quod natus!
                  </CardBody>
                </Card>
              </Col>
              <Col sm="12" md="12" lg="4" className="mb-3">
                <Card>
                  <CardHeader className="p-3">
                    <div className="text-muted text">
                      <h2>Como funciona</h2>
                    </div>
                  </CardHeader>
                  <CardBody>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Voluptatum aspernatur nihil, assumenda est sequi corporis
                    suscipit in veritatis quod natus!
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
        <div>
          <Container className="py-5">
            <Row className="justify-content-center">
              <Col sm="12" className="text-center">
                <h2 className="text-white">Consultar el Registro Electoral</h2>
              </Col>
              <Col sm="12" md="7" lg="5">
                <FormGroup>
                  <Label for="dni" className="text-white">
                    Cedula de Identidad
                  </Label>
                  <Row>
                    <Col sm="12" md="9">
                      <Input
                        className="form-control-alternative"
                        type="number"
                        name="dni"
                        id="dni"
                        placeholder="cedula de identidad"
                        onChange={onChangeER}
                      />
                    </Col>
                    <Col sm="12" md="3">
                      <Link
                        to={{
                          pathname: "/electoral-register",
                          search: `?dni=${electoralR}`
                        }}
                      >
                        <Button>Revisar</Button>
                      </Link>
                    </Col>
                  </Row>
                </FormGroup>
              </Col>
            </Row>
          </Container>
          <Container className="pb-5">
            <Row className="justify-content-center">
              <Col sm="12" md="8" lg="6">
                <Card style={{ backgroundColor: "#f5f7f9" }}>
                  <CardHeader
                    className="p-3"
                    style={{ backgroundColor: "#f5f7f9" }}
                  >
                    <h2 className="text-center">Contacto!</h2>
                  </CardHeader>
                  <CardBody>
                    <Form>
                      <Row className="justify-content-center">
                        <Col sm="12">
                          <FormGroup>
                            <Label for="name">Nombre y Apellido</Label>
                            <Input
                              className="form-control-alternative"
                              type="text"
                              name="name"
                              id="name"
                              required={true}
                              placeholder="Nombre y Apellido"
                              onChange={onChangeForm}
                            />
                          </FormGroup>
                        </Col>
                        <Col sm="12">
                          <FormGroup>
                            <Label for="email">Correo Electronico</Label>
                            <Input
                              className="form-control-alternative"
                              type="email"
                              name="email"
                              id="email"
                              required={true}
                              placeholder="Correo Electronico"
                              onChange={onChangeForm}
                            />
                          </FormGroup>
                        </Col>
                        <Col sm="12">
                          <Label for="major">Carrera</Label>
                          <Input
                            className="form-control-alternative"
                            type="select"
                            name="major"
                            id="major"
                            required={true}
                            onChange={onChangeForm}
                          >
                            {majors.map(major => (
                              <option key={major} value={major}>
                                {major}
                              </option>
                            ))}
                            <option key="otro" value="otro">
                              otro
                            </option>
                          </Input>
                        </Col>
                        <Col sm="12">
                          <Label for="message">Mensaje</Label>
                          <Input
                            className="form-control-alternative"
                            type="textarea"
                            name="message"
                            id="message"
                            onChange={onChangeForm}
                          />
                        </Col>
                        <Button
                          color="primary"
                          className="mt-3"
                          onClick={sendForm}
                        >
                          Enviar
                        </Button>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
        <Container fluid>
          <Row>
            <Col sm="12">
              <Footer />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Home;
