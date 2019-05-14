/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  Table,
  Button,
} from 'reactstrap';
import { Header, notify, Loading } from '../../components';
import { get, majors, faculties, normalize, post } from '../../utils';

const translateCoordination = $class => {
  const vec = $class.split('.');
  const _class = vec[vec.length - 1];
  if (_class.endsWith('CoD')) {
    return 'Deporte';
  }
  if (_class.endsWith('CoC')) {
    return 'Cultura';
  }
  if (_class.endsWith('CoS')) {
    return 'Servicios e Infraestructura';
  }
  if (_class.endsWith('CoA')) {
    return 'Academica';
  }
  return 'Responsabilidad Social Universitaria';
};

const Results = ({ location, user }) => {
  const params = new URLSearchParams(location.search);
  const [state, setState] = useState({
    loading: true,
    results: {},
    preliminary: false,
  });
  useEffect(() => {
    const fetch = async () => {
      try {
        let data;
        if (params.get('preliminary') === 'true' && user.privilege > 2) {
          data = await get('preliminary-results');
          setState({
            loading: false,
            preliminary: true,
            results: { ...data },
          });
          console.log(data);
        } else {
          data = await get('results');
          setState({ loading: false, results: data.results });
        }
      } catch (err) {
        console.log(err);
        notify('Ha ocurrido un error, intente refrescando el navegador', false);
      }
    };
    fetch();
  }, []);

  const savePostulation = async e => {
    try {
      e.preventDefault();
      const data = await post(`save-results/${new Date().getFullYear()}`, {
        ...state.results,
      });
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const fceTable = () => (
    <Row className="mb-3">
      <Col md="12">
        <Card
          className="border-0 shadow-lg"
          style={{ backgroundColor: '#f5f7f9' }}
        >
          <CardHeader>
            <h2> Resultados FCE </h2>
          </CardHeader>
          <CardBody>
            <Row>
              <Col sm="12">
                <Table responsive>
                  <thead>
                    <tr>
                      <th>Cargo</th>
                      <th>Nombre y Apellido</th>
                      <th>Cedula</th>
                    </tr>
                  </thead>
                  <tbody>
                    {state.results.fceResults.map(obj => (
                      <tr key={JSON.stringify(obj)}>
                        <td>{obj.charge}</td>
                        <td>{obj.name}</td>
                        <td>{obj.dni}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );

  const academicCouncilTable = () => (
    <Row>
      <Col sm="12">
        <Card
          className="border-0 shadow-lg"
          style={{ backgroundColor: '#f5f7f9' }}
        >
          <CardHeader>
            <h2>Consejo Academico</h2>
          </CardHeader>
          <CardBody>
            <Table responsive hover>
              <thead>
                <tr>
                  <th>Nombre y Apellido</th>
                  <th>Cedula de Identidad</th>
                  <th>Titular</th>
                </tr>
              </thead>
              <tbody>
                {state.results.academicCouncil.map(obj => (
                  <tr key={JSON.stringify(obj)}>
                    <td>{obj.name}</td>
                    <td>{obj.dni}</td>
                    <td>{obj.substitute ? 'Titular' : 'Suplente'}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );

  const coordinationsTable = () => (
    <Row className="mb-3">
      <Col md="12">
        <Card
          className="border-0 shadow-lg"
          style={{ backgroundColor: '#f5f7f9' }}
        >
          <CardHeader>
            <h2> Resultados Cordinaciones FCE </h2>
          </CardHeader>
          <CardBody>
            <Row>
              <Col sm="12">
                <Table responsive>
                  <thead>
                    <tr>
                      <th>Coordinacion</th>
                      <th>Nombre y Apellido</th>
                      <th>Cedula</th>
                    </tr>
                  </thead>
                  <tbody>
                    {state.results.coordinationsResults.map(obj => (
                      <tr key={JSON.stringify(obj)}>
                        <td>{translateCoordination(obj.$class)}</td>
                        <td>{obj.coordinators[0].name}</td>
                        <td>{obj.coordinators[0].dni}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );

  const studentsCenter = (studentsCenters = {}) => {
    const normalizeMajors = majors.map(major => ({
      majorKey: normalize(major),
      idx: 0,
      major,
    }));
    const jsx = Object.keys(studentsCenters).map(key => {
      const { result } = studentsCenters[key];
      return result.length > 0 ? (
        <Row className="mb-3" key={key}>
          <Col sm="12">
            <Card
              className="border-0 shadow-lg"
              style={{ backgroundColor: '#f5f7f9' }}
            >
              <CardHeader>
                <h2>{`Centro de Estudiantes ${
                  normalizeMajors.find(({ majorKey }) => majorKey === key).major
                }`}</h2>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>Cargo</th>
                      <th>Nombre y Apellido</th>
                      <th>Cedula</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.map(obj => (
                      <tr key={JSON.stringify(obj)}>
                        <td>{obj.charge}</td>
                        <td>{obj.name}</td>
                        <td>{obj.dni}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      ) : null;
    });
    return jsx;
  };

  const schoolCouncils = (schoolsCouncil = {}) => {
    const normalizeMajors = majors.map(major => ({
      majorKey: normalize(major),
      idx: 0,
      major,
    }));
    const jsx = Object.keys(schoolsCouncil).map(key => {
      const { result } = schoolsCouncil[key];
      return result.length > 0 ? (
        <Row className="mb-3" key={key}>
          <Col sm="12">
            <Card
              className="border-0 shadow-lg"
              style={{ backgroundColor: '#f5f7f9' }}
            >
              <CardHeader>
                <h2>{`Consejo de Escuela de ${
                  normalizeMajors.find(({ majorKey }) => majorKey === key).major
                }`}</h2>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>Nombre y Apellido</th>
                      <th>Cedula</th>
                      <th>Titular</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.map(obj => (
                      <tr key={JSON.stringify(obj)}>
                        <td>{obj.name}</td>
                        <td>{obj.dni}</td>
                        <td>{obj.substitute ? 'Titular' : 'Suplente'}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      ) : null;
    });
    return jsx;
  };

  const facultyCouncil = (facultyCouncils = {}) => {
    const normalizeFaculties = faculties.map(faculty => ({
      facultyKey: normalize(faculty),
      idx: 0,
      faculty,
    }));
    const jsx = Object.keys(facultyCouncils).map(key => {
      const { result } = facultyCouncils[key];
      return result.length > 0 ? (
        <Row className="mb-3" key={key}>
          <Col sm="12">
            <Card
              className="border-0 shadow-lg"
              style={{ backgroundColor: '#f5f7f9' }}
            >
              <CardHeader>
                <h2>{`Consejo de Facultad de ${
                  normalizeFaculties.find(
                    ({ facultyKey }) => facultyKey === key
                  ).faculty
                }`}</h2>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>Nombre y Apellido</th>
                      <th>Cedula</th>
                      <th>Titular</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.map(obj => (
                      <tr key={JSON.stringify(obj)}>
                        <td>{obj.name}</td>
                        <td>{obj.dni}</td>
                        <td>{obj.substitute ? 'Titular' : 'Suplente'}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      ) : null;
    });
    return jsx;
  };

  const conditionalRender = () => {
    if (state.loading) {
      return (
        <Row>
          <Col sm="12">
            <Card className="border-0 shadow-lg">
              <Loading />
            </Card>
          </Col>
        </Row>
      );
    }
    if (state.preliminary) {
      return (
        <>
          {fceTable()}
          {coordinationsTable()}
          {academicCouncilTable()}
          {studentsCenter(state.results.studentsCenters)}
          {schoolCouncils(state.results.schoolCouncil)}
          {facultyCouncil(state.results.facultyCouncil)}
          <Row>
            <Col sm="12">
              <div className="d-flex justify-content-end">
                <Button
                  color="success"
                  className="my-auto mb-3 mr-3"
                  onClick={savePostulation}
                >
                  Guardar Postulacion
                </Button>
              </div>
            </Col>
          </Row>
        </>
      );
    }
    return (
      <Row>
        <Col sm="12">
          <Card>
            <CardHeader>{/** */}</CardHeader>
            <CardBody>{/** */}</CardBody>
          </Card>
        </Col>
      </Row>
    );
  };

  return (
    <>
      <Header />
      <Container fluid className="mt--7">
        {conditionalRender()}
      </Container>
    </>
  );
};

export default Results;
