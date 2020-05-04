import React from 'react';
import * as getListActions from './reducer';
import { connect } from 'react-redux';
import get from "lodash.get";
import { MDBTable, MDBTableBody, MDBTableHead, MDBCard, MDBCardBody, MDBCardHeader, MDBRow, MDBCol } from 'mdbreact';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import Typography from "@material-ui/core/Typography";
import "./style.css";

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

function ComplideRow(tmprow, lessonNumber) {
    let week = [0, 1, 2, 3, 4, 5, 6];
    let resRow = [{}, {}, {}, {}, {}, {}, {}];

    for (let i = 0; i < week.length; i++) {
        tmprow.forEach(les => {
            if (les.dayOfWeek === week[i] && les.lessonNumber == lessonNumber) {
                resRow[week[i]] = les;
            }
        });
    }

    return resRow;
}

function LoadTimetable(data) {

    let tmprow1_ = [], tmprow2_ = [], tmprow3_ = [], tmprow4_ = [];
    if (data.timetable != undefined) {

        data.timetable.forEach(element => {
            if (element.lessonNumber == 1) {
                tmprow1_.push(element);
            }
            else if (element.lessonNumber == 2) {
                tmprow2_.push(element);
            }
            else if (element.lessonNumber == 3) {
                tmprow3_.push(element);
            }
            else if (element.lessonNumber == 4) {
                tmprow4_.push(element);
            }
        });

        let emtyLesson = {
            lessonNumber: '',
            lessonDate: '',
            lessonTimeGap: '',
            auditoriumNumber: '',
            subjectName: '',
            groupName: ''
        }

        let row1 = [emtyLesson, emtyLesson, emtyLesson, emtyLesson, emtyLesson, emtyLesson, emtyLesson];
        let row2 = [{ emtyLesson }, { emtyLesson }, { emtyLesson }, { emtyLesson }, { emtyLesson }, { emtyLesson }, { emtyLesson }];
        let row3 = [{ emtyLesson }, { emtyLesson }, { emtyLesson }, { emtyLesson }, { emtyLesson }, { emtyLesson }, { emtyLesson }];
        let row4 = [{ emtyLesson }, { emtyLesson }, { emtyLesson }, { emtyLesson }, { emtyLesson }, { emtyLesson }, { emtyLesson }];

        row1 = ComplideRow(tmprow1_, 1);
        row2 = ComplideRow(tmprow2_, 2);
        row3 = ComplideRow(tmprow3_, 3);
        row4 = ComplideRow(tmprow4_, 4);

        console.log('row1', row1);

        let rows = [row1, row2, row3, row4];
        let lessonNumbers = [1, 2, 3, 4];
        let counter = 1;

        return rows.map(function (row) {
            for (let i = 0; i <= lessonNumbers.length; i++) {
                return (
                    <tr>
                        <td>{counter++}</td>
                        {
                            row.map(function (el) {
                                return (
                                    <td>
                                        <MDBCard className = 'lesson'>      
                                            <MDBCardBody>
                                                <Typography style={{ textAlign: "center" }} variant="h6" gutterBottom>
                                                    {el.lessonTimeGap}
                                                </Typography>
                                                <Typography style={{ textAlign: "center" }} variant="h6" gutterBottom>
                                                    {el.subjectName}
                                                </Typography>
                                                <Typography style={{ textAlign: "center" }} variant="h6" gutterBottom>
                                                    {el.groupName}
                                                </Typography>
                                                <Typography style={{ textAlign: "center" }} variant="h6" gutterBottom>
                                                    {el.auditoriumNumber}
                                                </Typography>
                                            </MDBCardBody>
                                        </MDBCard>
                                    </td>
                                );
                            })
                        }
                    </tr>
                );
            }
        })
    }
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
        let res2_ = firstDayOfWeek.addDays(6);
        let res1 = [pad(firstDayOfWeek.getDate()), pad(firstDayOfWeek.getMonth() + 1), firstDayOfWeek.getFullYear()].join('.');
        let res2 = [pad(res2_.getDate()), pad(res2_.getMonth() + 1), res2_.getFullYear()].join('.');
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

        this.props.getLessons({ dateFrom: nextFirstDayOfWeek, dateTo: nextLastDayOfWeek });
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

        this.props.getLessons({ dateFrom: prevFirstDayOfWeek, dateTo: prevLastDayOfWeek });
    }
    render() {
        const { dateFrom, dateTo, today } = this.state;
        const { data } = this.props;
        console.log('data', data);
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
                    <MDBRow className='py-3'>
                        <MDBCol md='12'>
                            <MDBTable>
                                <MDBTableHead color="primary-color" textWhite>
                                    <tr>
                                        <th style={{ textAlign: "center" }}>#</th>
                                        <th style={{ textAlign: "center" }}>ПН</th>
                                        <th style={{ textAlign: "center" }}>ВТ</th>
                                        <th style={{ textAlign: "center" }}>СР</th>
                                        <th style={{ textAlign: "center" }}>ЧТ</th>
                                        <th style={{ textAlign: "center" }}>ПТ</th>
                                        <th style={{ textAlign: "center" }}>СБ</th>
                                        <th style={{ textAlign: "center" }}>НД</th>
                                    </tr>
                                </MDBTableHead>
                                <MDBTableBody>
                                    {LoadTimetable(data)}
                                </MDBTableBody>
                            </MDBTable>
                        </MDBCol>
                    </MDBRow>
                </MDBCardBody>
            </MDBCard>
        )
    }
}
const mapStateToProps = state => {
    console.log('mapStateToProps', state);
    return {
        data: get(state, 'teacherTimetable.list.data'),
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