import React, { Component } from 'react';
import * as getListActions from './reducer';
import { connect } from 'react-redux';
import get from "lodash.get";
import { MDBDataTable } from 'mdbreact'; 
class StudentsTable extends Component {
    state = {
        group: '',
        speciality: '',        
      }

    componentDidMount = () => {
        const { group, speciality } = this.state;
        this.props.getStudents({ group, speciality });
      }

    render() { 

        const {listStudents} = this.props;
        console.log("RENDER", listStudents);
        return ( 
            <MDBDataTable
                striped
                bordered
                hover
                data={listStudents}/>
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
 