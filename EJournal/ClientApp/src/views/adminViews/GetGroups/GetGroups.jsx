import React, { Component } from 'react';
import * as getListActions from './reducer';
import * as getSpecialitiesListActions from './reducer';
import { connect } from 'react-redux';
import get from "lodash.get";
import { Dropdown } from 'primereact/dropdown';

class GetGroups extends Component {

    state = {
        specialityId: 0
    };


    componentWillMount = () => {
        this.props.getSpecialities();
        console.log(this.props.specialities);
    }
    changeSpec = (event) => {
        const specialityId=event.target.value;
        console.log(specialityId);
        this.setState({specialityId:specialityId});
        this.props.getGroups({specialityId:specialityId});
    }
    render() {
        const { data, specialities } = this.props;
        console.log("RENDER", data);

        return (
            <React.Fragment>
                <Dropdown value={this.state.specialityId} options={specialities} onChange={this.changeSpec} placeholder="Select a speciality" />

            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        data: get(state, 'getGroups.list.data'),
        specialities: get(state, 'getGroups.list.specialities')
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getGroups: filter => {
            dispatch(getListActions.getGroups(filter));
        },
        getSpecialities: () => {
            dispatch(getSpecialitiesListActions.getSpecialities());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GetGroups);
