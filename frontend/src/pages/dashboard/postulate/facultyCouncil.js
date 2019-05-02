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
  Button,
  Form
} from "reactstrap";

import {
  majors,
  postulationFields,
  faculties,
  normalize
} from "../../../utils";

const { facultyCouncil: fields } = postulationFields;

class FacultyCouncil extends React.Component {
  state = {
    facultyKey: "",
    facultyCouncil: {
      "facultad-de-ciencias-economicas-y-sociales": {
        name: "Facultad de Ciencias Económicas y Sociales",
        advisors: []
      },
      "facultad-de-ingenieria": {
        name: "Facultad de Ingeniería",
        advisors: []
      },
      "facultad-de-ciencias-y-artes": {
        name: "Facultad de Ciencias y Artes",
        advisors: []
      },
      "facultad-de-estudios-juridicos-y-politicos": {
        name: "Facultad de Estudios Jurídicos y Políticos",
        advisors: []
      }
    },
    ready: false,
    show: false
  };

  nextSchool = e => {
    e.preventDefault();
    document.querySelector("#facultyForm").reset(); // Clear the form
    this.setState({ ...this.state, facultyKey: "", show: false });
    this.checkReady();
  };

  onChange = e => {
    e.preventDefault();
    const { idx, faculty, substitute } = e.target.dataset;
    const state = { ...this.state };
    state.facultyCouncil[faculty].advisors[idx] = {
      ...state.facultyCouncil[faculty].advisors[idx],
      [e.target.name]: e.target.value,
      substitute
    };
    this.setState(state);
  };

  onChangeFaculty = e => {
    e.preventDefault();
    const state = { ...this.state, facultyKey: e.target.value };
    this.setState(state);
  };

  onClickFaculty = e => {
    e.preventDefault();
    document.querySelector("#facultySelect").reset();
    const state = { ...this.state, show: true };
    this.setState(state);
  };

  ready = e => {
    e.preventDefault();
    // TODO: Guardar el progreso actual como postulacion
    this.setState({ ...this.state, ready: true });
  };

  checkReady = () => {
    const { facultyCouncil } = this.state;
    for (const key in facultyCouncil) {
      const advisors = facultyCouncil[key].advisors;
      if (advisors.length < 4) {
        return;
      } else {
        for (const advisor of advisors) {
          const keys = Object.keys(advisor);
          if (keys.length < 3) {
            return;
          }
        }
      }
    }
    // TODO: Save to the parent state
    localStorage.setItem(
      "faculty-council",
      JSON.stringify(this.state.facultyCouncil)
    );
    this.setState({ ready: true });
  };

  facultySelector = () => (
    <>
      <Col md="6">
        <FormGroup>
          <Form id="facultySelect">
            <Label for="faculty">Seleccione una Facultad</Label>
            <Input
              className="form-control-alternative"
              type="select"
              name="faculty"
              id="faculty"
              placeholder="Facultad"
              onChange={this.onChangeFaculty}
              defaultValue="none"
            >
              <option disabled value="none">
                Seleccionar una Facultad
              </option>
              {faculties.map(faculty => (
                <option key={normalize(faculty)} value={normalize(faculty)}>
                  {faculty}
                </option>
              ))}
            </Input>
          </Form>
        </FormGroup>
      </Col>
      <Col md="6" className="d-flex justify-content-center">
        <Button
          color="success"
          className="my-auto"
          onClick={this.onClickFaculty}
        >
          Agregar
        </Button>
      </Col>
    </>
  );

  advisorsForm = () => (
    <>
      <Col sm="12">
        <Form id="facultyForm" className="row">
          {fields.map(({ label, id, type, idx, substitute }) => (
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
                    data-faculty={this.state.facultyKey}
                    data-substitute={substitute}
                    onChange={this.onChange}
                    defaultValue="none"
                  >
                    <option disabled value="none">
                      Seleccione una Escuela
                    </option>
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
                    data-idx={idx}
                    data-faculty={this.state.facultyKey}
                    data-substitute={substitute}
                    onChange={this.onChange}
                  />
                )}
              </FormGroup>
            </Col>
          ))}
        </Form>
      </Col>
      <Col md="6" />
      <Col md="6" className="d-flex justify-content-end">
        <Button
          color="warning"
          outline
          className="my-auto mr-3 mb-3"
          onClick={this.ready}
        >
          Cerrar Postulacion
        </Button>
        <Button
          color="success"
          className="my-auto mr-3 mb-3"
          onClick={this.nextSchool}
        >
          Siguiente Escuela
        </Button>
      </Col>
    </>
  );

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
          <Row className={this.state.show ? "d-none" : ""}>
            {this.facultySelector()}
          </Row>
          <Row className={this.state.show ? "" : "d-none"}>
            {this.advisorsForm()}
          </Row>
        </CardBody>
      </Card>
    );
  }
}

export default FacultyCouncil;
