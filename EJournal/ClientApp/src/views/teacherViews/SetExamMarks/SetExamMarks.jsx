import React, { Component } from 'react';
import * as getListActions from './reducer';
import { connect } from 'react-redux';
import get from "lodash.get";
import { Paper } from '@material-ui/core';
import {Button} from 'reactstrap';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdbreact';

function mapBodyTable(data) {
  let counter = 1;
  console.log("body " + data.rows);
  if (data.rows != undefined) {
      return data.rows.map(item => {
          return (
              <tr>
                 <th style={{textAlign: "center"}} key={counter}>{counter++}</th>
                 <td style={{textAlign: "center"}} key={counter}>{item.dateOfExam}</td>
                 <td style={{textAlign: "center"}} key={counter}>{item.groupName}</td>
                 <td style={{textAlign: "center"}} key={counter}>{item.subject}</td>
                 <td style={{textAlign: "center"}} key={counter}>
                    <Button 
                        block 
                        outline
                        onClick={onCLickOnRow(item)}
                        style={{width:'5em'}} 
                        color="info">>
                    </Button>
                 </td>
              </tr>
          );
      });
  }
}

function onCLickOnRow(data){

}

class SetExamsMarks extends Component {
  state = {
      exams:null,
  }

  componentDidMount = () => {
    this.props.getExams();
  }

  render() {
    const {exams} = this.props;

    if(exams !== undefined){
      return (
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
                          mapBodyTable(exams)
                      }
                  </MDBTableBody>
              </MDBTable>
          </Paper>
        </React.Fragment>
      );
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
    };
  }

const mapDispatchToProps = (dispatch) => {
  console.log("mapDispatch");
  return {
    getExams:()=>{
        dispatch(getListActions.getExams());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)( SetExamsMarks );