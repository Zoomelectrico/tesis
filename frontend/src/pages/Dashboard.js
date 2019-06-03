/* eslint-disable react/destructuring-assignment */
/* eslint-disable global-require */
/* eslint-disable react/prop-types */
import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Container } from 'reactstrap';
import {
  Sidebar,
  NavbarAdmin,
  FooterAdmin,
  Loading,
  ProtectedRoute,
  Toast,
  notify,
} from '../components';

const DashHome = lazy(() => import('./dashboard/Home'));
const DashPostulate = lazy(() => import('./dashboard/Postulate'));
const DashProfile = lazy(() => import('./dashboard/Profile'));
const DashVote = lazy(() => import('./dashboard/Vote'));
const DashResults = lazy(() => import('./dashboard/Results'));
const DashDemands = lazy(() => import('./dashboard/Demands'));
const DashElectoralGroups = lazy(() =>
  import('./dashboard/admin/ElectoralGroups')
);
const DashPostulations = lazy(() => import('./dashboard/admin/Postulations'));
const ElectoralGroup = lazy(() => import('./dashboard/admin/ElectoralGroup'));
const Postulation = lazy(() => import('./dashboard/admin/Postulation'));

const routes = [
  {
    name: 'Home',
    path: '/app/dashboard',
    icon: 'fas fa-home',
    exact: true,
    minLevel: [1, 2, 3, 4],
    component: props => <DashHome {...props} />,
  },
  {
    name: 'Perfil',
    path: '/app/dashboard/profile',
    icon: 'fas fa-user',
    exact: false,
    minLevel: [1, 2, 3, 4],
    component: props => <DashProfile {...props} />,
  },
  {
    name: 'Postular',
    path: '/app/dashboard/postulate',
    icon: 'fas fa-user-plus',
    exact: false,
    minLevel: [2],
    component: props => <DashPostulate {...props} />,
  },
  {
    name: 'Solicitudes',
    path: '/app/dashboard/demands',
    icon: 'fas fa-paste',
    exact: false,
    minLevel: [3, 4],
    component: props => <DashDemands {...props} />,
  },
  {
    name: 'Votar',
    path: '/app/dashboard/vote',
    icon: 'fas fa-receipt',
    exact: false,
    minLevel: [1, 2],
    component: props => <DashVote {...props} />,
  },
  {
    name: 'Resultados',
    path: '/app/dashboard/results',
    icon: 'fas fa-poll',
    exact: false,
    minLevel: [1, 2, 3, 4],
    component: props => <DashResults {...props} />,
  },
  {
    name: 'Grupos Electorales',
    path: '/app/dashboard/electoral-groups',
    icon: 'fas fa-users',
    exact: false,
    minLevel: [1, 2, 3, 4],
    component: props => <DashElectoralGroups {...props} />,
  },
  {
    name: 'Postulaciones',
    path: '/app/dashboard/postulations',
    icon: 'fas fa-clipboard-list',
    exact: false,
    minLevel: [1, 2, 3, 4],
    component: props => <DashPostulations {...props} />,
  },
  {
    name: '__none__',
    path: '/app/dashboard/electoral-group',
    icon: 'fas fa-users',
    exact: false,
    minLevel: [3, 4],
    component: props => <ElectoralGroup {...props} />,
  },
  {
    name: '__none__2',
    path: '/app/dashboard/postulation',
    icon: 'fas fa-clipboard-list',
    exact: false,
    minLevel: [3, 4],
    component: props => <Postulation {...props} />,
  },
];

const Dashboard = props => {
  useEffect(() => {
    if (props.user) {
      if (props.user.firstName && localStorage.getItem('welcome')) {
        notify(`Hola ${props.user.firstName}!`, true);
        localStorage.setItem('welcome', false);
      }
    } else {
      props.history.push(
        '/auth/login?reason=Debe-iniciar-sesion-para-acceder&bool=false'
      );
    }
    return () => {
      localStorage.setItem('welcome', true);
    };
  }, [props.user]);
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Sidebar
          {...props}
          bgColor=""
          routes={routes}
          logo={{
            link: '/',
            src: require('../assets/img/logo-color.svg'),
            alt: 'logo',
          }}
        />
        <div className="main-content">
          <NavbarAdmin {...props} brandText="brand" />
          {routes.map(({ name, path, component, exact, minLevel }) =>
            minLevel.includes(props.user.privilege) ? (
              <ProtectedRoute
                key={name}
                path={path}
                component={component}
                exact={exact}
                user={props.user}
                updateUser={props.updateUser}
                onChangeUpdate={props.onChangeUpdate}
              />
            ) : null
          )}
          <Container fluid>
            <FooterAdmin />
          </Container>
          <Toast />
        </div>
      </Suspense>
    </Router>
  );
};

export default Dashboard;
