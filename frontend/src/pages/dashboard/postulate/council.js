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
    label: "Nombre del Consejero",
    id: "adviser-name",
    type: "text"
  },
  {
    label: "Correo Electronico del Consejero",
    id: "adviser-email",
    type: "email"
  },
  {
    label: "Cedula del Consejero",
    id: "adviser-dni",
    type: "number"
  },
  {
    label: "Telefono del Consejero",
    id: "adviser-phone",
    type: "tel"
  }
];

class Council extends React.Component {
  state = {};

  render() {
    return (
      <Card style={{ backgroundColor: "#f5f7f9" }} className="mb-4">
        <CardHeader>
          <h2>Postulacion para Consejo Academico</h2>
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

export default Council;
