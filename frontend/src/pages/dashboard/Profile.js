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

import { Header, Toast, notify } from "../../components";
import { majors, normalize, post } from "../../utils";

const DashProfile = props => {
  const { updateUser, location } = props;
  const query = new URLSearchParams(location.search);

  const update = async (e, user) => {
    e.preventDefault();
    const [err, data] = await updateUser(user);
    console.log(data);
    if (err) {
      return notify("Ha Ocurrido un Error al Actualizar", false);
    }
    if (query.get("url") && query.get("reason")) {
      props.history.push(query.get("url"));
    }
    return notify("Perfil Actualizado", true);
  };

  const [user, setUser] = useState({
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    major: "",
    carnet: "",
    dni: ""
  });

  useEffect(() => {
    const { user: _user } = props;
    if (query.get("url") && query.get("reason")) {
      notify(
        query
          .get("reason")
          .toString()
          .replace(/[-]/g, " "),
        false
      );
    }
    setUser({ ..._user });
  }, [props.user]);

  const onChange = (key, value) => {
    setUser({ ...user, [key]: value });
  };

  const demand = async (e, type) => {
    try {
      e.preventDefault();
      const _demand = { type, user: user._id, representative: user._id };
      await post("/demand-create", _demand);
      notify("Su solicitud ha sido enviada", true);
    } catch (err) {
      notify("Su solicitud no se ha podido enviar", false);
    }
  };

  const valueProp = {};
  user.major
    ? (valueProp.value = user.major)
    : (valueProp.defaultValue = "none");

  const fields = [
    {
      label: "Nombres",
      id: "firstName",
      type: "text",
      value: "firstName"
    },
    {
      label: "Apellidos",
      id: "lastName",
      type: "text",
      value: "lastName"
    },
    {
      label: "Cedula de Identidad",
      id: "dni",
      type: "number",
      value: "dni"
    },
    {
      label: "Carnet",
      id: "carnet",
      type: "number",
      value: "carnet"
    },
    {
      label: "Correo Electronico",
      id: "email",
      type: "email",
      value: "email"
    }
  ];

  const renderFields = fields =>
    fields.map(({ id, type, value, label }) => (
      <Col md="6" key={id}>
        <FormGroup>
          <Label for={id}>{label}</Label>
          <Input
            className="form-control-alternative"
            type={type}
            name={id}
            id={id}
            value={user[value] || ""}
            onChange={e => onChange(e.target.name, e.target.value)}
          />
        </FormGroup>
      </Col>
    ));

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
                  {renderFields(fields)}
                  {user.privilege <= 2 ? (
                    <Col md="6">
                      <FormGroup>
                        <Label for="major">Carrera</Label>
                        <Input
                          className="form-control-alternative"
                          type="select"
                          name="major"
                          id="major"
                          onChange={e =>
                            onChange(e.target.name, e.target.value)
                          }
                          {...valueProp}
                        >
                          <option value="none" disabled>
                            Selecciona Una Carrera
                          </option>
                          {majors.map(major => (
                            <option
                              key={normalize(major)}
                              value={normalize(major)}
                            >
                              {major}
                            </option>
                          ))}
                        </Input>
                      </FormGroup>
                    </Col>
                  ) : null}
                </Row>
                <Row>
                  <Col md="6" />
                  <Col md="6" className="d-flex justify-content-end">
                    <Button
                      color="success"
                      className="my-auto"
                      onClick={e => update(e, user)}
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
                        onClick={e => demand(e, "REPRESENTANTE")}
                      >
                        Solicitar - Representante Electoral
                      </Button>
                    </Row>
                  </Card>
                </Col>
              ) : null}
              {user.privilege >= 3 ? (
                <Col sm="12" className="mb-3">
                  <Card className="bg-gradient-warning py-5 px-3 border-0">
                    <Row className="justify-content-center">
                      <Button
                        color="neutral"
                        className="my-auto"
                        onClick={e => e.preventDefault()}
                      >
                        Resultados Preliminares
                      </Button>
                    </Row>
                  </Card>
                </Col>
              ) : null}
              {user.privilege <= 2 ? (
                <Col sm="12" className="mb-3">
                  <Card className="bg-gradient-success py-5 px-3 border-0">
                    <Row className="justify-content-center">
                      <Button
                        color="neutral"
                        className="my-auto"
                        onClick={e => e.preventDefault() /* Open Modal */}
                      >
                        Realizar Queja Formal
                      </Button>
                    </Row>
                  </Card>
                </Col>
              ) : null}
            </Row>
          </Col>
        </Row>
      </Container>
      <Toast />
    </>
  );
};

export default DashProfile;
