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

const routes = [
  {
    name: "Home",
    path: "/app/dashboard",
    icon: "fas fa-home",
    exact: true,
    component: props => <DashHome {...props} />
  },
  {
    name: "Profile",
    path: "/app/dashboard/profile",
    icon: "fas fa-user",
    exact: true,
    component: props => <DashProfile {...props} />
  },
  {
    name: "Postulate",
    path: "/app/dashboard/postulate",
    icon: "fas fa-user-plus",
    exact: true,
    component: props => <DashPostulate {...props} />
  },
  {
    name: "Vote",
    path: "/app/dashboard/vote",
    icon: "fas fa-receipt",
    exact: true,
    component: props => <DashVote {...props} />
  },
  {
    name: "Results",
    path: "/app/dashboard/results",
    icon: "fas fa-poll",
    exact: true,
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
          src: require("../assets/img/logo-1-x2.png"),
          alt: "logo"
        }}
      />
      <div className="main-content">
        <NavbarAdmin {...props} brandText="brand" />
        {routes.map(({ name, path, component, exact }) => (
          <ProtectedRoute
            key={name}
            path={path}
            component={component}
            exact={exact}
          />
        ))}
        <Container fluid>
          <FooterAdmin />
        </Container>
      </div>
    </Suspense>
  </Router>
);

export default Dashboard;
