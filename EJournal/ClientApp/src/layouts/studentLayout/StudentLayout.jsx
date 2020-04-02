import React from 'react';
import SideBar from "./StudentSideBar";
import {Redirect, Route, Switch } from "react-router-dom";
import routes from "../../routes/adminRoutes";
import { connect } from "react-redux";
import get from 'lodash.get';
import { logout } from '../../views/defaultViews/LoginPage/reducer';


class StudentLayout extends React.Component {
    // constructor(props) {
    //     super(props);
    //     console.log(props);
    //   }
render() {
    const { login } = this.props;
    //console.log(login);
    let isAccess = false;
    if(login.isAuthenticated===undefined){
        return (
            <Redirect to="/login" />  
          );
    }
    if(login.isAuthenticated)
    {
      const { roles } = login.user;
      for (let i = 0; i < roles.length; i++) {
        if (roles[i] === 'Student')
          isAccess = true;
      }
    }
    const content = (
        <SideBar></SideBar>
    )
    return (
      isAccess ? 
      content
        : <Redirect to="/login" />  
    );
  }
}
const mapStateToProps = (state) => {
    return {
      login: get(state, 'login')
    };
  }
  
  export default connect(mapStateToProps, { logout }) (StudentLayout);

