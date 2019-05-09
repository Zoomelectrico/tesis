import React from "react";
import { Container, Row, Col, Spinner, Button } from "reactstrap";
import { Header, Toast, notify } from "../../components";
import {
  Checkout,
  Council,
  ElectoralGroup,
  FacultyCouncil,
  School,
  SchoolCouncil,
  StudentFederationCenter
} from "./postulate";
import { env, get, post } from "../../utils";

const keys = [
  "academic-council",
  "faculty-council",
  "student-federation-center",
  "schools",
  "school-council"
];

class DashPostulate extends React.Component {
  state = {
    loading: true, // Esta Cargando
    electoralGroupStatus: false, // Tiene Grupo Electoral
    electoralGroupAccepted: false, // La solicitud fue aprobada
    electoralGroup: {}, // Datos del Grupo Electoral
    postulationAccepted: false, // La postulacion fue aceptada
    postulation: {}, // Previa de la Postulacion
    postulationData: {}, // Postulacion de la db
    checkout: false, // Flag para mostrar la postulacion
    _id: "", // id del user
    token: "", // token del user
    denomination: "",
    colorName: "",
    colorHex: "",
    logo: "",
    number: ""
  };

  getUserData = () =>
    new Promise((resolve, reject) => {
      const { _id } = JSON.parse(localStorage.getItem(env.USER));
      const token = localStorage.getItem(env.KEY);
      if (_id && token) {
        resolve({ _id, token });
      } else {
        reject(new Error(`Can't do it!`));
        this.props.history.push("/login");
      }
    });

  getElectoralGroup = _id => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await get(`electoral-group/${_id}`);
        const { electoralGroup } = data;
        resolve(electoralGroup);
      } catch (err) {
        reject(new Error(err));
      }
    });
  };

  getCopyOfPostulation = () =>
    new Promise((resolve, reject) => {
      try {
        const data = keys
          .map(key =>
            localStorage.getItem(key)
              ? { key, data: JSON.parse(localStorage.getItem(key)) }
              : false
          )
          .filter(x => x !== false);
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });

  async componentDidMount() {
    try {
      let state = {
        ...this.state
      };
      const { _id, token } = await this.getUserData();
      const electoralGroup = await this.getElectoralGroup(_id, token);
      if (electoralGroup) {
        state = {
          ...state,
          loading: false,
          electoralGroupStatus: true,
          electoralGroup,
          _id,
          token
        };
        if (electoralGroup.accepted === 1) {
          state = { ...state, electoralGroupAccepted: true };
          if (electoralGroup.postulation) {
            state = {
              ...state,
              postulationData: electoralGroup.postulation,
              checkout: true
            };
          } else {
            // FIXME: Reconsiderar como usar esto
            const data = await this.getCopyOfPostulation();
            if (data.length > 0) {
              data.forEach(({ key, data }) => {
                state.postulation[key] = {
                  ...state.postulation[key],
                  ...data
                };
              });
            }
          }
        } else {
          state = { ...state, electoralGroupAccepted: false };
        }
      } else {
        state = {
          ...state,
          loading: false,
          electoralGroupStatus: false,
          _id,
          token
        };
      }
      this.setState(state);
    } catch (err) {
      notify("Ha ocurrido un Error al iniciar", false);
    }
  }

  save = (key, value) => {
    const postulation = { ...this.state.postulation, [key]: value };
    this.setState({ ...this.state, postulation });
  };

  getBase64 = file =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });

  onChange = e => {
    e.preventDefault();
    console.log("onChange");
    console.log({ [e.target.name]: e.target.value });
    const state = {
      ...this.state,
      [e.target.name]: e.target.value
    };
    this.setState(state);
  };

  onChangeFile = async e => {
    e.preventDefault();
    const state = { ...this.state };
    const file = e.target.files[0];
    const name = e.target.name;
    const base64 = await this.getBase64(file);
    if (base64.startsWith("data:image/")) {
      state[name] = base64;
      this.setState(state);
    } else {
      notify("No logramos reconocer este archivo", false);
    }
  };

  postCreateElectoralGroup = ({
    denomination,
    colorName,
    colorHex,
    logo,
    number,
    _id
  }) =>
    new Promise(async (resolve, reject) => {
      try {
        const data = await post(`create-electoral-group/${_id}`, {
          denomination,
          colorName,
          colorHex,
          logo,
          number
        });
        if (data && data.success) {
          const { electoralGroup } = data;
          if (electoralGroup) {
            resolve(electoralGroup);
          }
        } else {
          reject(new Error(`Can't create that Electoral Group`));
        }
      } catch (err) {
        reject(new Error(err));
      }
    });

  createElectoralGroup = async e => {
    try {
      e.preventDefault();
      const electoralGroup = await this.postCreateElectoralGroup(this.state);
      this.setState({
        ...this.state,
        electoralGroup,
        electoralGroupStatus: true,
        electoralGroupAccepted: true
      });
    } catch (err) {
      notify("Un error ha evitado crear el Grupo electoral", false);
      console.log(err);
    }
  };

  checkout = async e => {
    try {
      e.preventDefault();
      const postulation = {
        ...this.state.postulation,
        userId: this.state._id,
        electoralGroup: this.state.electoralGroup._id
      };
      const data = await post("postulation-create", postulation);
      keys.forEach(key => localStorage.removeItem(key));
      this.setState({ ...this.state, checkout: true, postulationData: data });
    } catch (err) {
      notify("Un Error ha evitado enviar su postulacion", false);
    }
  };

  conditionalRender = () => {
    if (this.state.loading) {
      return (
        <div className="d-flex justify-content-center py-4 card">
          <Spinner
            className="m-auto"
            color="primary"
            style={{ width: "3rem", height: "3rem" }}
          />
        </div>
      );
    } else {
      if (this.state.electoralGroupStatus) {
        if (this.state.electoralGroupAccepted) {
          if (this.state.checkout) {
            return <Checkout postulation={this.state.postulationData} />;
          } else {
            return (
              <>
                <School save={this.save} />
                <SchoolCouncil save={this.save} />
                <FacultyCouncil save={this.save} />
                <Council save={this.save} />
                <StudentFederationCenter save={this.save} />
                <Container>
                  <Row className="justify-content-end">
                    <Button
                      className="my-auto"
                      color="info"
                      outline
                      onClick={this.checkout}
                    >
                      Salvar Postulacion
                    </Button>
                  </Row>
                </Container>
              </>
            );
          }
        } else {
          return (
            <div className="d-flex justify-content-center p-5 card">
              <p className="text-center">
                Su solicitud para crear el Grupo Electoral{" "}
                <strong>{`${this.state.electoralGroup.denomination}`}</strong>{" "}
                esta siendo procesada.
                <br />
                Para cualquier duda comuniquese con la{" "}
                <a href="mailto:ceu@unimet.edu.ve">Comision Electoral</a>
              </p>
            </div>
          );
        }
      } else {
        return (
          <ElectoralGroup
            onChage={this.onChange}
            onChangeFile={this.onChangeFile}
            createElectoralGroup={this.createElectoralGroup}
          />
        );
      }
    }
  };

  render() {
    return (
      <>
        <Header />
        <Container className="mt--7 py-4">
          <Row>
            <Col sm="12">{this.conditionalRender()}</Col>
          </Row>
        </Container>
        <Toast />
      </>
    );
  }
}

export default DashPostulate;
