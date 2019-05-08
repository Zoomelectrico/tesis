import React from "react";
import { Button, Modal, ModalBody, ModalFooter, Row, Col } from "reactstrap";

const ElectoralGroupModal = ({
  denomination,
  colorName,
  colorHex,
  number,
  logo,
  modal,
  toggle,
  onClick
}) => (
  <Modal isOpen={modal} toggle={toggle}>
    <ModalBody>
      <Row>
        <Col sm="12">
          <img className="text-center" alt={denomination} src={logo} />
        </Col>
        <Col sm="12" className="mt-2">
          <ul>
            <li>
              <strong>Denominacion: </strong>
              {denomination}
            </li>
            <li>
              <strong>Color: </strong>
              {colorName}
            </li>
            <li>
              <strong>Color: </strong>
              <div
                style={{
                  height: "30px",
                  width: "70px",
                  backgroundColor: colorHex
                }}
              />
            </li>
            <li>
              <strong>Numero: </strong>
              {number}
            </li>
          </ul>
        </Col>
      </Row>
    </ModalBody>
    <ModalFooter className="d-flex">
      <Button
        color="success"
        outline
        onClick={onClick}
        className="my-auto mr-3 mb-3"
      >
        Aceptar
      </Button>
      <Button
        color="danger"
        outline
        onClick={toggle}
        className="my-auto mr-3 mb-3"
      >
        Cerrar
      </Button>
    </ModalFooter>
  </Modal>
);

export default ElectoralGroupModal;
