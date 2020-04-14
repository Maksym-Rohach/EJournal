import React from 'react';
import { connect } from 'react-redux';

import StudentCardList from './StudentCardList'

class StudentCardListContainer extends React.Component{
    render(){
        const classes = useStyles();
        return (
            <StudentCardList/>
        );
    }
}

const mapStateToProps = () => {
    return {};
}

const mapDispatchToProps = () => {
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentCardListContainer);