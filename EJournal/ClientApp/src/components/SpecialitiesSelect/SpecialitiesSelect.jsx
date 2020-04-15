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

class SpecialitiesSelect extends React.Component {

    componentDidMount = () => {
        this.props.getSpecialitiesSelect();
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
        return(
            <React.Fragment>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-helper-label">Спеціальність</InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"                    
                        >
                            {this.menuItem()}
                        </Select>
                    <FormHelperText className={classes.accent}>Оберіть спеціальність</FormHelperText>
                </FormControl>
            </React.Fragment>
        );
        
    }
}

const mapStateToProps = state => {
    console.log(state)
    return {
        specialitiesList: get(state, 'specialitiesSelect.list.data')
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getSpecialitiesSelect: () => {
            dispatch(getListActions.getSpecialitiesSelect());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SpecialitiesSelect));