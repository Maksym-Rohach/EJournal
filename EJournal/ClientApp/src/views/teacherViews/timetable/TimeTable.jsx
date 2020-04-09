  
import React, { Component } from 'react';
import { MDBTable, MDBTableBody, MDBTableHead, MDBCardHeader, MDBCardBody, MDBBtn, MDBCard } from 'mdbreact';
import "./TimeTableStyle.css";


class Timetable extends Component {
//   state = {
//     date1: '',
//     date2: '',       
//   }


// componentDidMount = () => {  
//     const{date1, date2} = this.state;
//     this.props.getTimetable({date1, date2 });

//   }
//   componentWillReceiveProps = () => {
//     const{date1, date2} = this.state;
//     this.props.getTimetable({date1, date2});

//   }
  render() {
return (
  <div>
    <MDBCard>
    <MDBCardHeader>
    <MDBBtn color="cyan">prev</MDBBtn>
    <input type="text" className="form-control" id="formGroupExampleInput" disabled value = "30.04.2020"/>
    <input type="text" className="form-control" id="formGroupExampleInput" disabled value = "05.05.2020"/>
    <MDBBtn color="cyan">next</MDBBtn>
    </MDBCardHeader>
    <MDBCardBody>
    <MDBTable>
       <MDBTableHead color="primary-color" textWhite>
        <tr>
         <th>#</th>
        <th>Понеділок</th>
         <th>Вівторок</th>
         <th>Середа</th>
         <th>Четвер</th>
         <th>П'ятниця</th>
         <th>Субота</th>
         <th>Неділя</th>    
        </tr>
       </MDBTableHead>
       <MDBTableBody >
            <tr>
              1
            </tr>
       </MDBTableBody>
       </MDBTable>
       </MDBCardBody>
       </MDBCard>
  </div>
)
  
  }
}
export default Timetable;

// const mapStateToProps = state => {
//   return {
//       data: get(state,'timetable.list.data'), 
//   };
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//       getTimetable: filter => {
//       dispatch(getListActions.getTimetable(filter));
//     }
//   }
// }
 
// export default connect(mapStateToProps, mapDispatchToProps)(Timetable);
