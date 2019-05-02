import React from "react";
import {
  Button,
  Col,
  Row,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Input,
  Label
} from "reactstrap";

import { postulationFields, majors, normalize } from "../../../utils";

const {
  fields,
  fieldsAcademic,
  fieldsCulture,
  fieldsResponsibility,
  fieldsServices,
  fieldsSports
} = postulationFields;

class StudentFederationCenter extends React.Component {
  state = {
    studentFederationCenter: [],
    sports: [],
    culture: [],
    services: [],
    academic: [],
    responsibility: [],
    ready: false
  };

  onChange = e => {
    e.preventDefault();
    const { idx, charge, key } = e.target.dataset;
    const state = { ...this.state };
    state[key][idx] = {
      ...state[key][idx],
      charge,
      [e.target.name]: e.target.values
    };
    this.setState(state);
  };

  renderForm = (fields, key) =>
    fields.map(({ label, id, type, idx, charge }) => (
      <Col md="4" key={id}>
        <FormGroup>
          <Label for={id}>{label}</Label>
          {type === "select" ? (
            <Input
              className="form-control-alternative"
              type={type}
              name={id}
              id={id}
              placeholder={label}
              data-idx={idx}
              data-charge={charge}
              data-key={key}
              onChange={this.onChange}
            >
              {majors.map(major => (
                <option key={normalize(major)} value={normalize(major)}>
                  {major}
                </option>
              ))}
            </Input>
          ) : (
            <Input
              className="form-control-alternative"
              type={type}
              name={id}
              id={id}
              placeholder={label}
              data-idx={idx}
              data-charge={charge}
              data-key={key}
              onChange={this.onChange}
            />
          )}
        </FormGroup>
      </Col>
    ));

  save = e => {
    e.preventDefault();
    // TODO: save current state in parent state
    localStorage.setItem(
      "student-federation-center",
      JSON.stringify(this.state)
    );
    this.setState({ ...this.state, ready: true });
  };

  render() {
    return (
      <Card
        style={{ backgroundColor: "#f5f7f9" }}
        className={`mb-4 ${this.state.ready ? "d-none" : ""}`}
      >
        <CardHeader>
          <h2>Postulacion para la Federacion de Centros de Estudiantes</h2>
        </CardHeader>
        <CardBody>
          <Row>{this.renderForm(fields, "studentFederationCenter")}</Row>
          <Row>
            <div className="mb-3" />
          </Row>
          {/* Deportes */}
          <Row>
            <Col sm="12">
              <h2>Coordinacion de Deportes</h2>
            </Col>
          </Row>
          <Row>{this.renderForm(fieldsSports, "sports")}</Row>
          <Row>
            <div className="mb-3" />
          </Row>
          {/* Cultura */}
          <Row>
            <Col sm="12">
              <h2>Coordinacion de Cultura</h2>
            </Col>
          </Row>
          <Row>{this.renderForm(fieldsCulture, "culture")}</Row>
          <Row>
            <div className="mb-3" />
          </Row>
          {/* Servicios */}
          <Row>
            <Col sm="12">
              <h2>Coordinacion de Servicios</h2>
            </Col>
          </Row>
          <Row>{this.renderForm(fieldsServices, "services")}</Row>
          <Row>
            <Col sm="12">
              <div className="mb-3" />
            </Col>
          </Row>
          {/* Academica */}
          <Row>
            <Col sm="12">
              <h2>Coordinacion Academica</h2>
            </Col>
          </Row>
          <Row>{this.renderForm(fieldsAcademic, "academic")}</Row>
          <Row>
            <div className="mb-3" />
          </Row>
          {/* Responsabilidad SU */}
          <Row>
            <Col sm="12">
              <h2>Coordinacion de Responsabilidad SU</h2>
            </Col>
          </Row>
          <Row>{this.renderForm(fieldsResponsibility, "responsibility")}</Row>
          <Row>
            <div className="mb-3" />
          </Row>
          <Row>
            <Col sm="6" />
            <Col
              sm="6"
              className="d-flex justify-content-end"
              onClick={this.save}
            >
              <Button color="success">Agregar</Button>
            </Col>
          </Row>
        </CardBody>
      </Card>
    );
  }
}

export default StudentFederationCenter;
