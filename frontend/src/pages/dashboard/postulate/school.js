import React from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  FormGroup,
  Label,
  Input
} from "reactstrap";

import { majors } from "../../../utils";

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
    label: "Nombre del Coordinador General",
    id: "coordinator-name",
    type: "text"
  },
  {
    label: "Cedula del Coordinador General",
    id: "coordinator-dni",
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

const School = props => (
  <>
    <Card style={{ backgroundColor: "#f5f7f9" }} className="mb-4">
      <CardHeader className="p-3">
        <h2>Postulacion para Centro de Estudiante</h2>
      </CardHeader>
      <CardBody>
        <Row>
          {fields.map(({ label, id, type }) => (
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
          ))}
          <Col md="6">
            <FormGroup>
              <Label for="major">Escuela de los Postulados</Label>
              <Input
                type="select"
                name="major"
                id="name"
                className="form-control-alternative"
              >
                {majors.map(major => (
                  <option
                    key={major.replace(/[ ]/g, "-")}
                    value={major.replace(/[ ]/g, "-")}
                  >
                    {major}
                  </option>
                ))}
              </Input>
            </FormGroup>
          </Col>
          <Col md="6" className="d-flex justify-content-center">
            <Button color="success" className="my-auto">
              Agregar
            </Button>
          </Col>
        </Row>
      </CardBody>
    </Card>
  </>
);

export default School;
