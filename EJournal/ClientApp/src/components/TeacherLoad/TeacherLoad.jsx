import React from "react";
import * as getListActions from "./reducer";
import * as getGroupsListActions from './reducer';
import * as getSubjectsListActions from './reducer';
import { connect } from "react-redux";
import get from "lodash.get";
import {
    Card,
    CardHeader,
    // CardContent,
    // Divider,
    // TextField,
    // Grid
} from '@material-ui/core';
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';


class TeacherLoad extends React.Component {

    state = {
        groupId: 0,
        subjectId: 0
    }

    componentDidMount = () => {
        this.props.getGroups();
        // const { groupId } = this.state;
        // this.props.getSubjects({groupId});
    }

    changeGroup = (event) => {
        const groupId = event.target.value;
        this.setState({groupId:groupId});
        this.setState({ groupId: groupId });
      }

      changeSubject = (event) => {
        const subjectId = event.target.value;
        this.setState({ subjectId: subjectId });
      }

    render() {
        const {groups} = this.props;
        console.log('Groups', groups);
        return (
            <ExpansionPanel className="mt-3">
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Навантаження</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <InputLabel id="dlabel">Group</InputLabel>
                <Select
                  labelId="dlabel"
                  value={this.state.groupId}
                  onChange={this.changeGroup}
                >
                  {/* {
                    groups.map(item => {
                      return (
                      <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
                      )
                    })
                  } */}
                </Select>
                {/* <InputLabel id="dlabel">Subject</InputLabel>
                <Select
                  labelId="dlabel"
                  value={this.state.subjectId}
                  onChange={this.changeSubject}
                >
                  {
                    subjects.map(item => {
                      return (
                      <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
                      )
                    })
                  }
                </Select> */}
            </ExpansionPanelDetails>
            </ExpansionPanel>
        );
    }
}
const mapStateToProps = state => {
   console.log('MapState', state);
    return {
      data: get(state, "teacherload.list.data"),
      isLoading: get(state, "teacherload.list.loading"),
      groups: get(state, 'teacherload.list.groups'),
      subjects: get(state, 'teacherload.list.subjects')
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      getLoad: (filter) => {
        dispatch(getListActions.getLoad(filter));
      },
      getGroups: () => {
        dispatch(getGroupsListActions.getGroups());
      },
      getSubjects: (filter) => {
        dispatch(getSubjectsListActions.getSubjects(filter));
      }
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(TeacherLoad);
  //export default TeacherLoad;
