import React, { Component } from 'react';
import * as getListActions from './reducer';
import { connect } from 'react-redux';
import get from "lodash.get";
import Loader from "../Loader";
import {
    Grid,
    Typography,
    Chip,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Growl } from 'primereact/growl';
import { TabView, TabPanel } from 'primereact/tabview';

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: "#e3f0fd",
        },
    },
}))(TableRow);

const StyledTableBodyCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 16,
    },
}))(TableCell);

const StyledTableHeadCell = withStyles((theme) => ({
    head: {
        backgroundColor: '#311b92',
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 16,
    },
}))(TableCell);

class StudentExams extends Component {
    state = {

    }
    mapBodyTable = (data) => {
        let counter = 1;

        if (data.marks !== undefined) {
            return data.marks.map(item => {
                return (
                    <StyledTableRow key={counter}>
                        <StyledTableBodyCell style={{ fontWeight: "bold" }} align="left" component="th" scope="row">{counter++}</StyledTableBodyCell>
                        <StyledTableBodyCell align="left" >{item.subject}</StyledTableBodyCell>
                        <StyledTableBodyCell align="center" >
                            <Chip label={item.mark} style={{ fontWeight: "bold" }} color="primary" />
                        </StyledTableBodyCell>
                        <StyledTableBodyCell align="left" >{item.teacherName}</StyledTableBodyCell>
                        <StyledTableBodyCell align="right" >{item.dateOfProvide}</StyledTableBodyCell>
                    </StyledTableRow>
                )
            });
        }
    }


    componentWillMount = () => {
        const paramGr = this.props.match.params.studentId;
        if (paramGr !== undefined) {
            let temp = paramGr.split('=').splice(1, 1).toString();
            if (temp !== "null") {
                this.props.getStudentExams({ studentId: temp });
            } else
                this.growl.show({ life: 6000, severity: 'error', summary: 'Error', detail: 'Invalid student data' });

        }
    }
    render() {
        const { exams, loading } = this.props;
        //console.log("RENDER", data,markTypes);
        if (loading == false) {
            if (exams !== [])
                return (
                    <React.Fragment>
                        <Growl className="mt-5" ref={(el) => this.growl = el} />
                        <Grid className="mt-3">
                            <Typography variant="h5" gutterBottom>
                                {
                                    exams.studentName
                                }
                                <Chip className="ml-3" label={exams.groupName} style={{ fontWeight: "bold" }} color="secondary" variant="outlined" />
                            </Typography>
                            <Paper>
                                <TabView className="mx-3 py-3">
                                    {
                                        (exams.models!==undefined)?
                                        exams.models.map(item => {
                                            if(item.marks!==undefined&&item.marks!==null)
                                            return (
                                                <TabPanel header={item.yearOfMarks}>
                                                    <TableContainer className="mt-3" component={Paper}>
                                                        <Table aria-label="customized table">
                                                            <TableHead>
                                                                <TableRow>
                                                                    <StyledTableHeadCell align="left">№</StyledTableHeadCell>
                                                                    <StyledTableHeadCell align="left">Предмет</StyledTableHeadCell>
                                                                    <StyledTableHeadCell align="center">Оцінка</StyledTableHeadCell>
                                                                    <StyledTableHeadCell align="left">Викладач</StyledTableHeadCell>
                                                                    <StyledTableHeadCell className="pr-4" align="right">Дата</StyledTableHeadCell>
                                                                </TableRow>
                                                            </TableHead>
                                                            <TableBody>
                                                                {this.mapBodyTable(item)}
                                                            </TableBody>
                                                        </Table>
                                                    </TableContainer>
                                                </TabPanel>
                                            );
                                            else return (
                                                <Typography style={{ color: "#d50000" }} variant="h1" gutterBottom>
                                                    Даних поки що немає
                                                </Typography>
                                            ); 
                                        })
                                        :<div></div>
                                    }
                                </TabView>
                            </Paper>
                        </Grid>
                    </React.Fragment>
                );
            else return (
                <Typography style={{ color: "#d50000" }} variant="h1" gutterBottom>
                    Помилка. Такого студента не існує
                </Typography>
            );
        } else {
            return (
                <Loader />
            );
        }
    }
}

const mapStateToProps = state => {
    return {
        exams: get(state, 'studentExams.list.exams'),
        loading: get(state, 'studentExams.list.loading'),
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getStudentExams: filter => {
            dispatch(getListActions.getStudentExams(filter));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentExams);
