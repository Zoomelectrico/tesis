/* eslint-disable global-require */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
} from 'reactstrap';

import { get, post } from '../../../utils';
import { Header, Toast, notify } from '../../../components';

const ElectoralGroup = ({ location, history }) => {
  let id;
  if (location) {
    id = new URLSearchParams(location.search).get('id');
  }
  const [state, setState] = useState({ loading: true, demand: {} });

  useEffect(() => {
    const fetch = async () => {
      try {
        if (!id) {
          history.push(
            '/app/dashboard/demands?reason=No-se-encuentra-el-grupo-electoral?bool=false'
          );
        }
        console.log(id);
        const data = await get(`demand/${id}`);
        setState({ loading: false, demand: data.demand });
      } catch (err) {
        notify(
          'Hubo un problema al cargar los datos. Refresque la Pagina',
          false
        );
      }
    };
    fetch();
  }, []);

  const accept = async e => {
    try {
      e.preventDefault();
      // eslint-disable-next-line no-shadow
      const { egid: egId, id } = e.target.dataset;
      const data = await post('demand-accept-eg', { egId, id });
      if (data.success) {
        history.push(
          '/app/dashboard/demands?reason=Grupo-Electoral-Aceptado&bool=true'
        );
      }
    } catch (err) {
      notify('Ha ocurrido un Error Incorporar este Grupo Electoral', false);
    }
  };

  const { electoralGroup } = state.demand;
  return (
    <>
      <Header />
      <Container className="mt--7">
        <Row>
          <Col sm="12">
            {state.loading ? (
              <Card>
                <div className="d-flex justify-content-center mb-3 p-4">
                  <img
                    height="125px"
                    width="auto"
                    alt="uvote logo"
                    src={require('../../../assets/img/logo-color.svg')}
                  />
                </div>
                <h2 className="text-center">Loading ...</h2>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <h2>{electoralGroup.denomination}</h2>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col sm="12" md="6">
                      <div className="d-flex justify-content-center">
                        <img
                          src={electoralGroup.logo}
                          alt={`${electoralGroup.denomination} Logo`}
                          className="text-center mb-3"
                          height="200px"
                          width="auto"
                        />
                      </div>
                      <h2 className="text-center">
                        {electoralGroup.denomination}
                      </h2>
                    </Col>
                    <Col sm="12" md="6" className="my-auto">
                      <div>
                        <ul>
                          <li>
                            <strong>Representante:</strong>{' '}
                            {`${electoralGroup.representative.firstName} ${
                              electoralGroup.representative.lastName
                            }`}
                          </li>
                          <li>
                            <strong>Numero:</strong> {electoralGroup.number}
                          </li>
                          <li>
                            <strong>Color:</strong> {electoralGroup.color}{' '}
                          </li>
                        </ul>
                        <p className="my-2">
                          <strong>Muestra de Color</strong>
                        </p>
                        <div
                          style={{
                            backgroundColor: electoralGroup.colorHex,
                            height: '50px',
                            width: '95%',
                          }}
                        />
                      </div>
                    </Col>
                    <Col sm="12" md="6" />
                    <Col sm="12" md="6">
                      <div className="d-flex justify-content-end">
                        <Button
                          className="my-auto mb-3 mr-3"
                          color="success"
                          data-egid={electoralGroup._id}
                          data-id={id}
                          onClick={accept}
                        >
                          Aceptar
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            )}
          </Col>
        </Row>
      </Container>
      <Toast />
    </>
  );
};

export default ElectoralGroup;
