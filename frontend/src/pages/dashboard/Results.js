/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, CardBody, CardHeader } from 'reactstrap';
import { Pie } from 'react-chartjs-2';
import { Header, notify, Loading } from '../../components';
import { get, majors, faculties, normalize } from '../../utils';

const resultHelper = (results = {}) => {
  const obj = {};
  const voteKeys = [
    'fce',
    'sports',
    'services',
    'culture',
    'academic',
    'responsibility',
    'academicCouncil',
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
        .filter(x => x !== false),
    };
  });
  ['schoolsCouncil', 'studentsCenters'].forEach(voteKey => {
    majors.forEach(major => {
      obj[voteKey] = {
        ...obj[voteKey],
        [normalize(major)]: {
          labels: Object.keys(results)
            .map(key =>
              results[key][voteKey][major] ? results[key].name : false
            )
            .filter(x => x !== false),
          data: Object.keys(results)
            .map(key =>
              results[key][voteKey][major]
                ? results[key][voteKey][major]
                : false
            )
            .filter(x => x !== false),
          backgroundColor: Object.keys(results)
            .map(key =>
              results[key][voteKey][major] ? results[key].color : false
            )
            .filter(x => x !== false),
          hoverBackgroundColor: Object.keys(results)
            .map(key =>
              results[key][voteKey][major] ? results[key].color : false
            )
            .filter(x => x !== false),
        },
      };
    });
  });
  ['facultyCouncil'].forEach(voteKey => {
    faculties.forEach(faculty => {
      obj[voteKey] = {
        ...obj[voteKey],
        [normalize(faculty)]: {
          labels: Object.keys(results)
            .map(key =>
              results[key][voteKey][faculty] ? results[key].name : false
            )
            .filter(x => x !== false),
          data: Object.keys(results)
            .map(key =>
              results[key][voteKey][faculty]
                ? results[key][voteKey][faculty]
                : false
            )
            .filter(x => x !== false),
          backgroundColor: Object.keys(results)
            .map(key =>
              results[key][voteKey][faculty] ? results[key].color : false
            )
            .filter(x => x !== false),
          hoverBackgroundColor: Object.keys(results)
            .map(key =>
              results[key][voteKey][faculty] ? results[key].color : false
            )
            .filter(x => x !== false),
        },
      };
    });
  });
  return obj;
};

const Results = ({ location }) => {
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
        if (params.get('preliminary') === 'true') {
          data = await get('preliminary-results');
          setState({
            loading: false,
            preliminary: true,
            results: resultHelper(data.results),
          });
          console.log(resultHelper(data.results));
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

  const conditionalRender = () => {
    if (state.loading) {
      return (
        <Row>
          <Col sm="12">
            <Card>
              <Loading />
            </Card>
          </Col>
        </Row>
      );
    }
    if (state.preliminary) {
      return (
        <Row>
          <Col md="6">
            <Card style={{ backgroundColor: '#f5f7f9' }}>
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
            <Card style={{ backgroundColor: '#f5f7f9' }}>
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
      );
    }
    return (
      <Row>
        <Col md="6">
          <Card style={{ backgroundColor: '#f5f7f9' }}>
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
          <Card style={{ backgroundColor: '#f5f7f9' }}>
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
