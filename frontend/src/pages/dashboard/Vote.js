import React from "react";
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
  Input
} from "reactstrap";
import AES from "crypto-js/aes";
import { Header, Toast, notify } from "../../components";
import { get, post } from "../../utils";

class DashVote extends React.Component {
  state = {
    voter: {},
    secret: "",
    postulations: [],
    loading: true,
    vote: {}
  };

  submitVote = async e => {
    try {
      e.preventDefault();
      const { vote, secret } = this.state;
      const encrypted = AES.encrypt(JSON.stringify(vote), secret);
      const data = await post(``, { data: encrypted });
      if (data.success) {
        setTimeout(() => {
          this.props.history.push("/app/dashboard?vote=true");
        }, 2000);
      } else {
        notify("Ha ocurrido un problema al computar su voto", false);
      }
    } catch (err) {
      notify("Ha ocurrido un problema con la votacion", false);
    }
  };

  onChange = e => {
    e.preventDefault();
    this.setState({
      ...this.state,
      vote: {
        ...this.state.vote,
        [e.target.name]: e.target.value
      }
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

  async componentDidMount() {
    if (this.props.user.major && this.props.user.faculty) {
      const [err, { voter, secret }] = await this.userCanVote(
        this.props.user._id
      );
      if (err) {
        notify(
          `Ha ocurrido un problema, comuniquese con la <a href="mailto:ceu@unimet.edu.ve">CEU</a>`,
          false
        );
        return;
      }
      const [err2, { postulations }] = await this.getPostulations(
        this.props.user._id,
        this.props.user.major,
        this.props.user.faculty
      );
      if (err2) {
        notify(
          "Ha ocurrido un problema, intente refrescado el navegador",
          false
        );
        return;
      }
      this.setState({
        ...this.state,
        voter,
        secret,
        postulations,
        loading: false
      });
    } else {
      this.props.history.push(
        `/app/dashboard/profile?url=/app/dashboard/vote&reason=Completa-tu-perfil-para-poder-votar`
      );
    }
  }

  voteElements = () =>
    this.state.postulations.length > 0 ? (
      <Card style={{ backgroundColor: "#f5f7f9" }}>
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
                  <Label for="federation">Voto Lista Junta Directiva</Label>
                  <Input
                    className="form-control-alternative"
                    type="select"
                    name="federation"
                    id="federation"
                    onChange={this.onChange}
                  >
                    <option value="Option 1">Option 1</option>
                    <option value="Option 2">Option 2</option>
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
                    onChange={this.onChange}
                  >
                    <option value="Option 1">Option 1</option>
                    <option value="Option 2">Option 2</option>
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
                    onChange={this.onChange}
                  >
                    <option value="Option 1">Option 1</option>
                    <option value="Option 2">Option 2</option>
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
                    onChange={this.onChange}
                  >
                    <option value="Option 1">Option 1</option>
                    <option value="Option 2">Option 2</option>
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
                    onChange={this.onChange}
                  >
                    <option value="Option 1">Option 1</option>
                    <option value="Option 2">Option 2</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label for="responsability">
                    Voto Lista Coordinacion de Resp. Social Universitaria
                  </Label>
                  <Input
                    className="form-control-alternative"
                    type="select"
                    name="responsability"
                    id="responsability"
                    onChange={this.onChange}
                  >
                    <option value="Option 1">Option 1</option>
                    <option value="Option 2">Option 2</option>
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
                  <Label for="adviser">Voto por Consejero Academico</Label>
                  <Input
                    className="form-control-alternative"
                    type="select"
                    name="adviser"
                    id="adviser"
                    onChange={this.onChange}
                  >
                    <option value="Option 1">Option 1</option>
                    <option value="Option 2">Option 2</option>
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
                  <Label for="school">Voto para el Centro de Estudiantes</Label>
                  <Input
                    className="form-control-alternative"
                    type="select"
                    name="school"
                    id="school"
                    onChange={this.onChange}
                  >
                    <option value="option 1">Opcion 1</option>
                    <option value="option 1">Opcion 1</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <Label for="school-council">
                    Voto para el Consejo de Escuela
                  </Label>
                  <Input
                    className="form-control-alternative"
                    type="select"
                    name="school-council"
                    id="school-council"
                    onChange={this.onChange}
                  >
                    <option value="option 1">Opcion 1</option>
                    <option value="option 1">Opcion 1</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <Label for="faculty-council">
                    Voto para el Consejo de Facultad
                  </Label>
                  <Input
                    className="form-control-alternative"
                    type="select"
                    name="faculty-council"
                    id="faculty-council"
                    onChange={this.onChange}
                  >
                    <option value="option 1">Opcion 1</option>
                    <option value="option 1">Opcion 1</option>
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
                  <Row className="justify-content-center">
                    <div className="p-4">Loading ...</div>
                  </Row>
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
