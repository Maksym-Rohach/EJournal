import React, { Component  } from 'react';
import PropTypes from 'prop-types';
import {
    MDBModal,
    MDBModalBody,
    MDBModalHeader,   
  } from 'mdbreact';
  import { Card, CardBody } from 'reactstrap';
import "./timetableModal.css";
const propTypes = {
  data: PropTypes.any,
  date: PropTypes.any,
};

function createMarkup(data,date) {
    
  
    let html='';
    if(data.timetable[0]!=undefined||data===undefined){
        
        
        for (let i = 0; i < data.timetable.length; i++) {
            const el = data.timetable[i];
            if(el.day==date){
                     if(el.topic!=null){
                     html+=`
                     
                     <h3>${el.subjectName}</h3>
                     <h4>${el.topic}</h4>
                     <p>${el.teacherName}</p>
                     
                     <p>${el.lessonTimeGap}</p>
                     <p>${el.auditoriumNumber}</p>
                     
                     <hr/>
                  `;}else{
                  html+=`
                     <h3>${el.subjectName}</h3>
                     
                     <p>${el.teacherName}</p>
                     <p>${el.lessonTimeGap}</p>
                     <p>${el.auditoriumNumber}</p>
                     <hr/>
                  `;}
                }
        }
        
        
    }
    if(html==''){
        html=`<div class="d-flex flex-row"><p>Занять не буде !</p><i class="ml-2 fas fa-smile-beam fa-2x"></i></div>`;
    }
    return {__html: html};
  }
  const TimetableModal = (props) => {
    
      
        const { data,date } = props;
            const [modal, setModal] = React.useState(false);
        
            const toggle = () => setModal(!modal);   
            let classes="hover-cursor text-white bg-info";
            let countOfLessons=0;
            if(data.timetable[0]!=undefined||data===undefined){
            for (let i = 0; i < data.timetable.length; i++) {
                const el = data.timetable[i];
                if(el!=undefined){
                if(el.day==date){
                    countOfLessons++;
                    }}
            }
            }
            if(countOfLessons==0){
                classes="hover-cursor text-white bg-secondary";
            }
    return (
    <div>
       
        <div>
                <Card className={classes} onClick={toggle}>
                <CardBody>
                  <div className="h1 text-muted text-right mb-2">
                    <i className="icon-calendar"></i>
                  </div>
                    <div className="text-start h4 mb-0">{date}</div>
    <small className="text-muted text-uppercase font-weight-bold">К-СТЬ ПАР: {countOfLessons}</small>
                </CardBody>
              </Card>
                <MDBModal backdrop={true} isOpen={modal} toggle={toggle}>
                <MDBModalHeader toggle={toggle}></MDBModalHeader>
                <MDBModalBody>
                  <div className="text-start" dangerouslySetInnerHTML={createMarkup(data,date)}></div>  
                </MDBModalBody>
               
              </MDBModal>
              </div>
      </div>
    );
  
}

TimetableModal.propTypes = propTypes;

export default TimetableModal;