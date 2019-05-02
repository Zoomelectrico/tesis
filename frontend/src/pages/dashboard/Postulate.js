import React from "react";
import { Container, Row, Col, Spinner, Button } from "reactstrap";
import axios from "axios";
import { Header } from "../../components";
import {
  Council,
  ElectoralGroup,
  FacultyCouncil,
  School,
  SchoolCouncil,
  StudentFederationCenter
} from "./postulate";
import { env } from "../../utils";

class DashPostulate extends React.Component {
  state = {
    electoralGroupStatus: false,
    loading: true,
    err: false,
    electoralGroup: {},
    postulation: {},
    _id: "",
    token: ""
  };

  getUserData = () =>
    new Promise((resolve, reject) => {
      const { _id } = JSON.parse(localStorage.getItem(env.USER));
      const token = localStorage.getItem(env.KEY);
      if (_id && token) {
        this.setState({ ...this.state, _id, token });
        resolve({ _id, token });
      } else {
        reject(new Error(`Can't do it!`));
        this.props.history.push("/login");
      }
    });

  getElectoralGroup = (_id, token) => {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await axios.get(
          `${env.API_URL}/electoral-group/${_id}`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        if (data && data.success) {
          const { electoralGroup } = data;
          resolve(electoralGroup);
        } else {
          reject(new Error(`Can't resolve electoralGroup`));
        }
      } catch (err) {
        reject(new Error(err));
      }
    });
  };

  setErrorState = err => {
    this.setState({
      ...this.state,
      err,
      loading: false,
      electoralGroup: false
    });
  };

  getCopyOfPostulation = () =>
    new Promise((resolve, reject) => {
      try {
        const data = [
          "academic-council",
          "faculty-council",
          "student-federation-center",
          "schools",
          "school-council"
        ]
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
      const { _id, token } = await this.getUserData();
      const electoralGroup = await this.getElectoralGroup(_id, token);
      this.setState({
        ...this.state,
        loading: false,
        electoralGroupStatus: true,
        electoralGroup
      });
      const data = await this.getCopyOfPostulation();
      console.log(data);
    } catch (err) {
      this.setErrorState(err);
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
    const state = {
      ...this.state,
      electoralGroup: {
        ...this.state.electoralGroup,
        [e.target.name]: e.target.value
      }
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
      // FIXME: Handle a non image file
      console.log("Bad image");
    }
  };

  postCreateElectoralGroup = ({
    denomination,
    colorName,
    colorHex,
    logo,
    number,
    _id,
    token
  }) =>
    new Promise(async (resolve, reject) => {
      try {
        const { data } = await axios.post(
          `${env.API_URL}/create-electoral-group/${_id}`,
          { denomination, colorName, colorHex, logo, number },
          { headers: { Authorization: `Bearer ${token}` } }
        );
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
        electoralGroupStatus: true
      });
    } catch (err) {
      this.setErrorState(err);
      console.log(err);
    }
  };

  checkout = e => {
    e.preventDefault();
  };

  render() {
    return (
      <>
        <Header />
        <Container className="mt--7 py-4">
          <Row>
            <Col sm="12">
              {this.state.loading ? (
                <div className="d-flex justify-content-center py-4 card">
                  <Spinner
                    className="m-auto"
                    color="primary"
                    style={{ width: "3rem", height: "3rem" }}
                  />
                </div>
              ) : this.state.electoralGroupStatus ? (
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
                        color="warning"
                        outline
                        onClick={this.checkout}
                      >
                        Salvar Postulacion
                      </Button>
                    </Row>
                  </Container>
                </>
              ) : (
                <ElectoralGroup
                  onChage={this.onChange}
                  onChangeFile={this.onChangeFile}
                  createElectoralGroup={this.createElectoralGroup}
                />
              )}
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default DashPostulate;
