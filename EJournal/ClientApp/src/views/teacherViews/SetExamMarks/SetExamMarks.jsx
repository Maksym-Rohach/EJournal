import React, { Component } from 'react';
import * as getListActions from './reducer';
import * as getListData from './reducer';
import { connect } from 'react-redux';
import get from "lodash.get";
import { Paper } from '@material-ui/core';
import {Button} from 'reactstrap';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdbreact';
import IconButton from "@material-ui/core/IconButton";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import Loader from"../../../components/Loader";
import {serverUrl} from '../../../config';
import { Input } from "reactstrap";



// function mapBodyTable(data) {
//   let counter = 1;
//   console.log("body " + data.rows);
//   if (data.rows != undefined) {
//       return data.rows.map(item => {
//           return (
//               <tr>
//                  <th style={{textAlign: "center"}} key={counter}>{counter++}</th>
//                  <td style={{textAlign: "center"}} key={counter}>{item.dateOfExam}</td>
//                  <td style={{textAlign: "center"}} key={counter}>{item.groupName}</td>
//                  <td style={{textAlign: "center"}} key={counter}>{item.subject}</td>
//                  <td style={{textAlign: "center"}} key={counter}>
//                     <IconButton
//                           onClick= {(item) => {onClickRow(item)}}
//                           color="primary"
//                           component="span">
//                           <NavigateNextIcon />
//                     </IconButton>
//                  </td>
//               </tr>
//           );
//       });
//   }
// }

// function onCLickOnRow(data){
//   let dateOfExam = data.dateOfExam;
//   let groupName = data.groupName;
//   let subject = data.subject;

//   let model = {
//     groupName: groupName,
//     subject: subject,
//     dateOfExam: dateOfExam
//   };

//   this.props.getData(model);
// }

class SetExamsMarks extends Component {
  state = {
      exams:[],
      data: null,
      model: null
  }

  onClickRow = (model) => {
    this.setState({
      data:model,
      model:model
    });
    this.props.getData(model);
  }

  mapBodyTable = (data) => {
    let counter = 1;
    if (data.rows != undefined) {
        return data.rows.map(item => {
            return (
                <tr key={counter}>
                   <th style={{textAlign: "center"}}>{counter++}</th>
                   <td style={{textAlign: "center"}}>{item.dateOfExam}</td>
                   <td style={{textAlign: "center"}}>{item.groupName}</td>
                   <td style={{textAlign: "center"}}>{item.subject}</td>
                   <td style={{textAlign: "center"}}>
                      <IconButton
                            onClick={(e) => this.onClickRow(e, item)}
                            color="primary"
                            component="span">
                            <NavigateNextIcon />
                      </IconButton>
                   </td>
                </tr>
            );
        });
    }
  }

  mapBodyStudents = (data, marks) => {
    let counter = 1;
    if (data.students != undefined) {
        return data.students.map(item => {
          let image;
          if(item.image === null)
          {
            image = "default-image.jpg";
          }
          else{
            image = item.image;
          }
          console.log("MARKS", marks);
            return (
                <tr key={counter}>
                   <th style={{textAlign: "center"}}>{counter++}</th>
                   <td style={{textAlign: "center"}}>{item.name}</td>
                   <td style={{textAlign: "center"}}>
                    <img src={`${serverUrl}UsersImages/50_${image}`} className="img-avatar" alt="user" />  
                   </td>
                   <td style={{textAlign: "center"}}>
                    <Input
                      //onChange={(e) => handleSelectChange(e,lessonId,3,el.id)}
                      //onChange={handleChangeSelect(data.group, row.id)}
                      type="select"
                      className="control-wrk font-weight-bold"
                      style={{width:'50%'}}
                    >
                      {/* <option disabled selected value={0}></option> */}
                              {/* {marks.map(function (elem) {
                                  return (
                                    <option selected value={elem}>
                                      {elem}
                                    </option>
                                  );
                                }
                              )} */}
                      <option disabled selected value={0}></option>
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                      <option value={4}>4</option>
                      <option value={5}>5</option>
                      <option value={6}>6</option>
                      <option value={7}>7</option>
                      <option value={8}>8</option>
                      <option value={9}>9</option>
                      <option value={10}>10</option>
                      <option value={11}>11</option>
                      <option value={12}>12</option>

                    </Input>
                   </td>
                </tr>
            );
        });
    }
  }

  componentDidMount = () => {
    this.props.getExams();
  }

  render() {
    const {exams, loading, data} = this.props;
    const {model} = this.state;
    const {marks} = [
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        '11',
        '12'
    ]

    console.log("LOADER", loading);
    if(exams !== undefined){
        if(loading === true){
            console.log("Loading", loading)
            return(<Loader/>)
        }
        else if(data !== null && model !== null){
      return (
        <React.Fragment>
          <Paper elevation={7} className="p-3 mt-4">
            <MDBTable>
              <MDBTableHead color="info-color" textWhite>
                <tr>
                  <th style={{textAlign: "center"}}>#</th>
                  <th style={{textAlign: "center"}}>ПІБ</th>
                  <th style={{textAlign: "center"}}></th>
                  <th>Оцінка</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {
                  this.mapBodyStudents(data, this.marks)
                }
              </MDBTableBody>
            </MDBTable>
          </Paper>
        </React.Fragment>
      );}
      else{
        return(
          <React.Fragment>
          <Paper elevation={7} className="p-3 mt-4">
              <MDBTable>
                  <MDBTableHead color="info-color" textWhite>
                      <tr>
                        <th style={{textAlign: "center"}}>#</th>
                        <th style={{textAlign: "center"}}>Дата екзамену</th>
                        <th style={{textAlign: "center"}}>Група</th>
                        <th style={{textAlign: "center"}}>Предмет</th>
                        <th style={{textAlign: "center"}}>Перейти на виставлення</th>
                       </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                      {
                          this.mapBodyTable(exams)
                      }
                  </MDBTableBody>
              </MDBTable>
          </Paper>
        </React.Fragment>);
      }
    }
    else{
        return(
            <React.Fragment>
                SORY
            </React.Fragment>
        );
    }
  }
}

const mapStateToProps = state => {
  console.log("mapStateto props", state);
    return {
        exams: get(state, 'getExams.list.exams'),
        loading: get(state, "getExams.list.loading"),
        data: get(state, 'getExams.list.data'),
    };
  }

const mapDispatchToProps = (dispatch) => {
  console.log("mapDispatch");
  return {
    getExams:()=>{
        dispatch(getListActions.getExams());
    },
    getData:(filter)=>{
      dispatch(getListData.getData(filter));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)( SetExamsMarks );