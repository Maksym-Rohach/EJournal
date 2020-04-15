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
        //if(studentList !== undefined)
        return (studentList.map(function (el) {
            return (
                <StudentCard key = {el.id} student={el} />
            );
        }))
    }

    render() {
        return (
            <div>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={3}>
                        {this.card()}
                    </Grid>
                </Grid>
            </div>
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