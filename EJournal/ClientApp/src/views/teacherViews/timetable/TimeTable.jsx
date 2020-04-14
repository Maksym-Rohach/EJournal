import React, { Component } from 'react';
// import * as getListActions from './reducer';
// import { connect } from 'react-redux';
// import get from "lodash.get";
import { MDBTable, MDBTableBody, MDBTableHead, MDBCard, MDBCardBody, MDBCardHeader } from 'mdbreact';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import Typography from "@material-ui/core/Typography";


class Timetable extends Component {
    constructor(props){
        super(props);
        this.state = {
            date1 : '',  
            date2 : '',    
        }
    }
    //   componentDidMount = () => {
    //     const{date1, date2} = this.state;
    //     this.props.getTimetable({date1, date2 });
    //   }
    //   componentWillReceiveProps = () => {
    //     const{date1, date2} = this.state;
    //     this.props.getTimetable({date1, date2 });
    //   }
    firstDayOfWeek=(dateObject, firstDayOfWeekIndex)=> {

        const dayOfWeek = dateObject.getDay(),
            firstDayOfWeek = new Date(dateObject),
            diff = dayOfWeek >= firstDayOfWeekIndex ?
                dayOfWeek - firstDayOfWeekIndex :
                6 - dayOfWeek
    
        firstDayOfWeek.setDate(dateObject.getDate() - diff)
        firstDayOfWeek.setHours(0,0,0,0)
    
        console.log(firstDayOfWeek);
        return firstDayOfWeek
    }

    dateOne=()=>{
    let firstDayOfWeek = this.firstDayOfWeek(new Date(), 1);
    console.log(firstDayOfWeek);
    this.setState({date1:  +firstDayOfWeek});
    return('1');
    }
    dateTwo=()=>{
        // let firstDayOfWeek = this.firstDayOfWeek(new Date(), 1);
        // this.setState({date2:  +firstDayOfWeek+7});
        return('2');
    }
    next=()=>{

    }
    prev=()=>{

    }
    today=()=>{
       let today = new Date();
       let res = today.getDay.toString();
       return(res); 
    }
      render() {
  return (
    <MDBCard>
        <MDBCardHeader className="d-flex justify-content-center">
        <div>{this.today}</div>
        <div className="d-flex flex-row">
        <KeyboardArrowLeft className="hover-cursor" fontSize="large" />
        <div>{this.dateOne}</div>
        <div>-</div>
        <div>{this.dateTwo}</div>
        <KeyboardArrowRight className="hover-cursor" fontSize="large" onClick={this.next}/>
        </div> 
        </MDBCardHeader>
        <MDBCardBody>
    <MDBTable>
      <MDBTableHead color="primary-color" textWhite>
        <tr>
          <th>#</th>
          <th>ПН</th>
          <th>ВТ</th>
          <th>СР</th>
          <th>ЧТ</th>
          <th>ПТ</th>
          <th>СБ</th>
          <th>НД</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
       <tr>
           <td>1</td>
       </tr>
       <tr>
           <td>2</td>
       </tr>
       <tr>
           <td>3</td>
       </tr>
       <tr>
           <td>4</td>
       </tr>
      </MDBTableBody>
    </MDBTable>
    </MDBCardBody>
    </MDBCard>
  )
}
}
// const mapStateToProps = state => {
//     return {
//         data: get(state,'timetable.list.data'), 
//     };
//   }
  
//   const mapDispatchToProps = (dispatch) => {
//     return {
//         getTimetable: filter => {
//         dispatch(getListActions.getTimetable(filter));
//       }
//     }
//   }
   
// export default connect(mapStateToProps, mapDispatchToProps)(Timetable);
export default Timetable;