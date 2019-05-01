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

import { majors, postulationFields, faculties } from "../../../utils";

const { facultyCouncil: fields } = postulationFields;

class FacultyCouncil extends React.Component {
  state = {
    facultyCouncil: {
      "facultad-de-ciencias-economicas-y-sociales": {
        name: "",
        advisors: []
      },
      "facultad-de-ingenieria": { name: "", advisors: [] },
      "facultad-de-ciencias-y-artes": { name: "", advisors: [] },
      "facultad-de-estudios-juridicos-y-politicos": { name: "", advisors: [] }
    },
    ready: false,
    show: false
  };

  addAdvisor = e => {
    e.preventDefault();
  };

  nextSchool = e => {
    e.preventDefault();
  };

  onChange = e => {
    e.preventDefault();
    // const name = e.target.name;
    // const i = e.target.dataset.idx;
    // const facultyCouncil = [...this.state.facultyCouncil[]];
    // if (name !== 'facultad') {
    //   facultyCouncil[i] = {
    //     ...facultyCouncil[i],
    //     [name]: e.target.value
    //   };
    // }

    // this.setState({ ...this.state, facultyCouncil });
  };

  render() {
    return (
      <Card
        style={{ backgroundColor: "#f5f7f9" }}
        className={`mb-4 ${this.state.ready ? "d-none" : ""}`}
      >
        <CardHeader>
          <h2>Postulacion para Consejo de Facultad</h2>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md="6">
              <FormGroup>
                <Label for="faculty">Facultad</Label>
                <Input
                  className="form-control-alternative"
                  type="select"
                  name="faculty"
                  id="faculty"
                  placeholder="Facultad"
                  onChange={this.selectFaculty}
                >
                  <option disabled selected>
                    Seleccionar una Facultad
                  </option>
                  {faculties.map(faculty => (
                    <option
                      key={faculty
                        .normalize("NFD")
                        .replace(
                          /([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi,
                          "$1"
                        )
                        .normalize()
                        .replace(/[ ]/g, "-")
                        .toLowerCase()}
                    >
                      {faculty}
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
          <Row className={this.state.show ? "" : "d-none"}>
            {fields.map(({ label, id, type }, i) => (
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
                      data-idx={i}
                    >
                      <option disabled>Seleccione una Escuela</option>
                      {majors.map(major => (
                        <option
                          key={major}
                          value={major
                            .normalize("NFD")
                            .replace(
                              /([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi,
                              "$1"
                            )
                            .normalize()
                            .replace(/[ ]/g, "-")
                            .toLowerCase()}
                        >
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
                      data-idx={i}
                    />
                  )}
                </FormGroup>
              </Col>
            ))}
            <Col md="6" />
            <Col md="6" className="d-flex justify-content-end">
              <Button
                color="info"
                className="my-auto mr-2 mb-2"
                onClick={this.addAdvisor}
              >
                Agregar
              </Button>
              <Button
                color="warning"
                className="my-auto mr-2 mb-2"
                onClick={this.nextSchool}
              >
                Siguiente Escuela
              </Button>
            </Col>
          </Row>
        </CardBody>
      </Card>
    );
  }
}

export default FacultyCouncil;
