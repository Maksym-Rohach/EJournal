import React from 'react';
import ChangeImage from '../../../components/ChangeImage'
const SpecialitiesSelect = React.lazy(() => import('../../../components/SpecialitiesSelect'));
const StudentCardList = React.lazy(() => import('../../../components/StudentCardList'));

class StudentsView extends React.Component {
    
    render(){        
        return(
            <React.Fragment>
                <SpecialitiesSelect/>
                <StudentCardList/>
                <ChangeImage/>
            </React.Fragment>
        );
    }
}

export default StudentsView;
