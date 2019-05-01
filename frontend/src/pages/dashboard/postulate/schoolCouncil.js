import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  FormGroup,
  Input,
  Label,
  Button
} from "reactstrap";

import { majors, postulationFields } from "../../../utils";

const { schoolCouncil: fields } = postulationFields;

class SchoolCouncil extends React.Component {
  state = {};

  render() {
    return (
      <Card style={{ backgroundColor: "#f5f7f9" }} className="mb-4">
        <CardHeader>
          <h2>Postulacion para Consejo de Escuela</h2>
        </CardHeader>
        <CardBody>
          <Row>
            {fields.map(({ label, id, type }) => (
              <Col md="6" key={id}>
                <FormGroup>
                  <Label for={id}>{label}</Label>
                  <Input
                    className="form-control-alternative"
                    id={id}
                    name={id}
                    placeholder={label}
                    type={type}
                  />
                </FormGroup>
              </Col>
            ))}
            <Col md="6">
              <FormGroup>
                <Label>Escuela</Label>
                <Input
                  className="form-control-alternative"
                  id="school"
                  name="school"
                  type="select"
                >
                  {majors.map(major => (
                    <option key={major} value={major}>
                      {major}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            </Col>
            <Col md="6" className="d-flex justify-content-end">
              <Button color="success" className="my-auto">
                Agregar
              </Button>
            </Col>
          </Row>
        </CardBody>
      </Card>
    );
  }
}

export default SchoolCouncil;
