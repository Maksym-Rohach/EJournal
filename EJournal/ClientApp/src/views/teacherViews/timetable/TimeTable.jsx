  
import React, { Component } from 'react';
import { MDBDataTable } from 'mdbreact'; 
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';


class Timetable extends Component {

state = {
  lessonNumber: null,
  lessonTimeGap: ' ',
  subjectName: ' ',
  dayOfWeek: ' ',
  auditoriumNumber: ' '
}

componentDidMount = () => {
  const { lessonNumber, lessonTimeGap, subjectName, dayOfWeek, auditoriumNumber } = this.state;
  this.props.getStudents({ lessonNumber, lessonTimeGap, subjectName, dayOfWeek, auditoriumNumber });
}


render(){
  const {listTimetable} = this.props;
  console.log(listTimetable);
  return ( 
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
      <MDBTableBody>
       
       </MDBTableBody>
      </MDBTable>
  );
}
}
export default Timetable;

// const mapStateToProps = state => {
//   return {
//      listTimetable: get(state, 'timetable.list.data'), 
//   };
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//      getTimetable: filter => {
//       dispatch(getListActions.getTimetable(filter));
//     }
//   }
// }
 
// export default connect(mapStateToProps, mapDispatchToProps)(Timetable);

//   const BasicTable = () => {
//   return (
//     <MDBTable>
//       <MDBTableHead color="primary-color" textWhite>
//         <tr>
//           <th>#</th>
//           <th>Понеділок</th>
//           <th>Вівторок</th>
//           <th>Середа</th>
//           <th>Четвер</th>
//           <th>П'ятниця</th>
//           <th>Субота</th>
//           <th>Неділя</th>


//         </tr>
//       </MDBTableHead>
//       <MDBTableBody>
//         <tr>
//           <td>1</td>
//           <td>Mark</td>
//           <td>Otto</td>
//           <td>@mdo</td>
//         </tr>
//         <tr>
//           <td>2</td>
//           <td>Jacob</td>
//           <td>Thornton</td>
//           <td>@fat</td>
//         </tr>
//         <tr>
//           <td>3</td>
//           <td>Larry</td>
//           <td>the Bird</td>
//           <td>@twitter</td>
//         </tr>
//       </MDBTableBody>
//     </MDBTable>
//   );
// }
// export default BasicTable;
