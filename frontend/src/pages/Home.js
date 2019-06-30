import React, { useEffect, useState } from 'react';
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Label,
} from 'reactstrap';
import { Navbar, Footer, notify, Toast } from '../components';
import { majors, normalize, post } from '../utils';

const Home = props => {
  useEffect(() => {
    document.body.classList.add('bg-default');
    return function cleanup() {
      document.body.classList.remove('bg-default');
    };
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    major: '',
    email: '',
    message: '',
  });

  const onChangeForm = e => {
    e.preventDefault();
    const data = {
      ...formData,
      [e.target.name]: [e.target.value],
    };
    setFormData(data);
  };

  const sendForm = async e => {
    e.preventDefault();
    const data = await post(`home-form`, formData, false);
    if (data && data.success) {
      notify('Formulario enviado con exito!', true);
    }
  };

  return (
    <>
      <div className="main-content">
        <Navbar {...props} />
        <div className="header bg-gradient-info py-7 py-lg-8">
          <Container>
            <div className="header-body text-center mb-7">
              <Row className="justify-content-center">
                <Col lg="5" md="6">
                  <h1 className="text-white">Bienvenido!</h1>
                  <p className="text-lead text-light">
                    uvote es un proyecto piloto, unico en su clase en Venezuela{' '}
                    <span aria-label="venezuela flag" role="img">
                      🇻🇪
                    </span>
                  </p>
                </Col>
              </Row>
            </div>
          </Container>
          <div className="separator separator-bottom separator-skew zindex-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="fill-default"
                points="2560 0 2560 100 0 100"
              />
            </svg>
          </div>
          <Container>
            <Row className="align-content-stretch">
              <Col sm="12" md="12" lg="4" className="mb-3">
                <Card style={{ height: '100%' }}>
                  <CardHeader className="p-3">
                    <div className="text-muted text">
                      <h2>¿Cómo funciona?</h2>
                    </div>
                  </CardHeader>
                  <CardBody>
                   Te registras, ingresas a la plataforma de diriges al área de votación, escoges a los candidatos de tu preferencia, le das click a votar y ¡listo!
                  </CardBody>
                </Card>
              </Col>
              <Col sm="12" md="12" lg="4" className="mb-3">
                <Card style={{ height: '100%' }}>
                  <CardHeader className="p-3">
                    <div className="text-muted text">
                      <h2>¿Cómo protegen mi voto?</h2>
                    </div>
                  </CardHeader>
                  <CardBody>
                    Uvote almacena tu vota en una cadena de bloques (blockchain), en donde todas las operaciones quedan registradas. Además de eso su voto viaja de manera encriptada a través de la web con un clave única para cada elector.
                  </CardBody>
                </Card>
              </Col>
              <Col sm="12" md="12" lg="4" className="mb-3">
                <Card style={{ height: '100%' }}>
                  <CardHeader className="p-3">
                    <div className="text-muted text">
                      <h2>¿Mi voto es Secreto?</h2>
                    </div>
                  </CardHeader>
                  <CardBody>
                    ¡Si! en uvote la seguridad es muy importante, por eso los votos se almacenan en una estructura especial, que los hace fácil de encriptar y en donde no se almacena ninguna tipo de información personal.
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
        <div>
          <Container className="py-5">
            <Row className="justify-content-center">
              <Col sm="12" md="8" lg="6">
                <Card style={{ backgroundColor: '#f5f7f9' }}>
                  <CardHeader
                    className="p-3"
                    style={{ backgroundColor: '#f5f7f9' }}
                  >
                    <h2 className="text-center">Contacto!</h2>
                  </CardHeader>
                  <CardBody>
                    <Form>
                      <Row className="justify-content-center">
                        <Col sm="12">
                          <FormGroup>
                            <Label for="name">Nombre y Apellido</Label>
                            <Input
                              className="form-control-alternative"
                              type="text"
                              name="name"
                              id="name"
                              required
                              placeholder="Nombre y Apellido"
                              onChange={onChangeForm}
                            />
                          </FormGroup>
                        </Col>
                        <Col sm="12">
                          <FormGroup>
                            <Label for="email">Correo Electrónico</Label>
                            <Input
                              className="form-control-alternative"
                              type="email"
                              name="email"
                              id="email"
                              required
                              placeholder="Correo Electrónico"
                              onChange={onChangeForm}
                            />
                          </FormGroup>
                        </Col>
                        <Col sm="12">
                          <Label for="major">Carrera</Label>
                          <Input
                            className="form-control-alternative"
                            type="select"
                            name="major"
                            id="major"
                            required
                            onChange={onChangeForm}
                          >
                            <option disabled>
                              Seleccione una Carrera
                            </option>
                            {majors.map(major => (
                              <option
                                key={normalize(major)}
                                value={normalize(major)}
                              >
                                {major}
                              </option>
                            ))}
                            <option key="otro" value="otro">
                              otro
                            </option>
                          </Input>
                        </Col>
                        <Col sm="12">
                          <Label for="message">Mensaje</Label>
                          <Input
                            className="form-control-alternative"
                            type="textarea"
                            name="message"
                            id="message"
                            onChange={onChangeForm}
                          />
                        </Col>
                        <Button
                          color="primary"
                          className="mt-3"
                          onClick={sendForm}
                        >
                          Enviar
                        </Button>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
        <Container fluid>
          <Row>
            <Col sm="12">
              <Footer />
            </Col>
          </Row>
        </Container>
      </div>
      <Toast />
    </>
  );
};

export default Home;
