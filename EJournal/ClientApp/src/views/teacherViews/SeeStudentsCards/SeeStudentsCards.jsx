import React, { Component } from 'react';
import * as getListActions from './reducer';
import { connect } from 'react-redux';
import get from "lodash.get";

class SeeStudentsCards extends Component {
  state = { 
    students:null
  }
  // componentDidMount = () => {
  //         this.props.seeStudents();
  //      }
  render() { 
    const {listStudents} = this.props;
    return (<div>aaaa</div>  );
  }
}
 
const mapStateToProps = state => {
    console.log("mapStateto props", state);
      return {
          listStudents: get(state, 'seeStudentsCards.list.students'),
      };
    }
   
    const mapDispatchToProps = (dispatch) => {
      console.log("mapDispatch");
      return {
          seeStudents: () => {
          dispatch(getListActions.seeStudentsCards());
        }
      }
    }
export default connect(mapStateToProps,mapDispatchToProps)( SeeStudentsCards );

