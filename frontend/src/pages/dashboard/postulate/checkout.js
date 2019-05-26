/* eslint-disable react/prop-types */
import React from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Table,
  Badge,
} from 'reactstrap';

const generateTable = (headers, body) => {
  if (body.length > 0) {
    return (
      <Table responsive hover>
        <thead>
          <tr>
            {headers.map(header => (
              <th className="text-center" key={header}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {body.map((row, i) => (
            <tr key={`key-${i}`}>
              {row.map(data => (
                <td className="text-center" key={data} data-info={data}>
                  {data}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
  return <h2 className="text-center">No Existen Datos de esta Postulacion</h2>;
};

const Checkout = ({ postulation }) => {
  if (postulation) {
    const {
      academicCouncil,
      facultyCouncil,
      schools,
      schoolCouncil,
      fce,
      sports,
      culture,
      services,
      academic,
      responsibility,
      passed,
    } = postulation;
    return (
      <>
        <Container className="mt--7">
          {/* Federacion de Centros de Estudiantes */}
          <Row className="mb-4">
            <Col sm="12">
              <Card
                style={{ backgroundColor: '#f5f7f9' }}
                className="border-0 shadow-lg"
              >
                <CardHeader>
                  <Row>
                    <Col sm="10">
                      <h2>Federacion de Centros de Estudiantes</h2>
                    </Col>
                    <Col sm="2">
                      {passed === 1 ? (
                        <Badge color="success" pill>
                          Aprobada
                        </Badge>
                      ) : (
                        <Badge color="danger" pill>
                          En espera
                        </Badge>
                      )}
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  {generateTable(
                    ['Cedula', 'Nombre', 'Cargo'],
                    [
                      ...fce.map(({ name, charge, dni }) => [
                        dni,
                        name,
                        charge,
                      ]),
                      ...sports.map(({ name, dni }) => [
                        dni,
                        name,
                        'Coordinador de Deportes',
                      ]),
                      ...culture.map(({ name, dni }) => [
                        dni,
                        name,
                        'Coordinador de Cultura',
                      ]),
                      ...services.map(({ name, dni }) => [
                        dni,
                        name,
                        'Coordinador de Servicios e Infraestructura',
                      ]),
                      ...academic.map(({ name, dni }) => [
                        dni,
                        name,
                        'Coordinador Academico',
                      ]),
                      ...responsibility.map(({ name, dni }) => [
                        dni,
                        name,
                        'Coordinador de Responsabilidad SU',
                      ]),
                    ]
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>

          {/* Consejo Academico */}
          <Row className="mb-4">
            <Col sm="12">
              <Card
                style={{ backgroundColor: '#f5f7f9' }}
                className="border-0 shadow-lg"
              >
                <CardHeader>
                  <h2>Consejo Academico</h2>
                </CardHeader>
                <CardBody>
                  {academicCouncil.dni !== -1 ? (
                    generateTable(
                      ['Cedula', 'nombre', 'email'],
                      [
                        [
                          academicCouncil.dni,
                          academicCouncil.name,
                          academicCouncil.email,
                        ],
                      ]
                    )
                  ) : (
                    <h2 className="text-center">
                      No Existen Datos de esta Postulacion
                    </h2>
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>

          {/* Centros de Estudiantes */}
          <Row className="mb-4">
            <Col sm="12">
              <Card
                style={{ backgroundColor: '#f5f7f9' }}
                className="border-0 shadow-lg"
              >
                <CardHeader>
                  <h2>Centros de Estudiantes</h2>
                </CardHeader>
                <CardBody>
                  {generateTable(
                    ['Cedula', 'Nombre', 'Cargo', 'Escuela'],
                    schools.map(({ dni, name, charge, school }) => [
                      dni,
                      name,
                      charge,
                      school,
                    ])
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>

          {/* Consejos de Escuela */}
          <Row className="mb-4">
            <Col sm="12">
              <Card
                style={{ backgroundColor: '#f5f7f9' }}
                className="border-0 shadow-lg"
              >
                <CardHeader>
                  <h2>Consejos de Escuelas</h2>
                </CardHeader>
                <CardBody>
                  {generateTable(
                    ['Cedula', 'Nombre', 'Escuela'],
                    schoolCouncil.map(({ dni, name, school }) => [
                      dni,
                      name,
                      school,
                    ])
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>

          {/* Consejos de Facultad */}
          <Row className="mb-4">
            <Col sm="12">
              <Card
                style={{ backgroundColor: '#f5f7f9' }}
                className="border-0 shadow-lg"
              >
                <CardHeader>
                  <h2>Consejos de Facultad</h2>
                </CardHeader>
                <CardBody>
                  {generateTable(
                    ['Cedula', 'Nombre', 'Facultad'],
                    facultyCouncil.map(({ dni, name, faculty }) => [
                      dni,
                      name,
                      faculty,
                    ])
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
  return (
    <Container>
      <Row>
        <Col sm="12">
          <Card
            style={{ backgroundColor: '#f5f7f9' }}
            className="border-0 shadow-lg"
          >
            <p>No se han suministrado los datos necesarios a esta Vista</p>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Checkout;
