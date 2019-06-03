/* eslint-disable react/prop-types */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';
import { NotFound } from './pages';
import { Loading, ProtectedRoute, notify } from './components';
import { env, get, post, errorString } from './utils';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));

class App extends React.Component {
  routes = [
    {
      path: '/',
      exact: true,
      component: props => (
        <Home {...props} user={this.state.user} logout={this.logout} />
      ),
    },
    {
      path: '/auth/register',
      exact: true,
      component: props => (
        <Register
          {...props}
          register={this.register}
          logout={this.logout}
          onChangeRegister={this.onChangeRegister}
        />
      ),
    },
    {
      path: '/auth/login',
      exact: true,
      component: props => (
        <Login
          {...props}
          login={this.login}
          logout={this.logout}
          onChangeLogin={this.onChangeLogin}
        />
      ),
    },
    {
      path: '/app/dashboard',
      exact: false,
      component: props => (
        <Dashboard
          {...props}
          user={this.state.user}
          logout={this.logout}
          updateUser={this.updateUser}
          onChangeUpdate={this.onChangeUpdate}
        />
      ),
    },
  ];

  state = {
    user: {},
    registerData: {},
    loginData: {},
    err: {
      happend: false,
      message: '',
    },
  };

  async componentDidMount() {
    try {
      const token = localStorage.getItem(env.KEY);
      if (token) {
        const { id } = JSON.parse(atob(token.split('.')[1]));
        const data = await get(`profile/${id}`);
        if (data && data.success) {
          const state = { ...this.state, user: data.user };
          this.setState(state);
        } else {
          notify(errorString(data.err), false);
        }
      }
    } catch (err) {
      notify(errorString(err.message), false);
      console.log(err);
    }
  }

  setUser = ({ user, token }) => {
    localStorage.setItem(env.KEY, token);
    localStorage.setItem(env.USER, JSON.stringify(user));
    const state = { ...this.state, user };
    this.setState(state);
  };

  setError = err => {
    this.setState({
      ...this.state,
      err: { happend: true, message: err.message },
    });
  };

  // clearError = () => {
  //   this.setState({ ...this.state, err: { happend: false, message: '' } });
  // };

  emailCheck = email =>
    email.endsWith('@correo.unimet.edu.ve') || email.endsWith('@unimet.edu.ve');

  passwordCheck = (password, rePassword) =>
    password.length >= 8 && password === rePassword;

  fieldsCheck = (data = {}) =>
    ['firstName', 'lastName', 'dni', 'email', 'password', 'rePassword'].map(
      key => !!data[key]
    );

  validateRegister = () => {
    if (this.fieldsCheck(this.state.registerData).includes(false)) {
      this.setError(new Error('Debe llenar todos los campos'));
      return false;
    }
    if (!this.emailCheck(this.state.registerData.email)) {
      this.setError(new Error('Debe utilizar su correo institucional'));
      return false;
    }
    if (
      !this.passwordCheck(
        this.state.registerData.password,
        this.state.registerData.rePassword
      )
    ) {
      this.setError(new Error('Las contrasenas deben coincidir'));
      return false;
    }
    return true;
  };

  register = async () => {
    try {
      const datos = this.state.registerData;
      if (!this.validateRegister()) {
        return [new Error(this.state.err.message), null];
      }
      const data = await post('register-user', datos, false);
      this.setUser(data);
      return [null, data];
    } catch (err) {
      return [err, null];
    }
  };

  login = async () => {
    try {
      const datos = this.state.loginData;
      const data = await post('login', datos, false);
      this.setUser(data);
      return [null, data];
    } catch (err) {
      return [err, null];
    }
  };

  logout = async () => {
    localStorage.removeItem(env.KEY);
    localStorage.removeItem(env.USER);
    const state = { ...this.state };
    state.user = {};
    this.setState(state);
    this.props.history.push('/');
  };

  updateUser = async user => {
    try {
      const data = await post(`user-update/${this.state.user._id}`, user);
      this.setState({ ...this.state, user: data.user });
      return [null, data];
    } catch (err) {
      console.log(err);
      return [err, null];
    }
  };

  onChangeFactory = (e, key) => {
    e.preventDefault();
    const state = {
      ...this.state,
      [key]: {
        ...this.state[key],
        [e.target.name]: e.target.value,
      },
    };
    this.setState(state);
  };

  onChangeRegister = e => {
    this.onChangeFactory(e, 'registerData');
  };

  onChangeLogin = e => {
    this.onChangeFactory(e, 'loginData');
  };

  onChangeUpdate = e => {
    this.onChangeFactory(e, 'updateData');
  };

  render() {
    return (
      <>
        <Suspense fallback={<Loading />}>
          <Switch>
            {this.routes.map(({ path, exact, component }) =>
              path.includes('app') ? (
                <ProtectedRoute
                  path={path}
                  exact={exact}
                  component={component}
                  key={path}
                />
              ) : (
                <Route
                  path={path}
                  exact={exact}
                  component={component}
                  key={path}
                />
              )
            )}
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </>
    );
  }
}

export default withRouter(App);
