import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Table
} from "reactstrap";

const generateTable = (headers, body) => {
  if (body.length > 0) {
    return (
      <Table>
        <thead>
          <tr>
            {headers.map(header => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {body.map((row, i) => (
            <tr key={`key-${i}`}>
              {row.map(data => (
                <td key={data} data-info={data}>
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

const Checkout = ({
  postulation: {
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
    passed
  }
}) => {
  return (
    <>
      <Container>
        {/* Federacion de Centros de Estudiantes */}
        <Row className="mb-4">
          <Col sm="12">
            <Card style={{ backgroundColor: "#f5f7f9" }}>
              <CardHeader>
                <h2>Federacion de Centros de Estudiantes</h2>
              </CardHeader>
              <CardBody>
                {generateTable(
                  ["Cedula", "Nombre", "Cargo"],
                  [
                    ...fce.map(({ name, charge, dni }) => [dni, name, charge]),
                    ...sports.map(({ name, dni }) => [
                      dni,
                      name,
                      "Coordinador de Deportes"
                    ]),
                    ...culture.map(({ name, dni }) => [
                      dni,
                      name,
                      "Coordinador de Cultura"
                    ]),
                    ...services.map(({ name, dni }) => [
                      dni,
                      name,
                      "Coordinador de Servicios e Infraestructura"
                    ]),
                    ...academic.map(({ name, dni }) => [
                      dni,
                      name,
                      "Coordinador Academico"
                    ]),
                    ...responsibility.map(({ name, dni }) => [
                      dni,
                      name,
                      "Coordinador de Responsabilidad SU"
                    ])
                  ]
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>

        {/* Consejo Academico */}
        <Row className="mb-4">
          <Col sm="12">
            <Card style={{ backgroundColor: "#f5f7f9" }}>
              <CardHeader>
                <h2>Consejo Academico</h2>
              </CardHeader>
              <CardBody>
                {generateTable(["Cedula", "nombre", "email"], [["", "", ""]])}
              </CardBody>
            </Card>
          </Col>
        </Row>

        {/* Centros de Estudiantes */}
        <Row className="mb-4">
          <Col sm="12">
            <Card style={{ backgroundColor: "#f5f7f9" }}>
              <CardHeader>
                <h2>Centros de Estudiantes</h2>
              </CardHeader>
              <CardBody>
                {generateTable(
                  ["Cedula", "Nombre", "Cargo", "Escuela"],
                  schools.map(({ dni, name, charge, school }) => [
                    dni,
                    name,
                    charge,
                    school
                  ])
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>

        {/* Consejos de Escuela */}
        <Row className="mb-4">
          <Col sm="12">
            <Card style={{ backgroundColor: "#f5f7f9" }}>
              <CardHeader>
                <h2>Consejos de Escuelas</h2>
              </CardHeader>
              <CardBody>
                {generateTable(
                  ["Cedula", "Nombre", "Escuela"],
                  schoolCouncil.map(({ dni, name, school }) => [
                    dni,
                    name,
                    school
                  ])
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>

        {/* Consejos de Facultad */}
        <Row className="mb-4">
          <Col sm="12">
            <Card style={{ backgroundColor: "#f5f7f9" }}>
              <CardHeader>
                <h2>Consejos de Facultad</h2>
              </CardHeader>
              <CardBody>
                {generateTable(
                  ["Cedula", "Nombre", "Facultad"],
                  facultyCouncil.map(({ dni, name, faculty }) => [
                    dni,
                    name,
                    faculty
                  ])
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Checkout;
