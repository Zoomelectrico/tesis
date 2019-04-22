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

const fields = [
  {
    label: "Nombre del Consejero #1",
    id: "adviser-name-1",
    type: "text"
  },
  {
    label: "Cedula del Consejero #1",
    id: "adviser-dni-1",
    type: "number"
  },
  {
    label: "Nombre del Consejero #2",
    id: "adviser-name-2",
    type: "text"
  },
  {
    label: "Cedula del Consejero #2",
    id: "adviser-dni-2",
    type: "number"
  },
  {
    label: "Nombre del Consejero Suplente #1",
    id: "adviser-name-3",
    type: "text"
  },
  {
    label: "Cedula del Consejero Suplente #1",
    id: "adviser-dni-3",
    type: "number"
  },
  {
    label: "Nombre del Consejero Suplente #2",
    id: "adviser-name-4",
    type: "text"
  },
  {
    label: "Cedula del Consejero Suplente #2",
    id: "adviser-dni-4",
    type: "number"
  }
];

class FacultyCouncil extends React.Component {
  state = {};

  render() {
    return (
      <Card style={{ backgroundColor: "#f5f7f9" }} className="mb-4">
        <CardHeader>
          <h2>Postulacion para Consejo de Facultad</h2>
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
            <Col md="6" />
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

export default FacultyCouncil;
