/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import AES from 'crypto-js/aes';
import { randomBytes } from 'crypto';
import { Header, Toast, notify, Loading } from '../../components';
import { get, post } from '../../utils';

class DashVote extends React.Component {
  state = {
    voter: {},
    secret: '',
    postulations: [],
    loading: true,
    vote: {
      uuid: randomBytes(32).toString('hex'),
      fce: '__blank__',
      sports: '__blank__',
      services: '__blank__',
      culture: '__blank__',
      academic: '__blank__',
      responsibility: '__blank__',
      academicCouncil: '__blank__',
      schoolsCouncil: '__blank__',
      facultyCouncil: '__blank__',
      studentsCenters: '__blank__',
    },
  };

  async componentDidMount() {
    if (this.props.user) {
      if (this.props.user.major && this.props.user.faculty) {
        const [err, data] = await this.userCanVote(this.props.user._id);
        if (data.success) {
          if (!data.canVote) {
            this.props.history.push(
              '/app/dashboard?reason=Ya-ha-votado&bool=false'
            );
            return;
          }
        }
        if (err) {
          notify(
            <p>
              Ha ocurrido un problema, comuniquese con la{' '}
              <a href="mailto:ceu@unimet.edu.ve">CEU</a>
            </p>,
            false
          );
          return;
        }
        const [err2, data2] = await this.getPostulations(
          this.props.user._id,
          this.props.user.major,
          this.props.user.faculty
        );
        if (err2) {
          notify(
            'Ha ocurrido un problema, intente refrescado el navegador',
            false
          );
          return;
        }
        if (data && data2) {
          const { voter, secret } = data;
          const { postulations } = data2;
          console.log(data, data2);
          this.setState({
            ...this.state,
            voter,
            secret,
            postulations,
            loading: false,
          });
        } else {
          notify(
            <p>
              Ha ocurrido un problema, comuniquese con la{' '}
              <a href="mailto:ceu@unimet.edu.ve">CEU</a>
            </p>,
            false
          );
        }
      } else {
        this.props.history.push(
          `/app/dashboard/profile?url=/app/dashboard/vote&reason=Completa-tu-perfil-para-poder-votar`
        );
      }
    } else {
      this.props.history.push(
        '/app/dashboard/profile?url=/app/dashboard/vote&reason=Ha-ocurrido-un-error-comuniquese-con-la-CEU'
      );
    }
  }

  onChange = e => {
    e.preventDefault();
    this.setState({
      ...this.state,
      vote: {
        ...this.state.vote,
        [e.target.name]: e.target.value,
      },
    });
  };

  userCanVote = async _id => {
    try {
      const data = await get(`voter-can-vote/${_id}`);
      return [null, data];
    } catch (err) {
      return [err, null];
    }
  };

  getPostulations = async (_id, major, faculty) => {
    try {
      const data = await get(`vote-postulation/${_id}/${major}/${faculty}`);
      return [null, data];
    } catch (err) {
      return [err, null];
    }
  };

  submitVote = async e => {
    try {
      e.preventDefault();
      const { vote, secret } = this.state;
      const encrypted = AES.encrypt(JSON.stringify(vote), secret).toString();
      const data = await post(`vote/${this.props.user._id}`, {
        data: encrypted,
      });
      if (data.success) {
        this.props.history.push('/app/dashboard?vote=true');
      } else {
        notify('Ha ocurrido un problema al computar su voto', false);
      }
    } catch (err) {
      notify('Ha ocurrido un problema con la votacion', false);
    }
  };

  voteElements = () =>
    this.state.postulations.length > 0 ? (
      <Card style={{ backgroundColor: '#f5f7f9' }}>
        <CardHeader>
          <h2>Emision del Voto</h2>
        </CardHeader>
        <CardBody>
          <Container fluid>
            <Row>
              <Col sm="12">
                <h2>Federacion de Centro de Estudiantes</h2>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <FormGroup>
                  <Label for="fce">Voto Lista Junta Directiva</Label>
                  <Input
                    className="form-control-alternative"
                    type="select"
                    name="fce"
                    id="fce"
                    defaultValue="none"
                    onChange={this.onChange}
                  >
                    <option value="none" disabled>
                      Seleccione una Opcion
                    </option>
                    {this.state.postulations.map(p =>
                      p.fce ? (
                        <option value={p.fce.uuid} key={`${p.fce.uuid}-fce`}>
                          {p.electoralGroupName}
                        </option>
                      ) : null
                    )}
                  </Input>
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label for="sports">Voto Lista Coordinacion Deportiva</Label>
                  <Input
                    className="form-control-alternative"
                    type="select"
                    name="sports"
                    id="sports"
                    defaultValue="none"
                    onChange={this.onChange}
                  >
                    <option value="none" disabled>
                      Seleccione una Opcion
                    </option>
                    {this.state.postulations.map(p =>
                      p.sports ? (
                        <option
                          value={p.sports.uuid}
                          key={`${p.sports.uuid}-sports`}
                        >
                          {p.electoralGroupName}
                        </option>
                      ) : null
                    )}
                  </Input>
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label for="culture">
                    Voto Lista Coordinacion de Cultura
                  </Label>
                  <Input
                    className="form-control-alternative"
                    type="select"
                    name="culture"
                    id="culture"
                    defaultValue="none"
                    onChange={this.onChange}
                  >
                    <option value="none" disabled>
                      Seleccione una Opcion
                    </option>
                    {this.state.postulations.map(p =>
                      p.culture ? (
                        <option
                          value={p.culture.uuid}
                          key={`${p.culture.uuid}-culture`}
                        >
                          {p.electoralGroupName}
                        </option>
                      ) : null
                    )}
                  </Input>
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label for="services">
                    Voto Lista Coordinacion de Servicios e Infraestructura
                  </Label>
                  <Input
                    className="form-control-alternative"
                    type="select"
                    name="services"
                    id="services"
                    defaultValue="none"
                    onChange={this.onChange}
                  >
                    <option value="none" disabled>
                      Seleccione una Opcion
                    </option>
                    {this.state.postulations.map(p =>
                      p.services ? (
                        <option
                          value={p.services.uuid}
                          key={`${p.services.uuid}-services`}
                        >
                          {p.electoralGroupName}
                        </option>
                      ) : null
                    )}
                  </Input>
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label for="academic">
                    Voto Lista Coordinacion Academica
                  </Label>
                  <Input
                    className="form-control-alternative"
                    type="select"
                    name="academic"
                    id="academic"
                    defaultValue="none"
                    onChange={this.onChange}
                  >
                    <option value="none" disabled>
                      Seleccione una Opcion
                    </option>
                    {this.state.postulations.map(p =>
                      p.academic ? (
                        <option
                          value={p.academic.uuid}
                          key={`${p.academic.uuid}-academic`}
                        >
                          {p.electoralGroupName}
                        </option>
                      ) : null
                    )}
                  </Input>
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label for="responsibility">
                    Voto Lista Coordinacion de Resp. Social Universitaria
                  </Label>
                  <Input
                    className="form-control-alternative"
                    type="select"
                    name="responsibility"
                    id="responsibility"
                    defaultValue="none"
                    onChange={this.onChange}
                  >
                    <option value="none" disabled>
                      Seleccione una Opcion
                    </option>
                    {this.state.postulations.map(p =>
                      p.responsibility ? (
                        <option
                          value={p.responsibility.uuid}
                          key={`${p.responsibility.uuid}-responsibility`}
                        >
                          {p.electoralGroupName}
                        </option>
                      ) : null
                    )}
                  </Input>
                </FormGroup>
              </Col>
            </Row>
          </Container>
          <Container fluid className="mt-3">
            <Row>
              <Col sm="12">
                <h2>Consejero Academico</h2>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <FormGroup>
                  <Label for="academicCouncil">
                    Voto por Consejero Academico
                  </Label>
                  <Input
                    className="form-control-alternative"
                    type="select"
                    name="academicCouncil"
                    id="academicCouncil"
                    defaultValue="none"
                    onChange={this.onChange}
                  >
                    <option value="none" disabled>
                      Seleccione una Opcion
                    </option>
                    {this.state.postulations.map(p =>
                      p.academicCouncil ? (
                        <option
                          value={p.academicCouncil.uuid}
                          key={`${p.academicCouncil.uuid}-academicCouncil`}
                        >
                          {p.academicCouncil.advisers.name}
                        </option>
                      ) : null
                    )}
                  </Input>
                </FormGroup>
              </Col>
            </Row>
          </Container>
          <Container fluid className="mt-3">
            <Row>
              <Col sm="12">
                <h2>
                  Consejo de Escuela, Facultad y Centro de Estudiantes de
                  Escuela
                </h2>
              </Col>
            </Row>
            <Row>
              <Col md="4">
                <FormGroup>
                  <Label for="studentsCenters">
                    Voto para el Centro de Estudiantes
                  </Label>
                  <Input
                    className="form-control-alternative"
                    type="select"
                    name="studentsCenters"
                    id="studentsCenters"
                    defaultValue="none"
                    onChange={this.onChange}
                  >
                    <option value="none" disabled>
                      Seleccione una Opcion
                    </option>
                    {this.state.postulations.map(p =>
                      p.studentsCenters.length > 0 ? (
                        <option
                          key={`${p.studentsCenters[0].uuid}-student-center`}
                          value={`${p.studentsCenters[0].uuid}-${
                            this.props.user.major
                          }`}
                        >
                          {p.electoralGroupName}
                        </option>
                      ) : null
                    )}
                  </Input>
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <Label for="schoolsCouncil">
                    Voto para el Consejo de Escuela
                  </Label>
                  <Input
                    className="form-control-alternative"
                    type="select"
                    name="schoolsCouncil"
                    id="schoolsCouncil"
                    defaultValue="none"
                    onChange={this.onChange}
                  >
                    <option value="none" disabled>
                      Seleccione una Opcion
                    </option>
                    {this.state.postulations.map(p =>
                      p.schoolsCouncil.length > 0 ? (
                        <option
                          key={`${p.schoolsCouncil[0].uuid}-schoolsCouncil`}
                          value={`${p.schoolsCouncil[0].uuid}-${
                            this.props.user.major
                          }`}
                        >
                          {p.electoralGroupName}
                        </option>
                      ) : null
                    )}
                  </Input>
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <Label for="facultyCouncil">
                    Voto para el Consejo de Facultad
                  </Label>
                  <Input
                    className="form-control-alternative"
                    type="select"
                    name="facultyCouncil"
                    id="facultyCouncil"
                    defaultValue="none"
                    onChange={this.onChange}
                  >
                    <option disabled value="none">
                      Seleccione un Opcion
                    </option>
                    {this.state.postulations.map(p =>
                      p.facultyCouncil.length > 0 ? (
                        <option
                          key={`${p.facultyCouncil[0].uuid}-facultyCouncil`}
                          value={`${p.facultyCouncil[0].uuid}-${
                            this.props.user.faculty
                          }`}
                        >
                          {p.electoralGroupName}
                        </option>
                      ) : null
                    )}
                  </Input>
                </FormGroup>
              </Col>
            </Row>
          </Container>
          <Container fluid className="mt-3">
            <Row>
              <Col md="6" />
              <Col md="6" className="d-flex justify-content-end">
                <Button
                  color="success"
                  className="my-auto"
                  onClick={this.submitVote}
                >
                  Votar
                </Button>
              </Col>
            </Row>
          </Container>
        </CardBody>
      </Card>
    ) : (
      <Card>
        <Row className="justify-content-center p-5">
          <p className="text-center">
            <strong>No</strong> se han enviado postulaciones para esta contienda
            electoral!
          </p>
        </Row>
      </Card>
    );

  render() {
    return (
      <>
        <Header />
        <Container className="mt--7">
          <Row>
            <Col md="12">
              {this.state.loading ? (
                <Card>
                  <Loading />
                </Card>
              ) : (
                this.voteElements()
              )}
            </Col>
          </Row>
        </Container>
        <Toast />
      </>
    );
  }
}

export default DashVote;
