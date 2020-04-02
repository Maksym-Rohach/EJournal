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
    if(data.timetable[0]!=undefined||data===undefined){
    return(
    data.timetable.map(function(el) {
        if(el.day==date){
           
            if(el.topic!=null){
            return(
                <div>
            <h3>{el.subjectName}</h3>
            <h4>{el.topic}</h4>
            <p>{el.teacherName}</p>
            
            <p>{el.lessonTimeGap}</p>
            <p>{el.auditoriumNumber}</p>
            
            <hr/>
            </div>
            );}
            
            
            else{
            return(
             <div>
            <h3>{el.subjectName}</h3>
            
            <p>{el.teacherName}</p>
            <p>{el.lessonTimeGap}</p>
            <p>{el.auditoriumNumber}</p>
            <hr/>
            </div>
         )}
        }
    })
       );
    }
    
  }
  const TimetableModal = (props) => {
    
      
        const { data,date } = props;
            const [modal, setModal] = React.useState(false);
        
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
                const toggle = () => {
                    if(countOfLessons!=0){
                    setModal(!modal)
                    }
                };   
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
                <MDBModal  color='primary' backdrop={true} isOpen={modal} toggle={toggle}>
                <MDBModalHeader  className="bg-primary" toggle={toggle}></MDBModalHeader>
                <MDBModalBody  color='primary'>
                  {createMarkup(data,date)}
                </MDBModalBody>
               
              </MDBModal>
              </div>
      </div>
    );
  
}

TimetableModal.propTypes = propTypes;

export default TimetableModal;