import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Badge, UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem } from 'reactstrap';
import PropTypes from 'prop-types';
import { AppAsideToggler, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from "../../assets/logo3big.png";
import logoFull from "../../assets/logo3full.png";

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class ManagerNavbar extends Component {
  render() {

    const { children, image, name, ...attributes } = this.props;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logoFull, height: 40, alt: "Ejournal Logo" }}
          minimized={{ src: logo, height: 40, alt: "Ejournal Logo" }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />

        <Nav className="d-md-down-none" navbar>          
        </Nav>
        <Nav className="ml-auto" navbar>          
          <UncontrolledDropdown nav direction="down">
            <DropdownToggle nav>
              <img src={image} className="img-avatar" alt={name} />
              {name}
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem header tag="div" className="text-center"><strong>Акаунт</strong></DropdownItem>
              <DropdownItem onClick={e => this.props.onLogout(e)}><i className="fa fa-lock"></i> Вихід</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </React.Fragment>
    );
  }
}

ManagerNavbar.propTypes = propTypes;
ManagerNavbar.defaultProps = defaultProps;

export default ManagerNavbar;
