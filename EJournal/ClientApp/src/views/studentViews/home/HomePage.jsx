import React, { useState } from "react";
import * as getListActions from "./reducer";
import { connect } from "react-redux";
import FaceIcon from "@material-ui/icons/Face";
import AssessmentIcon from "@material-ui/icons/Assessment";
import SchoolIcon from "@material-ui/icons/School";
import ScheduleIcon from "@material-ui/icons/Schedule";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import {Pie,Line} from 'react-chartjs-2';
import get from "lodash.get";
import Skeleton from "@material-ui/lab/Skeleton";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Button,
  Link,
  Grid,
} from "@material-ui/core";

import "./HomePageStyle.css";

function LoadTimetable(data, date) {
  if (data.timetable != undefined || date != undefined) {
    return data.timetable.map(function (el) {
      if (el.day == date) {
        if (el.topic != null) {
          return (
            <div>
              <h3>{el.subjectName}</h3>
              <h4>{el.topic}</h4>
              <p>{el.teacherName}</p>

              <p>{el.lessonTimeGap}</p>
              <p>{el.auditoriumNumber}</p>

              <hr />
            </div>
          );
        } else {
          return (
            <div>
              <h3>{el.subjectName}</h3>

              <p>{el.teacherName}</p>
              <p>{el.lessonTimeGap}</p>
              <p>{el.auditoriumNumber}</p>
              <hr />
            </div>
          );
        }
      }
    });
  } else {
    return (
      <div>
        <Skeleton animation="wave" height={15} width="15%" />
        <Skeleton animation="wave" height={10} width="25%" />
        <Skeleton animation="wave" height={10} width="25%" />
        <Skeleton animation="wave" height={10} width="20%" />
        <hr />
      </div>
    );
  }
}
function LoadMarks(data) {
  if (data.marks != undefined) {
    return data.marks.map(function (el) {
      if (el.value != 0) {
        return (
          <div className="mt-1">
            <div className="d-flex flex-row">
              <div className="mark text-center mr-4">{el.value}</div>
              <h2>{el.subject}</h2>
            </div>
            <p className="text-muted">{el.date}</p>
            <Divider></Divider>
          </div>
        );
      }
    });
  }
}
class HomePage extends React.Component {
  componentDidMount() {
    this.props.getData();
  }
  render() {
    const { data } = this.props;
    const months=['Січень','Лютий','Березень','Квітень','Травень','Червень','Липень','Серпень','Вересень','Жовтень','Листопад','Грудень'];
    const pie = {
      labels: [
        'Пропущено %',
        'Відвідано %',
      ],
      datasets: [
        {
          data: [data.countOfDays,100-data.countOfDays],
          backgroundColor: [
            '#FF6384',
            '#FFCE56',
          ],
          hoverBackgroundColor: [
            '#FF6384',
            '#FFCE56',
          ],
        }],
    };
    const line = {
      labels: [months[data.month-3], months[data.month]-3, months[data.month-3], months[data.month-3], months[data.month-2], months[data.month-1]],
      datasets: [
        {
          label: 'Середня оцінка',
          fill: false,
          lineTension: 0.1,
          backgroundColor: '#FFCE56',
          borderColor: '#FFCE56',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          
          data: [data.averageMark1, data.averageMark2, data.averageMark3, data.averageMark4, data.averageMark5, data.averageMark6],
        },
      ],
    };
    const options = {
      tooltips: {
        enabled: false,
        custom: CustomTooltips
      },
      maintainAspectRatio: false
    }
    //console.log(data);
    return (
      <Grid className="mt-4" container>
        <Grid item lg={6} md={6} xl={6} xs={12}>
          <Card className=" mr-3">
            <form>
              <CardHeader
                avatar={<AssessmentIcon></AssessmentIcon>}
                title="Середня оцінка"
              />
              
              <CardContent>
                {data.averageMark1 == null ? (
                  <Skeleton
                    animation="wave"
                    height={248}
                    width="100%"
                    style={{ marginBottom: 6 }}
                  />
                ) : (
                  <div className="chart-wrapper">
                <Line data={line} options={options} />
              </div>
                )}
              </CardContent>
            </form>
          </Card>
          <Card className="mt-3 mr-3">
            <form>
              <CardHeader
                avatar={<FaceIcon></FaceIcon>}
                title="Відвідуваність"
              />
             
              <CardContent>
                {data.countOfDays == null ? (
                  <div className="d-flex justify-content-center align-items-center text-center">
                    <div className="d-flex flex-column">

                    
                  <Skeleton
                    animation="wave"
                    height={15}
                    width="100%"
                    style={{ marginBottom: 2 }}
                  />
                  <Skeleton
                          animation="wave"
                          variant="circle"
                          width={200}
                          height={200}
                        />
                        </div>
                        </div>
                ) : (           
                  <div className="chart-wrapper">
                  <Pie data={pie} />
                  </div>
                  
                )}
              </CardContent>
            </form>
          </Card>
          
        </Grid>
        <Grid item lg={6} md={6} xl={6} xs={12}>
          <Card className="mt-3  mr-3" className="max-height">
            <form>
              <CardHeader
                avatar={<SchoolIcon></SchoolIcon>}
                subheader="Нещодавні оцінки"
                title="Оцінки"
              />
              
              <CardContent>
                {data.marks == null ? (
                  <div>
                    <div className="mt-1">
                      <div className="d-flex flex-row">
                        <Skeleton
                          animation="wave"
                          variant="circle"
                          width={40}
                          height={40}
                        />
                        <Skeleton animation="wave" height={15} width="25%" />
                      </div>
                      <Skeleton
                        animation="wave"
                        height={10}
                        width="8%"
                        className="mt-1"
                      />
                      <Divider></Divider>
                    </div>
                    <div className="mt-1">
                      <div className="d-flex flex-row">
                        <Skeleton
                          animation="wave"
                          variant="circle"
                          width={40}
                          height={40}
                        />
                        <Skeleton animation="wave" height={15} width="25%" />
                      </div>
                      <Skeleton
                        className="mt-1"
                        animation="wave"
                        height={10}
                        width="8%"
                      />
                      <Divider></Divider>
                    </div>
                  </div>
                ) : (
                  LoadMarks(data)
                )}
              </CardContent>

              <CardActions>
                <div className="d-flex flex-column">
                  <Link href="/#/student/marks">
                    <Button size="small" color="primary">
                      Більше інформації
                    </Button>
                  </Link>
                </div>
              </CardActions>
            </form>
          </Card>
          <Card className="mt-3 mr-3">
            <CardHeader
              avatar={<ScheduleIcon></ScheduleIcon>}
              title="Розклад"
              subheader="Розклад на сьогодні"
            />
            
            <CardContent>{LoadTimetable(data, data.day)}</CardContent>
            <CardActions>
              <div className="d-flex flex-column">
                <Link href="/#/student/timetable">
                  <Button size="small" color="primary">
                    Більше інформації
                  </Button>
                </Link>
              </div>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    errors: get(state, "studentHome.list.errors"),
    data: get(state, "studentHome.list.data"),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getData: (filter) => {
      dispatch(getListActions.getData(filter));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
