import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Container } from "reactstrap";
import {
  Sidebar,
  NavbarAdmin,
  FooterAdmin,
  Loading,
  ProtectedRoute
} from "../components";

const DashHome = lazy(() => import("./dashboard/Home"));
const DashPostulate = lazy(() => import("./dashboard/Postulate"));
const DashProfile = lazy(() => import("./dashboard/Profile"));
const DashVote = lazy(() => import("./dashboard/Vote"));
const DashResults = lazy(() => import("./dashboard/Results"));
const DashDemands = lazy(() => import("./dashboard/Demands"));

const routes = [
  {
    name: "Home",
    path: "/app/dashboard",
    icon: "fas fa-home",
    exact: true,
    minLevel: 1,
    component: props => <DashHome {...props} />
  },
  {
    name: "Perfil",
    path: "/app/dashboard/profile",
    icon: "fas fa-user",
    exact: true,
    minLevel: 1,
    component: props => <DashProfile {...props} />
  },
  {
    name: "Postular",
    path: "/app/dashboard/postulate",
    icon: "fas fa-user-plus",
    exact: true,
    minLevel: 2,
    component: props => <DashPostulate {...props} />
  },
  {
    name: "Solicitudes",
    path: "/app/dashboard/demands",
    icon: "fas fa-paste",
    exact: true,
    minLevel: 3,
    component: props => <DashDemands {...props} />
  },
  {
    name: "Votar",
    path: "/app/dashboard/vote",
    icon: "fas fa-receipt",
    exact: true,
    minLevel: 1,
    component: props => <DashVote {...props} />
  },
  {
    name: "Resultados",
    path: "/app/dashboard/results",
    icon: "fas fa-poll",
    exact: true,
    minLevel: 1,
    component: props => <DashResults {...props} />
  }
];

const Dashboard = props => (
  <Router>
    <Suspense fallback={<Loading />}>
      <Sidebar
        {...props}
        bgColor=""
        routes={routes}
        logo={{
          link: "/",
          src: require("../assets/img/logo-color.svg"),
          alt: "logo"
        }}
      />
      <div className="main-content">
        <NavbarAdmin {...props} brandText="brand" />
        {routes.map(({ name, path, component, exact, minLevel }) =>
          minLevel <= props.user.privilege ? (
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
      </div>
    </Suspense>
  </Router>
);

export default Dashboard;
