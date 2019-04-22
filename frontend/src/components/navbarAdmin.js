import React from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  Container,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  Media,
  DropdownItem
} from "reactstrap";

const NavbarAdmin = props => (
  <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
    <Container fluid>
      <Link
        className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
        to="/"
      >
        {props.brandName}
      </Link>
      <Nav className="align-items-center d-none d-md-flex" navbar>
        <UncontrolledDropdown nav>
          <DropdownToggle className="pr-0" nav>
            <Media className="align-items-center">
              <span className="avatar avatar-sm rounded-circle">
                <img
                  alt="User profile"
                  src={
                    props.user.img ||
                    require("../assets/img/user-placeholder.png")
                  }
                />
              </span>
              <Media className="ml-2 d-none d-lg-block">
                <span className="mb-0 text-sm font-weight-bold">
                  {`${props.user.firstName || "John"} ${props.user.lastName ||
                    "Snow"}`}
                </span>
              </Media>
            </Media>
          </DropdownToggle>
          <DropdownMenu className="dropdown-menu-arrow" right>
            <DropdownItem to="/app/dashboard/profile" tag={Link}>
              <i className="fas fa-user" />
              <span>Mi Perfil</span>
            </DropdownItem>
            <DropdownItem to="/app/dashboard/vote" tag={Link}>
              <i className="fas fa-receipt" />
              <span>Votar</span>
            </DropdownItem>
            <DropdownItem to="/app/dashboard/results" tag={Link}>
              <i className="fas fa-poll" />
              <span>Resultados</span>
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem onClick={props.logout}>
              <i className="fas fa-sign-out-alt" />
              <span>Cerrar Sesion</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Nav>
    </Container>
  </Navbar>
);

export default NavbarAdmin;
