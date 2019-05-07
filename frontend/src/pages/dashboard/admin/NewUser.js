import React, { useState } from "react";
import { Container, Card, CardHeader, CardBody } from "reactstrap";

const NewUser = ({ token, _id }) => {
  const [data, setData] = useState({});
  return (
    <>
      <Container>
        <Card>
          <CardHeader>
            <h2>Hola</h2>
          </CardHeader>
          <CardBody>
            <h2>Hola</h2>
          </CardBody>
        </Card>
      </Container>
    </>
  );
};

export default NewUser;
