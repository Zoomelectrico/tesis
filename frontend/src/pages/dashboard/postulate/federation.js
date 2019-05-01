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

import { postulationFields, majors } from "../../../utils";

const {
  fields,
  fieldsAcademic,
  fieldsCulture,
  fieldsResponsability,
  fieldsServices,
  fieldsSports
} = postulationFields;

const renderForm = fields =>
  fields.map(({ label, id, type }) => (
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
          >
            {majors.map(major => (
              <option key={major} value={major}>
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
          />
        )}
      </FormGroup>
    </Col>
  ));

const StudentFederationCenter = props => (
  <Card style={{ backgroundColor: "#f5f7f9" }} className="mb-4">
    <CardHeader>
      <h2>Postulacion para la Federacion de Centros de Estudiantes</h2>
    </CardHeader>
    <CardBody>
      <Row>{renderForm(fields)}</Row>
      <Row>
        <div className="mb-3" />
      </Row>
      {/* Deportes */}
      <Row>
        <Col sm="12">
          <h2>Coordinacion de Deportes</h2>
        </Col>
      </Row>
      <Row>{renderForm(fieldsSports)}</Row>
      <Row>
        <div className="mb-3" />
      </Row>
      {/* Cultura */}
      <Row>
        <Col sm="12">
          <h2>Coordinacion de Cultura</h2>
        </Col>
      </Row>
      <Row>{renderForm(fieldsCulture)}</Row>
      <Row>
        <div className="mb-3" />
      </Row>
      {/* Servicios */}
      <Row>
        <Col sm="12">
          <h2>Coordinacion de Servicios</h2>
        </Col>
      </Row>
      <Row>{renderForm(fieldsServices)}</Row>
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
      <Row>{renderForm(fieldsAcademic)}</Row>
      <Row>
        <div className="mb-3" />
      </Row>
      {/* Responsabilidad SU */}
      <Row>
        <Col sm="12">
          <h2>Coordinacion de Responsabilidad SU</h2>
        </Col>
      </Row>
      <Row>{renderForm(fieldsResponsability)}</Row>
      <Row>
        <div className="mb-3" />
      </Row>
      <Row>
        <Col sm="6" />
        <Col sm="6" className="d-flex justify-content-end">
          <Button color="success">Agregar</Button>
        </Col>
      </Row>
    </CardBody>
  </Card>
);

export default StudentFederationCenter;
