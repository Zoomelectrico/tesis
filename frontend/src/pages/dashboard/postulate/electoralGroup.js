import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Col,
  Row,
  FormGroup,
  Label,
  Input,
  Button
} from "reactstrap";

const ElectoralGroup = props => (
  <>
    <Card style={{ backgroundColor: "#f5f7f9" }} className="mb-4">
      <CardHeader className="p-3">
        <h2>Grupo Electoral</h2>
      </CardHeader>
      <CardBody>
        <Row>
          <Col md="6">
            <FormGroup>
              <Label for="denomination">Denominacion</Label>
              <Input
                className="form-control-alternative"
                type="text"
                name="denomination"
                id="denomination"
                placeholder="Denominacion"
                onChange={props.onChange}
              />
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup>
              <Label for="number">Numero</Label>
              <Input
                className="form-control-alternative"
                type="number"
                name="number"
                id="number"
                placeholder="Numero"
                onChange={props.onChange}
              />
            </FormGroup>
          </Col>

          <Col md="6">
            <FormGroup>
              <Label for="colorName">Nombre del Color</Label>
              <Input
                className="form-control-alternative"
                type="text"
                name="colorName"
                id="colorName"
                placeholder="Nombre del Color"
                onChange={props.onChange}
              />
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup>
              <Label for="colorHex">Codigo Hexadecimal del Color</Label>
              <Input
                className="form-control-alternative"
                type="color"
                name="colorHex"
                id="colorHex"
                placeholder="Color Hex"
                onChange={props.onChange}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <FormGroup>
              <Label for="logo">Logo</Label>
              <Input
                type="file"
                name="logo"
                id="logo"
                onChange={props.onChangeFile}
              />
            </FormGroup>
          </Col>
          <Col md="6" className="d-flex justify-content-end">
            <Button
              color="success"
              className="my-auto"
              onClick={props.createElectoralGroup}
            >
              Registrar
            </Button>
          </Col>
        </Row>
      </CardBody>
    </Card>
  </>
);

export default ElectoralGroup;
