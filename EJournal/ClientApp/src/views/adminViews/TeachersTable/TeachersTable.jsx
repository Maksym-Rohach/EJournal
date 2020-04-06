import React, { Component } from 'react';
import * as getListActions from './reducer';
import { connect } from 'react-redux';
import get from "lodash.get";
import { MDBDataTable } from 'mdbreact';
import { Dropdown } from 'primereact/dropdown';
import { Dialog } from 'primereact/dialog';
import { Accordion, AccordionTab } from 'primereact/accordion';

class TeachersTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
        rolename: '',
    };

    this.changeRole = this.changeRole.bind(this);

  }
  

  componentDidMount = () => {
    const { rolename } = this.state;
    this.props.getTeachers({ rolename });
  }
  changeRole(event) {
    const rolename=event.value;
    this.setState({ rolename: rolename });
    this.props.getTeachers({ rolename});
  }
  
  render() {
    const { listTeachers } = this.props;
    console.log("RENDER", listTeachers);
    const roles = listTeachers.roles;

    return (
      <React.Fragment>
        <Dropdown value={this.state.rolename} options={roles} onChange={this.changeRole} placeholder="Select a role" />
        
        <MDBDataTable
          striped
          bordered
          hover
          data={listTeachers} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    listTeachers: get(state, 'teachers.list.data'),
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getTeachers: filter => {
      dispatch(getListActions.getTeachers(filter));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeachersTable);
