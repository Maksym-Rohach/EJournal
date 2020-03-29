import React, { Component,useState } from 'react';

import * as getListActions from './reducer';
import { connect } from 'react-redux';
import get from "lodash.get";
import { Table } from 'reactstrap';
import {
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
} from 'mdbreact';

import "./TimeTableStyle.css";
//лоадим уроки, щоб запихнути в одну змінну робим чистий html
function createMarkup(data,date) {
    
    if(data[0]!=undefined||data===undefined){
        
        let html='';
        for (let i = 0; i < data.length; i++) {
            const el = data[i];
            if(el.day==date){
                     if(el.topic!=null){
                     html+=`
                     <h3>${el.subjectName}</h3>
                     <h4>${el.topic}</h4>
                     <p>${el.teacherName}</p>
                     <div class="d-flex flex-row">
                     <p>${el.lessonTimeGap}</p>
                     <p class="ml-3">${el.auditoriumNumber}</p>
                     </div>
                     <hr/>
                  `;}else{
                  html+=`
                     <h3>${el.subjectName}</h3>
                     
                     <p>${el.teacherName}</p>
                     <div class="d-flex flex-row">
                     <p>${el.lessonTimeGap}</p>
                     <p class="ml-3">${el.auditoriumNumber}</p>
                     </div>
                     <hr/>
                  `;}
                }
        }
        if(html==''){
            html=`<div class="d-flex flex-row"><p>Занять не буде !</p><i class="ml-2 fas fa-smile-beam fa-2x"></i></div>`;
        }
        return {__html: html};

    }
  }
  //лоадим 7 днів з масиву
  function LoadDays(data,arr){
      return(
    arr.map(function(el) {
       //якщо наш елемент не дата, то робим пропуск для того щоб наші справжні дати були під 
       //потрібним днем тижня
        if(el>=200){
            return(<td></td>);
        }
        return(
        <td>
    <MDBDropdown>
    <MDBDropdownToggle  style={{width:'50px'}} caret color='primary'>{el}</MDBDropdownToggle>
    <MDBDropdownMenu><div className="m-2" >
        <div dangerouslySetInnerHTML={createMarkup(data,el)}></div>
        </div>
    </MDBDropdownMenu></MDBDropdown>
    </td>
    );
    }))
   
}
//лоадим день тижня для дати...
  function LoadTimetable(data){
      
    if(data[0]!=undefined||data===undefined){
      if(data[0].daysInMonth!=undefined){
          let numOfDay=0;
          switch (data[0].dayOfWeek) {
              case "Monday":
                  
                  break;
                case "Tuesday":
                    numOfDay+=1;
                    break;
                case "Wednessday":
                    numOfDay+=2;
                    break;
                    case "Thursday":
                    numOfDay+=3;
                    break;
                    case "Friday":
                    numOfDay+=4;
                    break;
                    case "Saturday":
                    numOfDay+=5;
                    break;
                    case "Sunday":
                    numOfDay+=6;
                    break;
              default:
                  break;
          }
          let arr=[];
          
          //фіктивна дата для розташування справжньої під своїм днем тижня
          for (let i = 1; i <= numOfDay; i++) {
              if(i==1)
              arr.push(200);
              else
              arr.push(200+i);
              
          }
          //запихуєм к-ст днів в цикл, щоб їх замапити
           for (let i = 1; i <= data[0].daysInMonth; i++) {
                arr.push(i);
                
            }
           //console.log(arr);
            
        return(
           
            
                arr.map(function(el) {
                    
                    if(el==200){
                        let array=[arr[0],arr[1],arr[2],
                        arr[3],arr[4],arr[5],arr[6]]; 
                        return (
               
                            <tr>
                                {LoadDays(data,array)}
                            </tr>
                            
                             );
                    }
                    
                    
                    else if(el==1&&numOfDay==0){
                        let array=[arr[0],arr[1],arr[2],
                        arr[3],arr[4],arr[5],arr[6]]; 
                        return (
               
                            <tr>
                                {LoadDays(data,array)}
                            </tr>
                            
                             );
                    }
                    
                    else if(el%7==0){
                        
                        let array=[];
                        for (let i = el; i < el+7; i++) {
                            
                          if(i==arr.length){
                              break;
                          }
                          array.push(arr[i]);
                            
                        }
                        if(array[0]!=undefined){
                        return (
               
                            <tr>
                                {LoadDays(data,array)}
                            </tr>
                            
                             );}
                    }
                    else if(numOfDay==5||numOfDay==6){
                        if(el==31){
                            
                            
                            if(numOfDay==6){
                                let array=[arr[arr.length-2],arr[arr.length-1]];
                                    return( <tr>
                                             {LoadDays(data,array)}
                                        </tr>);
                                                              
                            }
                            
                            
                            if(numOfDay==5){
                                let array=[31];
                                if(array[0]!=undefined){
                                    return (
                           
                                        <tr>
                                            {LoadDays(data,array)}
                                        </tr>
                                        
                                         );
                                }
                            }
                        }
                        if(numOfDay==6&&el==30){
                            if(el==30&&arr[arr.length-1]!=31){
                                
                            
                                let array=[arr[arr.length-1]];
                                    return( <tr>
                                             {LoadDays(data,array)}
                                        </tr>);
                            }                   
                        }
                            
            } 
          }))
      }
    }
    else{
        //якщо нема дати викидаємо кружечок який крутиться
        return(<div className='spinner-border text-primary' role='status'>
        <span className='sr-only'>Завантаження...</span>
      </div>)
    }
  }
  
class Timetable extends Component {

    
    
    state = {
        
        group: '32PR',
        date: '',        
      }
   
   
    componentDidMount = () => {
        //this.mouseEnter();
        
        const {date } = this.state;
        const{login} = this.props;
        const {id}= login.user;
        this.props.getTimetable({ id, date });

      }
      
   
render() {
    const {data} = this.props;
    


    return (
        <div>
       <Table responsive borderless className="mt-3 mr-3">
                  <thead>
                    <tr>
                      <th>ПН</th>
                      <th>ВТ</th>
                      <th>СР</th>
                      <th>ЧТ</th>
                      <th>ПТ</th>
                      <th>СБ</th>
                      <th>НД</th>
                    </tr>
                  </thead>
                  <tbody>
                    {LoadTimetable(data)}
                  </tbody>
                </Table>
        
      </div>
     
        )
    
    
    }
}
    

const mapStateToProps = state => {
    return {
        data: get(state,'timetable.list.data'), 
        login: get(state,'login'), 
    };
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
        getTimetable: filter => {
        dispatch(getListActions.getTimetable(filter));
      }
    }
  }
   
export default connect(mapStateToProps, mapDispatchToProps)(Timetable);

