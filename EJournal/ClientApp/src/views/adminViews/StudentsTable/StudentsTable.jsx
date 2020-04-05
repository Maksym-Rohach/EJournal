import React, { Component } from 'react';
import * as getListActions from './reducer';
import { connect } from 'react-redux';
import get from "lodash.get";
import { MDBDataTable } from 'mdbreact';
import { Dropdown } from 'primereact/dropdown';
import { Dialog } from 'primereact/dialog';
import { Accordion, AccordionTab } from 'primereact/accordion';

class StudentsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groupId: 0,
      specialityId: 0,
    };

    this.changeSpec = this.changeSpec.bind(this);
    this.changeGroup = this.changeGroup.bind(this);

  }
  

  componentDidMount = () => {
    const { groupId, specialityId } = this.state;
    this.props.getStudents({ groupId, specialityId });
  }
  changeSpec(event) {
    const groupId= 0;
    const specialityId=event.value;
    console.log("spe"+specialityId);
    this.setState({ groupId: groupId, specialityId: specialityId });
    this.props.getStudents({ groupId, specialityId });
  }
  changeGroup(event) {
    const groupId= event.target.value;
    const specialityId=this.state.speciality;
    this.setState({ groupId: groupId, specialityId: specialityId });
    this.props.getStudents({ groupId, specialityId });
  }
  render() {
    const { listStudents } = this.props;
    console.log("RENDER", listStudents);
    const specs = listStudents.specialities;
    const groups = listStudents.groups;

    return (
      <React.Fragment>
        <Dropdown value={this.state.specialityId} options={specs} onChange={this.changeSpec} placeholder="Select a speciality" />
        <Dropdown value={this.state.groupId} options={groups} onChange={this.changeGroup} placeholder="Select a group" />
        
        <MDBDataTable
          striped
          bordered
          hover
          data={listStudents} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    listStudents: get(state, 'students.list.data'),
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getStudents: filter => {
      dispatch(getListActions.getStudents(filter));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentsTable);
