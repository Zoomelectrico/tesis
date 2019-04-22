import React from "react";
import { Container, Row, Col, Spinner } from "reactstrap";
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
    loading: true
  };

  async componentDidMount() {
    try {
      const { _id } = JSON.parse(localStorage.getItem(env.USER));
      const token = localStorage.getItem(env.KEY);
      if (_id) {
        const { data } = await axios.get(
          `${env.API_URL}/electoral-group/${_id}`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        if (data && data.success) {
          const { electoralGroup } = data;
          if (electoralGroup) {
            this.setState({
              ...this.state,
              loading: false,
              electoralGroupStatus: true,
              electoralGroup
            });
          } else {
            this.setState({
              ...this.state,
              electoralGroupStatus: false,
              loading: false
            });
          }
        } else {
          // Send some flashes
          this.setState({
            ...this.state,
            loading: false,
            electoralGroupStatus: false
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  onChange = e => {
    e.preventDefault();
    const state = { ...this.state };
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  getBase64 = file =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });

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
      console.log("Bad image");
    }
  };

  createElectoralGroup = async e => {
    try {
      const { _id } = JSON.parse(localStorage.getItem(env.USER));
      const token = localStorage.getItem(env.KEY);
      if (_id) {
        const { denomination, colorName, colorHex, logo, number } = this.state;
        e.preventDefault();
        const { data } = await axios.post(
          `${env.API_URL}/create-electoral-group/${_id}`,
          { denomination, colorName, colorHex, logo, number },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (data && data.success) {
          const { electoralGroup } = data;
          if (electoralGroup) {
            this.setState({
              ...this.state,
              electoralGroupStatus: true,
              electoralGroup
            });
          } else {
            console.log("electoralGroup false");
          }
        } else {
          console.log("data false");
        }
      } else {
        console.log("_id false");
      }
    } catch (err) {
      console.log(err);
    }
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
                  <School onChange={this.onChange} />
                  <Council onChange={this.onChange} />
                  <SchoolCouncil onChange={this.onChange} />
                  <FacultyCouncil onChange={this.onChange} />
                  <StudentFederationCenter onChange={this.onChange} />
                </>
              ) : (
                <ElectoralGroup
                  onChange={this.onChange}
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
