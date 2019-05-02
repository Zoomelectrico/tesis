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

import { majors, postulationFields, normalize } from "../../../utils";

const { schoolCouncil: fields } = postulationFields;

class SchoolCouncil extends React.Component {
  state = {
    schoolKey: "",
    schools: {
      "ciencias-administrativas": {
        name: "Ciencias Administrativas",
        advisors: []
      },
      "economia-empresarial": {
        name: "Economía Empresarial",
        advisors: []
      },
      "contaduria-publica": {
        name: "Contaduría Pública",
        advisors: []
      },
      "ingenieria-civil": {
        name: "Ingeniería Civil",
        advisors: []
      },

      "ingenieria-mecanica": {
        name: "Ingeniería Mecánica",
        advisors: []
      },

      "ingenieria-de-produccion": {
        name: "Ingeniería de Producción",
        advisors: []
      },

      "ingenieria-quimica": {
        name: "Ingeniería Química",
        advisors: []
      },

      "ingenieria-de-sistemas": {
        name: "Ingeniería de Sistemas",
        advisors: []
      },

      "ingenieria-electrica": {
        name: "Ingeniería Eléctrica",
        advisors: []
      },
      educacion: {
        name: "Educación",
        advisors: []
      },
      "idiomas-modernos": {
        name: "Idiomas Modernos",
        advisors: []
      },
      "matematicas-industriales": {
        name: "Matemáticas Industriales",
        advisors: []
      },
      psicologia: {
        name: "Psicología",
        advisors: []
      },
      "estudios-liberales": {
        name: "Estudios Liberales",
        advisors: []
      },
      derecho: {
        name: "Derecho",
        advisors: []
      }
    },
    ready: false,
    show: false
  };

  onChangeSchool = e => {
    e.preventDefault();
    this.setState({ ...this.state, schoolKey: e.target.value });
  };

  onClickSchool = e => {
    e.preventDefault();
    document.getElementById("schoolCouncilSelectForm").reset();
    this.setState({ ...this.state, show: true });
  };

  onChange = e => {
    e.preventDefault();
    const { idx, substitute, school } = e.target.dataset;
    const schools = { ...this.state.schools };
    schools[school].advisors[idx] = {
      ...schools[school].advisors[idx],
      [e.target.name]: e.target.value,
      substitute
    };
    this.setState({ ...this.state, schools });
  };

  nextSchool = e => {
    e.preventDefault();
    document.getElementById("schoolCouncilForm").reset();
    this.state({ ...this.state, show: false });
  };

  ready = e => {
    e.preventDefault();
    // TODO: Save data to parent state
    localStorage.setItem("school-council", JSON.parse(this.state.schools));
    this.setState({ ...this.state, ready: true });
  };

  checkReady = () => {
    // TODO: Implement!!
  };

  schoolSelect = () => (
    <Form id="schoolCouncilSelectForm" className="row">
      <Col md="6">
        <Label for="schoolCouncilSelect">Seleccione una Escuela</Label>
        <Input
          className="form-control-alternative"
          type="select"
          name="schoolCouncilSelect"
          id="schoolCouncilSelect"
          placeholder="Seleccione una Escuela"
          onChange={this.onChangeSchool}
          defaultValue="none"
        >
          <option disabled value="none">
            Seleccione una Escuela
          </option>
          {majors.map(major => (
            <option key={normalize(major)} value={normalize(major)}>
              {major}
            </option>
          ))}
        </Input>
      </Col>
      <Col md="6" className="d-flex justify-content-center">
        <Button
          color="success"
          className="my-auto"
          onClick={this.onClickSchool}
        >
          Agregar
        </Button>
      </Col>
    </Form>
  );

  schoolCouncilForm = () => (
    <Form className="row" id="schoolCouncilForm">
      {fields.map(({ label, id, type, idx, substitute }) => (
        <Col md="6" key={id}>
          <FormGroup>
            <Label for={id}>{label}</Label>
            <Input
              className="form-control-alternative"
              id={id}
              name={id}
              placeholder={label}
              type={type}
              data-idx={idx}
              data-substitute={substitute}
              data-school={this.state.schoolKey}
              onChange={this.onChange}
            />
          </FormGroup>
        </Col>
      ))}
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
    </Form>
  );

  render() {
    return (
      <Card
        style={{ backgroundColor: "#f5f7f9" }}
        className={`mb-4 ${this.state.ready ? "d-none" : ""}`}
      >
        <CardHeader>
          <h2>Postulacion para Consejo de Escuela</h2>
        </CardHeader>
        <CardBody>
          <Row className={this.state.show ? "d-none" : ""}>
            <Col sm="12">{this.schoolSelect()}</Col>
          </Row>
          <Row className={this.state.show ? "" : "d-none"}>
            <Col sm="12">
              {this.state.schoolKey !== "" ? this.schoolCouncilForm() : null}
            </Col>
          </Row>
        </CardBody>
      </Card>
    );
  }
}

export default SchoolCouncil;
