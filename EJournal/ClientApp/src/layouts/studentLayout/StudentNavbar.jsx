import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import {   
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownMenu,
    MDBDropdownItem,
    MDBIcon
  
  } from "mdbreact";
import { Badge, UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem } from 'reactstrap';
import PropTypes from 'prop-types';

import "./sideBarStyle.css";

import { AppAsideToggler, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/logo3big.png'
import sygnet from '../../assets/logo3big.png'

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class StudentNavbar extends Component {
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, height: 40, alt: 'Ejournal Logo' }}
          minimized={{ src: sygnet, height: 40, alt: 'Ejournal Logo' }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />

        
        <Nav className="ml-auto" navbar>
          <NavItem className="d-md-down-none mr-3">
            <NavLink to="#" className="nav-link"><i className="icon-bell"></i><Badge pill color="danger">2</Badge></NavLink>
          </NavItem>          
          <MDBDropdown className="mr-3">
                    <MDBDropdownToggle className='dopdown-toggle' nav>
                      <img
      //TODO  динамічно підтягувати імейдж юзера 
                        src='https://mdbootstrap.com/img/Photos/Avatars/avatar-2.jpg'
                        className='rounded-circle z-depth-0'
                        alt=''
                        id="profileImage"
                      />
                    </MDBDropdownToggle>
                    <MDBDropdownMenu id="dropMenu1" className='dropdown-default' right>
      {/* TODO перекидувати на те куди потрібно*/}
                      <MDBDropdownItem href='#!'><i class="ml-2 icon-user"></i> Мій профіль</MDBDropdownItem>
                      <MDBDropdownItem href='#!'><i class="ml-2 icon-settings"></i> Настройки</MDBDropdownItem>
                      <MDBDropdownItem href='#!'><i class="ml-2 icon-logout"></i> Вихід</MDBDropdownItem>
                    </MDBDropdownMenu>
                  </MDBDropdown>
          
        </Nav>
        
      </React.Fragment>
    );
  }
}

StudentNavbar.propTypes = propTypes;
StudentNavbar.defaultProps = defaultProps;

export default StudentNavbar;
