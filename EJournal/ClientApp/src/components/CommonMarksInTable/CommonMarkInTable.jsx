import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import TablePagination from '@material-ui/core/TablePagination';
import PropTypes from "prop-types";
import { Badge } from 'reactstrap';

const propTypes = {
    data: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object
    ])
};
class MarkInTable extends Component {
    state = {
        rowsPerPage: 8,
        page: 0,
    };
    mapBodyTable = (data) => {
        let counter = 1;
        let countermark = 1;
        //const{page,rowsPerPage}=this.state;
        //console.log("body " + data.rows);
        const StyledTableCell = withStyles((theme) => ({
            head: {
                backgroundColor: theme.palette.common.black,
                color: theme.palette.common.white,
            },
            body: {
                fontSize: 14,
            },
        }))(TableCell);

        const StyledTableRow = withStyles((theme) => ({
            root: {
                '&:nth-of-type(odd)': {
                    backgroundColor: theme.palette.background.default,
                },
            },
        }))(TableRow);

        if (data.rows != undefined) {
            return data.rows.map(item => {

                return (
                    <StyledTableRow key={counter}>
                        <StyledTableCell component="th" scope="row">{counter++}</StyledTableCell>
                        <StyledTableCell >{item.name}</StyledTableCell>
                        {
                            //.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            item.marks.map(mark => {
                                let colorBadge;
                                if (+mark >= 10)
                                    colorBadge = "success";
                                else if (+mark >= 6 && +mark < 10)
                                    colorBadge = "warning";
                                else if (+mark > 0 && +mark < 6)
                                    colorBadge = "danger";
                                else {
                                    colorBadge = "none";
                                    mark = " ";
                                }
                                return (
                                    <StyledTableCell key={countermark++} align="right"><Badge className="mr-3 px-3 py-2" color={colorBadge}>{mark}</Badge></StyledTableCell>
                                )
                            })
                        }
                    </StyledTableRow>
                )
            });
        }
    }

    mapHeadTable = (data) => {
        //console.log("head " + data.columns);
        const StyledTableCell = withStyles((theme) => ({
            head: {
                backgroundColor: '#311b92',
                color: theme.palette.common.white,
            },
            body: {
                fontSize: 14,
            },
        }))(TableCell);

        let counter = 1;
        if (data.columns != undefined) {
            return data.columns.map(function (item) {
                let al = "";
                if (counter > 2) {
                    al = "right";
                } else {
                    al = "left"
                }
                return (
                    <StyledTableCell key={counter++} align={al}>{item}</StyledTableCell>
                );
            });
        }
    }

    handleChangePage = (event, newPage) => {
        this.setState({ page: newPage });
    };


    render() {
        const { children, data, ...attributes } = this.props;
        //console.log("RENDER", data);
        
        return (
            <React.Fragment>
                <TableContainer className="mt-3" component={Paper}>
                    <Table aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                {this.mapHeadTable(data)}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.mapBodyTable(data)}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    hidden={(data.columns !== undefined) ? false : true}
                    rowsPerPageOptions={[8]}
                    component="div"
                    count={(data.columns !== undefined) ? data.columns.length - 2 : 0}
                    rowsPerPage={this.state.rowsPerPage}
                    page={this.state.page}
                    onChangePage={this.handleChangePage}
                />
            </React.Fragment>
        );
    }
}
MarkInTable.propTypes = propTypes;

export default MarkInTable;
