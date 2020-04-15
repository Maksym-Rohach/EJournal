import React, { Component } from 'react';
import * as getListActions from './reducer';
import { connect } from 'react-redux';
import get from "lodash.get";


class GetGroups extends Component {
    
        state = {
            
        };


    componentDidMount = () => {
        const { groupId, specialityId, subjectId } = this.state;
        this.props.getMarks({ groupId, specialityId, subjectId });
    }
    
    render() {
        const { data } = this.props;
        console.log("RENDER", data);
        
        return (
            <React.Fragment>
                <Dropdown value={this.state.specialityId} options={specs} onChange={this.changeSpec} placeholder="Select a speciality" />
                
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        data: get(state, 'groups.list.data'),
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getGroups: filter => {
            dispatch(getListActions.getGroups(filter));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MarksTable);
