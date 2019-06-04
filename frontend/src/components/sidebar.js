/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable global-require */
/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import { NavLink as NavLinkRRD, Link } from 'react-router-dom';
import {
  Collapse,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
} from 'reactstrap';

const activeRoute = (pathName, routeName) =>
  pathName.indexOf(routeName) > -1 ? 'active' : '';

const toggleCollapse = (collapseOpen, setCollapseOpen) =>
  setCollapseOpen(!collapseOpen);

const closeCollapse = setCollapseOpen => setCollapseOpen(false);

const createLinks = (routes, setCollapseOpen, user) =>
  routes.map(link =>
    link.minLevel.includes(user.privilege) ? (
      link.name.includes('__none__') ? null : (
        <NavItem key={link.name}>
          <NavLink
            to={link.path}
            tag={NavLinkRRD}
            onClick={() => closeCollapse(setCollapseOpen)}
            id={link.name}
            activeClassName="active"
          >
            <i className={link.icon} />
            {link.name}
          </NavLink>
        </NavItem>
      )
    ) : null
  );

const Sidebar = props => {
  const [collapseOpen, setCollapseOpen] = useState(false);
  const { routes, logo } = props;
  let navbarBrandProps;
  return (
    <Navbar className="navbar-vertical fixed-left navbar-light bg-white navbar navbar-expand-md">
      <Container fluid>
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => toggleCollapse(collapseOpen, setCollapseOpen)}
        >
          <span className="navbar-toggler-icon" />
        </button>
        {logo ? (
          <NavbarBrand className="pt-0" {...navbarBrandProps}>
            <img alt={logo.alt} className="navbar-brand-img" src={logo.src} />
          </NavbarBrand>
        ) : null}
        <div className="align-items-center d-md-none">
          <Media className="algin-items-center">
            <span className="avatar avatar-sm rounded-circle">
              <img
                alt="User profile"
                src={
                  props.user.img ||
                  require('../assets/img/user-placeholder.png')
                }
              />
            </span>
          </Media>
        </div>
        <Collapse navbar isOpen={collapseOpen}>
          <div className="navbar-collapse-header d-md-none">
            <Row>
              {logo ? (
                <Col className="collapse-brand" xs="6">
                  <Link to={logo.link}>
                    <img alt={logo.alt} src={logo.src} />
                  </Link>
                </Col>
              ) : null}
              <Col className="collapse-close" xs="6">
                <button
                  className="navbar-toggler"
                  type="button"
                  onClick={() => toggleCollapse(collapseOpen, setCollapseOpen)}
                >
                  <span />
                  <span />
                </button>
              </Col>
            </Row>
          </div>
          <Nav navbar>
            {createLinks(routes, setCollapseOpen, props.user)}
            <hr className="my-3" />
            <NavItem>
              <NavLink onClick={props.logout}>
                <i className="fas fa-sign-out-alt" />
                Cerrar Sesion
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
};

export default Sidebar;
