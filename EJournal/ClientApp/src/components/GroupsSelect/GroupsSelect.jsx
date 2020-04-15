import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import * as getListActions from './reducer';
import { connect } from 'react-redux';
import get from "lodash.get";

const styles = theme => ({
    accent: {
        color: '#009688'
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
})

class GroupsSelect extends React.Component {

    componentDidMount = () => {
        this.props.getGroupsSelect();
    }

    menuItem = () => {
        const { specialitiesList } = this.props;
        return (specialitiesList.map(function (el) {
            return (
                <MenuItem key = {el.id}>
                    {el.name}
                </MenuItem>
            );
        }))
    }

    render(){
        const { classes } = this.props;

        <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-helper-label">Age</InputLabel>
                <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={age}
                    onChange={handleChange}
                >
                    {this.menuItem()}
                </Select>
            <FormHelperText className={classes.accent}>Оберіть групу</FormHelperText>
        </FormControl>
    }
}

const mapStateToProps = state => {
    console.log(state)
    return {
        groupsList: get(state, 'groupsSelect.list.data')
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getGroupsSelect: (specialityId) => {
            dispatch(getListActions.getGroupsSelect(specialityId));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(GroupsSelect));