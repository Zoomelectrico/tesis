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

const fields = [
  {
    label: "Nombre del Presidente",
    id: "president-name",
    type: "text"
  },
  {
    label: "Cedula del Presidente",
    id: "president-dni",
    type: "number"
  },
  {
    label: "Nombre del Secretario General",
    id: "secretary-general-name",
    type: "text"
  },
  {
    label: "Cedula del Secretario General",
    id: "pressecretary-generalident-dni",
    type: "number"
  },
  {
    label: "Nombre del Secretario de Asustos Internos",
    id: "internal-affairs-name",
    type: "text"
  },
  {
    label: "Cedula del Secretario de Asustos Internos",
    id: "internal-affairs-dni",
    type: "number"
  },
  {
    label: "Nombre del Coordinador General",
    id: "general-coordinator-name",
    type: "text"
  },
  {
    label: "Cedula del Coordinador General",
    id: "general-coordinator-dni",
    type: "number"
  },
  {
    label: "Nombre del Tesorero",
    id: "treasurer-name",
    type: "text"
  },
  {
    label: "Cedula del Tesorero",
    id: "treasurer-dni",
    type: "number"
  }
];

const fieldsSports = [
  {
    label: "Nombre del Coordinador de Deportes #1",
    type: "text",
    id: "sports-name-1"
  },
  {
    label: "Cedula del Coordinador de Deportes #1",
    type: "number",
    id: "sports-dni-1"
  },
  {
    label: "Nombre del Coordinador de Deportes #2",
    type: "text",
    id: "sports-name-2"
  },
  {
    label: "Cedula del Coordinador de Deportes #2",
    type: "number",
    id: "sports-dni-2"
  }
];

const fieldsCulture = [
  {
    label: "Nombre del Coordinador de Cultura #1",
    type: "text",
    id: "culture-name-1"
  },
  {
    label: "Cedula del Coordinador de Cultura #1",
    type: "number",
    id: "culture-dni-1"
  },
  {
    label: "Nombre del Coordinador de Cultura #2",
    type: "text",
    id: "culture-name-2"
  },
  {
    label: "Cedula del Coordinador de Cultura #2",
    type: "number",
    id: "culture-dni-2"
  }
];

const fieldsServices = [
  {
    label: "Nombre del Coordinador de Servicios e Infraestructura #1",
    type: "text",
    id: "services-name-1"
  },
  {
    label: "Cedula del Coordinador de Servicios e Infraestructura #1",
    type: "number",
    id: "services-dni-1"
  },
  {
    label: "Nombre del Coordinador de Servicios e Infraestructura #2",
    type: "text",
    id: "services-name-2"
  },
  {
    label: "Cedula del Coordinador de Servicios e Infraestructura #2",
    type: "number",
    id: "services-dni-2"
  }
];

const fieldsAcademic = [
  {
    label: "Nombre del Coordinador de Academico #1",
    type: "text",
    id: "academic-name-1"
  },
  {
    label: "Cedula del Coordinador de Academico #1",
    type: "number",
    id: "academic-dni-1"
  },
  {
    label: "Nombre del Coordinador de Academico #2",
    type: "text",
    id: "academic-name-2"
  },
  {
    label: "Cedula del Coordinador de Academico #2",
    type: "number",
    id: "academic-dni-2"
  }
];

const fieldsResponsability = [
  {
    label: "Nombre del Coordinador de Responsabilidad SU #1",
    type: "text",
    id: "responsability-name-1"
  },
  {
    label: "Cedula del Coordinador de Responsabilidad SU #1",
    type: "number",
    id: "responsability-dni-1"
  },
  {
    label: "Nombre del Coordinador de Responsabilidad SU #2",
    type: "text",
    id: "responsability-name-2"
  },
  {
    label: "Cedula del Coordinador de Responsabilidad SU #2",
    type: "number",
    id: "responsability-dni-2"
  }
];

const renderForm = fields =>
  fields.map(({ label, id, type }) => (
    <Col md="6" key={id}>
      <FormGroup>
        <Label for={id}>{label}</Label>
        <Input
          className="form-control-alternative"
          type={type}
          name={id}
          id={id}
          placeholder={label}
        />
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
