/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import {
  Row,
  Col,
  Container,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Label,
  Input,
  Button,
} from 'reactstrap';
import { Navbar, notify, Toast } from '../components';

const Login = props => {
  useEffect(() => {
    document.body.classList.add('bg-default');
    return function cleanup() {
      document.body.classList.remove('bg-default');
    };
  }, []);

  const login = async e => {
    e.preventDefault();
    const [err] = await props.login();
    if (err) {
      console.log(err);
      notify('Hubo un Error en el Inicio de Sesion', false);
      return;
    }
    props.history.push('/app/dashboard');
  };

  return (
    <div className="main-content">
      <Navbar {...props} />
      <div className="header bg-gradient-info py-7 py-lg-8">
        <Container>
          <Row className="justify-content-center">
            <Col sm="12" md="7" lg="5">
              <Card style={{ backgroundColor: '#f5f7f9' }}>
                <CardHeader>
                  <h3>Iniciar Sesion</h3>
                </CardHeader>
                <CardBody className="p-3">
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <Label for="email">Correo Electronico</Label>
                        <Input
                          onChange={props.onChangeLogin}
                          className="form-control-alternative"
                          type="email"
                          name="email"
                          id="email"
                          placeholder="email@correo.unimet.edu.ve"
                        />
                      </FormGroup>
                    </Col>
                    <Col md="12">
                      <FormGroup>
                        <Label for="password">Contrasena</Label>
                        <Input
                          onChange={props.onChangeLogin}
                          className="form-control-alternative"
                          type="password"
                          name="password"
                          id="password"
                          placeholder="********"
                        />
                      </FormGroup>
                    </Col>
                    <Col md="12 d-flex justify-content-center">
                      <Button
                        color="success"
                        className="my-auto"
                        onClick={login}
                      >
                        Iniciar Sesion
                      </Button>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <Toast />
    </div>
  );
};

export default Login;
