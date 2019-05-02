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

const { academicCouncil: fields } = postulationFields;

class Council extends React.Component {
  state = {
    academicCouncil: {},
    ready: false
  };

  onChange = e => {
    e.preventDefault();
    const state = {
      ...this.state,
      academicCouncil: {
        ...this.state.academicCouncil,
        [e.target.name]: e.targer.value
      }
    };
    this.setState(state);
  };

  save = e => {
    e.preventDefault();
    // TODO: Need to save current state to parent state
    localStorage.setItem(
      "academic-council",
      JSON.stringify(this.state.academicCouncil)
    );
    this.setState({ ...this.state, ready: true });
  };

  renderCol = (label, id, type) => (
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
  );

  render() {
    return (
      <Card
        style={{ backgroundColor: "#f5f7f9" }}
        className={`mb-4 ${this.state.ready ? "d-none" : ""}`}
      >
        <CardHeader>
          <h2>Postulacion para Consejo Academico</h2>
        </CardHeader>
        <CardBody>
          <Row>
            {fields.map(({ label, id, type }, i) =>
              i === fields.length - 1 ? (
                <React.Fragment key={`${id}-${i}`}>
                  {this.renderCol(label, id, type)}
                  <Col md="4" className="d-flex justify-content-center">
                    <Button
                      color="success"
                      className="my-auto"
                      onClick={this.save}
                    >
                      Agregar
                    </Button>
                  </Col>
                </React.Fragment>
              ) : (
                this.renderCol(label, id, type)
              )
            )}
          </Row>
        </CardBody>
      </Card>
    );
  }
}

export default Council;
