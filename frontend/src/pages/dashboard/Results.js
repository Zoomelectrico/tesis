import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, CardBody, CardHeader } from "reactstrap";
import { Pie } from "react-chartjs-2";
import { Header, notify, Loading } from "../../components";
import { get } from "../../utils";

const data = {
  labels: ["Red", "Green", "Yellow"],
  datasets: [
    {
      data: [300, 50, 100],
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
    }
  ]
};

const resultHelper = (results = {}) => {
  const obj = {};
  const voteKeys = [
    "fce",
    "sports",
    "services",
    "culture",
    "academic",
    "responsibility",
    "academicCouncil",
    "schoolsCouncil",
    "facultyCouncil",
    "studentsCenters"
  ];
  voteKeys.forEach(voteKey => {
    obj[voteKey] = {
      labels: Object.keys(results)
        .map(key => (results[key][voteKey] ? results[key].name : false))
        .filter(x => x !== false),
      data: Object.keys(results)
        .map(key => (results[key][voteKey] ? results[key][voteKey] : false))
        .filter(x => x !== false),
      backgroundColor: Object.keys(results)
        .map(key => (results[key][voteKey] ? results[key].color : false))
        .filter(x => x !== false),
      hoverBackgroundColor: Object.keys(results)
        .map(key => (results[key][voteKey] ? results[key].color : false))
        .filter(x => x !== false)
    };
  });
  console.log(obj);
  return obj;
};

const Results = ({ location }) => {
  const params = new URLSearchParams(location.search);
  const [state, setState] = useState({
    loading: true,
    results: {},
    preliminary: false
  });
  useEffect(() => {
    const fetch = async () => {
      try {
        let data;
        if (params.get("preliminary") === "true") {
          data = await get("preliminary-results");
          setState({
            loading: false,
            preliminary: true,
            results: resultHelper(data.results)
          });
        } else {
          data = await get("results");
          setState({ loading: false, results: data.results });
        }
      } catch (err) {
        notify("Ha ocurrido un error, intente refrescando el navegador", false);
      }
    };
    fetch();
  }, []);
  return (
    <>
      <Header />
      <Container fluid className="mt--7">
        {state.loading ? (
          <Row>
            <Col sm="12">
              <Card>
                <Loading />
              </Card>
            </Col>
          </Row>
        ) : state.preliminary ? (
          <Row>
            <Col md="6">
              <Card style={{ backgroundColor: "#f5f7f9" }}>
                <CardHeader>
                  <h2> Resultados FCE </h2>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col sm="12">
                      <Pie data={state.results.fce} />
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col md="6">
              <Card style={{ backgroundColor: "#f5f7f9" }}>
                <CardHeader>
                  <h2> Resultados FCE 2 </h2>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col sm="12">
                      <Pie data={state.results} />
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        ) : (
          <Row>
            <Col md="6">
              <Card style={{ backgroundColor: "#f5f7f9" }}>
                <CardHeader>
                  <h2> Resultados FCE </h2>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col sm="12">
                      <Pie data={state.results.fce} />
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col md="6">
              <Card style={{ backgroundColor: "#f5f7f9" }}>
                <CardHeader>
                  <h2> Resultados FCE 2 </h2>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col sm="12">
                      <Pie data={state.results} />
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
};

export default Results;
