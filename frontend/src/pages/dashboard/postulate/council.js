/* eslint-disable react/prop-types */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
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
} from 'reactstrap';

import {
  majors,
  postulationFields,
  normalize,
  normalizeInputs,
} from '../../../utils';

const { academicCouncil: fields } = postulationFields;

class Council extends React.Component {
  state = {
    academicCouncil: {
      name: '',
      email: '',
      dni: -1,
      phone: '',
      school: '',
    },
    ready: false,
  };

  onChange = e => {
    e.preventDefault();
    const state = {
      ...this.state,
      academicCouncil: {
        ...this.state.academicCouncil,
        [normalizeInputs(e.target.name)]: e.target.value,
      },
    };
    this.setState(state);
  };

  save = e => {
    e.preventDefault();
    localStorage.setItem(
      'academic-council',
      JSON.stringify(this.state.academicCouncil)
    );
    this.props.save('academic-council', this.state.academicCouncil);
    this.setState({ ...this.state, ready: true });
  };

  renderCol = (label, id, type) => (
    <Col md="4" key={id}>
      <FormGroup>
        <Label for={id}>{label}</Label>
        {type === 'select' ? (
          <Input
            className="form-control-alternative"
            type={type}
            name={id}
            id={id}
            placeholder={label}
            onChange={this.onChange}
          >
            {majors.map(major => (
              <option key={normalize(major)} value={normalize(major)}>
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
            onChange={this.onChange}
          />
        )}
      </FormGroup>
    </Col>
  );

  render() {
    return (
      <Card
        style={{ backgroundColor: '#f5f7f9' }}
        className={`mb-4 ${this.state.ready ? 'd-none' : ''}`}
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
                      color="warning"
                      outline
                      className="my-auto mr-3 mb-3"
                      onClick={this.save}
                    >
                      Cerrar
                    </Button>
                    <Button
                      color="success"
                      className="my-auto mr-3 mb-3"
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
