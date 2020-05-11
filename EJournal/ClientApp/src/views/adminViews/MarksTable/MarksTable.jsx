import React, { Component } from 'react';
import * as getListActions from './reducer';
import * as getSpecListActions from './reducer';
import * as getMarkTypeListActions from './reducer';
import * as getGroupListActions from './reducer';
import * as getLessonsListActions from './reducer';
import { connect } from 'react-redux';
import get from "lodash.get";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import CommonMarkInTable from "../../../components/CommonMarksInTable/CommonMarkInTable";
import Loader from "../../../components/Loader";

import './MarksTableStyle.css';

const ExpansionPanel = withStyles({
    root: {
        border: '1px solid rgba(0, 0, 0, .125)',
        boxShadow: 'none',
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            margin: 'auto',
        },
    },
    expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
    root: {
        backgroundColor: 'rgba(0, 0, 0, .03)',
        borderBottom: '1px solid rgba(0, 0, 0, .125)',
        marginBottom: -1,
        minHeight: 56,
        '&$expanded': {
            minHeight: 56,
        },
    },
    content: {
        '&$expanded': {
            margin: '12px 0',
        },
    },
    expanded: {},
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiExpansionPanelDetails);


class MarksTable extends Component {
    state = {
        groupId: 0,
        specialityId: 0,
        subjectId: 0,
        rowsPerPage: 8,
        page: 0,
        expanded: 1
    };

    groupSelectMap = () => {
        const { groups } = this.props;
        if (groups !== undefined) {
            return groups.map(item => {
                return (
                    <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
                )
            });
        }
    }
    specSelectMap = () => {
        const { specialities } = this.props;
        if (specialities !== undefined) {
            return specialities.map(item => {
                return (
                    <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
                )
            });
        }
    }
    subjSelectMap = () => {
        const { lessons } = this.props;
        if (lessons !== undefined) {
            return lessons.map(item => {
                return (
                    <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
                )
            });
        }
    }
    componentDidMount = () => {
        //const { groupId, specialityId, subjectId } = this.state;
        this.props.getSpecialities();
        this.props.getMarkTypes();
    }
    changeSpec = (event) => {
        const specialityId = event.target.value;
        this.setState({ specialityId: specialityId });
        this.props.getGroups({ specialityId });
    }
    changeGroup = (event) => {
        const groupId = event.target.value;
        this.setState({ groupId: groupId });
        this.props.getLessons({ groupId });
    }
    changeSubj = (event) => {
        const subjectId = event.target.value;
        const { groupId, expanded } = this.state;
        this.setState({ subjectId: subjectId });
        this.props.getMarks({ groupId, subjectId, markTypeId: expanded });
    }

    handleChangeExpansion = (panel) => (event, newExpanded) => {
        if (newExpanded) {
            const { groupId, subjectId } = this.state;
            if (groupId !== 0 && subjectId !== 0) {
                this.props.getMarks({ groupId, subjectId, markTypeId: panel });
            }
            this.setState({ expanded: panel });
        } else {
            this.setState({ expanded: false });
        }
    };


    render() {
        const { data, markTypes, loading } = this.props;
        //console.log("RENDER", data,markTypes);
        if (loading == false) {
            return (
                <React.Fragment>
                    {
                        markTypes.map(item => {
                            if (item.type === 'five-point') {
                                return (
                                    <ExpansionPanel key={item.id} square expanded={this.state.expanded === item.id} onChange={this.handleChangeExpansion(item.id)}>
                                        <ExpansionPanelSummary aria-controls="panel1d-content" id="panel1d-header">
                                            <Typography>{item.description}</Typography>
                                        </ExpansionPanelSummary>
                                        <ExpansionPanelDetails className="flexx" >
                                            <div>
                                                <FormControl className="dropW mx-2 mt-3">
                                                    <InputLabel id="slabel">Speciality</InputLabel>
                                                    <Select
                                                        labelId="slabel"
                                                        value={this.state.specialityId}
                                                        onChange={this.changeSpec}
                                                    >
                                                        {
                                                            this.specSelectMap()
                                                        }
                                                    </Select>
                                                </FormControl>
                                                <FormControl className="dropW mx-2 mt-3">
                                                    <InputLabel id="glabel">Griup</InputLabel>
                                                    <Select
                                                        labelId="glabel"
                                                        value={this.state.groupId}
                                                        onChange={this.changeGroup}
                                                    >
                                                        {
                                                            this.groupSelectMap()
                                                        }
                                                    </Select>
                                                </FormControl>
                                                <FormControl className="dropW mx-2 mt-3">
                                                    <InputLabel id="llabel">Lesson</InputLabel>
                                                    <Select
                                                        labelId="llabel"
                                                        value={this.state.subjectId}
                                                        onChange={this.changeSubj}
                                                    >
                                                        {
                                                            this.subjSelectMap()
                                                        }
                                                    </Select>
                                                </FormControl>
                                            </div>
                                            <CommonMarkInTable data={data} />
                                        </ExpansionPanelDetails>
                                    </ExpansionPanel>
                                )
                            }
                            else {
                                return (
                                    <ExpansionPanel key={item.id} square expanded={this.state.expanded === item.id} onChange={this.handleChangeExpansion(item.id)}>
                                        <ExpansionPanelSummary aria-controls="panel1d-content" id="panel1d-header">
                                            <Typography>{item.description}</Typography>
                                        </ExpansionPanelSummary>
                                        <ExpansionPanelDetails className="flexx" >
                                            <div>
                                                <FormControl className="dropW mx-2 mt-3">
                                                    <InputLabel id="slabel">Speciality</InputLabel>
                                                    <Select
                                                        labelId="slabel"
                                                        value={this.state.specialityId}
                                                        onChange={this.changeSpec}
                                                    >
                                                        {
                                                            this.specSelectMap()
                                                        }
                                                    </Select>
                                                </FormControl>
                                                <FormControl className="dropW mx-2 mt-3">
                                                    <InputLabel id="glabel">Griup</InputLabel>
                                                    <Select
                                                        labelId="glabel"
                                                        value={this.state.groupId}
                                                        onChange={this.changeGroup}
                                                    >
                                                        {
                                                            this.groupSelectMap()
                                                        }
                                                    </Select>
                                                </FormControl>
                                                <FormControl className="dropW mx-2 mt-3">
                                                    <InputLabel id="llabel">Lesson</InputLabel>
                                                    <Select
                                                        labelId="llabel"
                                                        value={this.state.subjectId}
                                                        onChange={this.changeSubj}
                                                    >
                                                        {
                                                            this.subjSelectMap()
                                                        }
                                                    </Select>
                                                </FormControl>
                                            </div>
                                            {/* another component */}
                                            <CommonMarkInTable data={data} />
                                        </ExpansionPanelDetails>
                                    </ExpansionPanel>
                                )
                            }
                        })
                    }

                </React.Fragment>
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
        data: get(state, 'marks.list.data'),
        specialities: get(state, 'marks.list.specialities'),
        groups: get(state, 'marks.list.groups'),
        lessons: get(state, 'marks.list.lessons'),
        markTypes: get(state, 'marks.list.markTypes'),
        loading: get(state, 'marks.list.loading'),
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getMarks: filter => {
            dispatch(getListActions.getMarks(filter));
        },
        getSpecialities: () => {
            dispatch(getSpecListActions.getSpecialities());
        },
        getMarkTypes: () => {
            dispatch(getMarkTypeListActions.getMarkTypes());
        },
        getGroups: filter => {
            dispatch(getGroupListActions.getGroups(filter));
        },
        getLessons: filter => {
            dispatch(getLessonsListActions.getLessons(filter));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MarksTable);
