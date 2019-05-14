/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Form,
} from 'reactstrap';

import {
  majors,
  postulationFields,
  normalize,
  normalizeInputs,
} from '../../../utils';

const { school: fields } = postulationFields;

class School extends React.Component {
  state = {
    schoolKey: '',
    schools: {
      'ciencias-administrativas': {
        name: 'Ciencias Administrativas',
        sc: [],
      },
      'economia-empresarial': {
        name: 'Economía Empresarial',
        sc: [],
      },
      'contaduria-publica': {
        name: 'Contaduría Pública',
        sc: [],
      },
      'ingenieria-civil': {
        name: 'Ingeniería Civil',
        sc: [],
      },

      'ingenieria-mecanica': {
        name: 'Ingeniería Mecánica',
        sc: [],
      },

      'ingenieria-de-produccion': {
        name: 'Ingeniería de Producción',
        sc: [],
      },

      'ingenieria-quimica': {
        name: 'Ingeniería Química',
        sc: [],
      },

      'ingenieria-de-sistemas': {
        name: 'Ingeniería de Sistemas',
        sc: [],
      },

      'ingenieria-electrica': {
        name: 'Ingeniería Eléctrica',
        sc: [],
      },
      educacion: {
        name: 'Educación',
        sc: [],
      },
      'idiomas-modernos': {
        name: 'Idiomas Modernos',
        sc: [],
      },
      'matematicas-industriales': {
        name: 'Matemáticas Industriales',
        sc: [],
      },
      psicologia: {
        name: 'Psicología',
        sc: [],
      },
      'estudios-liberales': {
        name: 'Estudios Liberales',
        sc: [],
      },
      derecho: {
        name: 'Derecho',
        sc: [],
      },
    },
    ready: false,
    show: false,
  };

  onChangeSchool = e => {
    e.preventDefault();
    this.setState({ ...this.state, schoolKey: e.target.value });
  };

  onClickSchool = e => {
    e.preventDefault();
    document.getElementById('schoolSelectForm').reset();
    this.setState({ ...this.state, show: true });
  };

  nextSchool = e => {
    e.preventDefault();
    document.getElementById('schoolForm').reset();
    this.setState({ ...this.state, show: false, schoolKey: '' });
  };

  checkReady = () => {
    // TODO: Revisar para hacer auto commit de la Postulacion
  };

  ready = e => {
    e.preventDefault();
    localStorage.setItem('schools', JSON.stringify(this.state.schools));
    this.props.save('schools', this.state.schools);
    this.setState({ ...this.state, ready: true });
  };

  onChange = e => {
    e.preventDefault();
    const { idx, charge, school } = e.target.dataset;
    const schools = { ...this.state.schools };
    schools[school].sc[idx] = {
      ...schools[school].sc[idx],
      charge,
      [normalizeInputs(e.target.name)]: e.target.value,
    };
    this.setState({ ...this.state, school });
  };

  schoolForm = () => (
    <Form id="schoolForm" className="row">
      {fields.map(({ label, id, type, idx, charge }) => (
        <Col md="6" key={id}>
          <FormGroup>
            <Label for={id}>{label}</Label>
            <Input
              className="form-control-alternative"
              type={type}
              name={id}
              id={id}
              placeholder={label}
              data-idx={idx}
              data-charge={charge}
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

  schoolSelect = () => (
    <>
      <Col md="6">
        {
          <Form id="schoolSelectForm">
            <Label for="schoolCouncilSelect">Seleccione una Escuela</Label>
            <Input
              className="form-control-alternative"
              type="select"
              name="schoolSelect"
              id="schoolSelect"
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
          </Form>
        }
      </Col>
      <Col md="6" className="d-flex justify-content-center">
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
          onClick={this.onClickSchool}
        >
          Agregar
        </Button>
      </Col>
    </>
  );

  render() {
    return (
      <>
        <Card
          style={{ backgroundColor: '#f5f7f9' }}
          className={`mb-4 ${this.state.ready ? 'd-none' : ''}`}
        >
          <CardHeader className="p-3">
            <h2>Postulacion para Centro de Estudiante</h2>
          </CardHeader>
          <CardBody>
            <Row className={this.state.show ? 'd-none' : ''}>
              {this.schoolSelect()}
            </Row>
            <Row className={this.state.show ? '' : 'd-none'}>
              <Col sm="12">
                {this.state.schoolKey !== '' ? this.schoolForm() : null}
              </Col>
            </Row>
          </CardBody>
        </Card>
      </>
    );
  }
}

export default School;
