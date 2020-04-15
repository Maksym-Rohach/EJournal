import React from 'react';
import Grid from '@material-ui/core/Grid';
import * as getListActions from './reducer';
import { connect } from 'react-redux';
import get from "lodash.get";
import StudentCard from '../StudentCard/StudentCard'


export class StudentCardList extends React.Component {
    state = {}

    componentDidMount = () => {
        this.props.getStudentListCard();
    }
    
    card = () => {
        const { studentList } = this.props;
        return (studentList.map(function (el) {
            return (
                <Grid item xs={3} lg={3}>
                    <StudentCard key = {el.id} student={el} />
                </Grid>
            );
        }))
    }

    render() {
        return (
            <Grid container spacing={2}>
                {this.card()}
            </Grid>
        );
    }
}

const mapStateToProps = state => {
    console.log(state)
    return {
        studentList: get(state, 'studentCardList.list.data')
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getStudentListCard: () => {
            dispatch(getListActions.getStudentListCard());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentCardList);