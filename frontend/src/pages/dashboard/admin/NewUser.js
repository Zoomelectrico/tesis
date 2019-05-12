import React, { useState } from "react";
import {
  Container,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  Button
} from "reactstrap";

const NewUser = props => {
  const [data, setData] = useState({});
  const onChange = e => {};
  const submit = e => {};
  return (
    <>
      <Container>
        <Card>
          <CardHeader>
            <h2>Hola</h2>
          </CardHeader>
          <CardBody>
            <Row>
              <Col md="6">
                <FormGroup>
                  <Label for="" />
                  <Input
                    type="text"
                    id=""
                    name=""
                    placeholder=""
                    className="form-control-alternative"
                    onChange={onChange}
                  />
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label for="" />
                  <Input
                    type="text"
                    id=""
                    name=""
                    placeholder=""
                    className="form-control-alternative"
                    onChange={onChange}
                  />
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label for="" />
                  <Input
                    type="text"
                    id=""
                    name=""
                    placeholder=""
                    className="form-control-alternative"
                    onChange={onChange}
                  />
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label for="" />
                  <Input
                    type="text"
                    id=""
                    name=""
                    placeholder=""
                    className="form-control-alternative"
                    onChange={onChange}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="12">
                <div className="d-flex justify-content-">
                  <Button onClick={submit} color="success" className="my-auto">
                    Enviar
                  </Button>
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Container>
    </>
  );
};

export default NewUser;
