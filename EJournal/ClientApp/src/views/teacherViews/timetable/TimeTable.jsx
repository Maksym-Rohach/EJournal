import React from 'react';
import * as getListActions from './reducer';
import { connect } from 'react-redux';
import get from "lodash.get";
import { MDBTable, MDBTableBody, MDBTableHead, MDBCard, MDBCardBody, MDBCardHeader } from 'mdbreact';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import Typography from "@material-ui/core/Typography";

function FirstDayOfWeek(DateObject, firstDayOfWeekIndex) {
    let dateObject;
    if (typeof (DateObject) === "string") {
        let dateParts = DateObject.split(".");
        dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
    }
    else if (typeof (DateObject) !== "string") {
        dateObject = DateObject;
    }
    const dayOfWeek = dateObject.getDay(),
        firstDayOfWeek = new Date(dateObject),
        diff = dayOfWeek >= firstDayOfWeekIndex ?
            dayOfWeek - firstDayOfWeekIndex :
            6 - dayOfWeek

    firstDayOfWeek.setDate(dateObject.getDate() - diff)
    firstDayOfWeek.setHours(0, 0, 0, 0)
    return firstDayOfWeek;
}

function pad(s) { return (s < 10) ? '0' + s : s; };

function LoadTimetable(teacherTimetable) {
    let row1 = [];
    console.log('DDDDDDDDDDDD', teacherTimetable);

    if (teacherTimetable != undefined || teacherTimetable.lesson1 != undefined || teacherTimetable.lesson2 != undefined || teacherTimetable.lesson3 != undefined || teacherTimetable.lesson4 != undefined) {
 
        row1 = teacherTimetable.lesson1;
        // for(let i = 0; i < 7; i++){
        //     console.log('i', row1[i])
        // }
        // for (let i = 0; i <= 4; i++) {
        //     for (let j = 0; j <= 7; j++) {
                //console.log('SSSSS', teacherTimetable[i].lesson1[j]);
                // if (teacherTimetable[i].lesson1[j].dayOfWeek == 'Mondey') {
                //     row1.push(teacherTimetable[i].lesson1[j]);
                // }
                // else if (teacherTimetable[i].lesson1[j].dayOfWeek == 'Tuesday') {
                //     row1.push(teacherTimetable[i].lesson1[j]);
                // }
                // else if (teacherTimetable[i].lesson1[j].dayOfWeek == 'Wednesday') {
                //     row1.push(teacherTimetable[i].lesson1[j]);
                // }
                // else if (teacherTimetable[i].lesson1[j].dayOfWeek == 'Thursday') {
                //     row1.push(teacherTimetable[i].lesson1[j]);
                // }
                // else if (teacherTimetable[i].lesson1[j].dayOfWeek == 'Friday') {
                //     row1.push(teacherTimetable[i].lesson1[j]);
                // }
                // else if (teacherTimetable[i].lesson1[j].dayOfWeek == 'Saturday') {
                //     row1.push(teacherTimetable[i].lesson1[j]);
                // }
                // else if (teacherTimetable[i].lesson1[j].dayOfWeek == 'Sunday') {
                //     row1.push(teacherTimetable[i].lesson1[j]);
                // }
        //     }
        // }
    }
    //console.log(row1);
}

class Timetable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dateFrom: '',
            dateTo: '',
            today: '',
        }
    }
    componentDidMount = () => {
        const { dateFrom, dateTo } = this.state;
        Date.prototype.addDays = function (days) {
            let date = new Date(this.valueOf());
            date.setDate(date.getDate() + days);
            return date;
        }
        let firstDayOfWeek = FirstDayOfWeek(new Date(), 1);
        let today = new Date();
        let res1 = [pad(firstDayOfWeek.getDate()), pad(firstDayOfWeek.getMonth() + 1), firstDayOfWeek.getFullYear()].join('.');
        let res2 = [pad(firstDayOfWeek.addDays(6).getDate()), pad(firstDayOfWeek.getMonth() + 1), firstDayOfWeek.getFullYear()].join('.');
        let res3 = [pad(today.getDate()), pad(today.getMonth() + 1), today.getFullYear()].join('.');
        if (this.state.dateFrom != res1 || this.state.dateTo != res2 || this.state.today != res3) {
            this.setState({ dateFrom: res1, dateTo: res2, today: res3 });
        }
        this.props.getLessons({ dateFrom: res1, dateTo: res2 });
    }

    next = () => {
        Date.prototype.addDays = function (days) {
            let date = new Date(this.valueOf());
            date.setDate(date.getDate() + days);
            return date;
        }

        let firstDayOfWeek = FirstDayOfWeek(this.state.dateFrom, 1);

        let nextFirstDayOfWeek_ = firstDayOfWeek.addDays(7);
        let nextLastDayOfWeek_ = firstDayOfWeek.addDays(13);

        let nextFirstDayOfWeek = [pad(nextFirstDayOfWeek_.getDate()), pad(nextFirstDayOfWeek_.getMonth() + 1), nextFirstDayOfWeek_.getFullYear()].join('.');
        let nextLastDayOfWeek = [pad(nextLastDayOfWeek_.getDate()), pad(nextLastDayOfWeek_.getMonth() + 1), nextLastDayOfWeek_.getFullYear()].join('.');

        this.setState({ dateFrom: nextFirstDayOfWeek, dateTo: nextLastDayOfWeek });
    }
    prev = () => {
        Date.prototype.addDays = function (days) {
            let date = new Date(this.valueOf());
            date.setDate(date.getDate() + days);
            return date;
        }

        let firstDayOfWeek = FirstDayOfWeek(this.state.dateFrom, 1);

        let prevFirstDayOfWeek_ = firstDayOfWeek.addDays(-7);
        let prevLastDayOfWeek_ = firstDayOfWeek.addDays(-1);

        let prevFirstDayOfWeek = [pad(prevFirstDayOfWeek_.getDate()), pad(prevFirstDayOfWeek_.getMonth() + 1), prevFirstDayOfWeek_.getFullYear()].join('.');
        let prevLastDayOfWeek = [pad(prevLastDayOfWeek_.getDate()), pad(prevLastDayOfWeek_.getMonth() + 1), prevLastDayOfWeek_.getFullYear()].join('.');

        this.setState({ dateFrom: prevFirstDayOfWeek, dateTo: prevLastDayOfWeek });
    }
    render() {
        const { dateFrom, dateTo, today } = this.state;
        const { teacherTimetable } = this.props;
        return (
            <MDBCard>
                <MDBCardHeader className="d-flex flex-row justify-content-between">
                    <Typography variant="h6" className="ml-2 mr-2" gutterBottom>
                        Сьогодні : {today}
                    </Typography>
                    <div className="d-flex flex-row justify-content-center">
                        <KeyboardArrowLeft className="hover-cursor" fontSize="large" onClick={this.prev} />
                        <Typography variant="h6" className="ml-2 mr-2" gutterBottom>
                            {dateFrom}
                        </Typography>
                        <Typography variant="h6" className="ml-2 mr-2" >-</Typography>
                        <Typography variant="h6" className="ml-2 mr-2" gutterBottom>
                            {dateTo}
                        </Typography>
                        <KeyboardArrowRight className="hover-cursor" fontSize="large" onClick={this.next} />
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
                            {LoadTimetable(teacherTimetable)}
                        </MDBTableBody>
                    </MDBTable>
                </MDBCardBody>
            </MDBCard>
        )
    }
}
const mapStateToProps = state => {
    console.log('mapStateToProps', state);
    return {
        teacherTimetable: get(state, 'teacherTimetable.list.data'),
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getLessons: filter => {
            dispatch(getListActions.getLessons(filter));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Timetable);



/* <tr>
            <td>1</td>
            <td>
         return teacherTimetable.lesson1.map(function (el) {
            <MDBCard>
            <MDBCardHeader>
            <Typography variant="h6" className="ml-2 mr-2" gutterBottom>
                    {el.lessonTimeGap}
                </Typography>
            </MDBCardHeader>
            <MDBCardBody>
            <Typography variant="h6" className="ml-2 mr-2" gutterBottom>
                    {el.subjectName}
                </Typography>
                <Typography variant="h6" className="ml-2 mr-2" gutterBottom>
                    {el.groupName}
                </Typography>
                <Typography variant="h6" className="ml-2 mr-2" gutterBottom>
                    {el.auditoriumNumber}
                </Typography>
            </MDBCardBody>
        </MDBCard>
        }
        });
        </td>
        </tr>*/