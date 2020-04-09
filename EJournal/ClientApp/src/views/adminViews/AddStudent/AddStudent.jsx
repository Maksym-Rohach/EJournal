import React, { Component } from 'react';
import * as getListActions from './reducer';
import {
  TextField,
  FormHelperText
} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import 'date-fns';
import DateFnsUtils from "@date-io/date-fns";
import deLocale from "date-fns/locale/uk";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import InputMask from 'react-input-mask';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import get from "lodash.get";

function LoadErrors(err){
  if(typeof err!='object'){
    return(
    <FormHelperText error>{err}</FormHelperText>
    )
  }
}
class addStudent extends Component {
  state = {
    result: {},
    errors: {},
    dateOfBirth: new Date(),
    name: '',
    lastName: '',
    surname: '',
    adress: '',
    email: '',
    phoneNumber: '',
    passportString: '',
    identificationCode: ''
  };


  handleDateChange = (date) => {
    if (!!this.state.errors['dateOfBirth']) {
      let errors = Object.assign({}, this.state.errors);
      delete errors['dateOfBirth'];
      this.setState(
        {
          dateOfBirth: date,
          errors
        }
      )
    }
    else {
      this.setState({ dateOfBirth: date });
    }
  };
  setStateByErrors = (name, value) => {
    if (!!this.state.errors[name]) {
      let errors = Object.assign({}, this.state.errors);
      delete errors[name];
      this.setState(
        {
          [name]: value,
          errors
        }
      )
    }
    else {
      this.setState(
        { [name]: value })
    }
  }

  handleChange = (e) => {
    this.setStateByErrors(e.target.name, e.target.value);

  }
  onSubmit = (e) => {
    e.preventDefault();
    let errors = {};
    const {name,surname,lastName,adress,email,phoneNumber,passportString,identificationCode,dateOfBirth}=this.state;
    function pad(s) { return (s < 10) ? '0' + s : s; }
    
    if(name==='')errors.name="Field is important";
    if(surname==='')errors.surname="Field is important";
    if(lastName==='')errors.lastName="Field is important";
    if(adress==='')errors.adress="Field is important";
    if(email==='')errors.email="Field is important";
    if(phoneNumber==='')errors.phoneNumber="Field is important";
    if(passportString==='')errors.passportString="Field is important";
    if(identificationCode==='')errors.identificationCode="Field is important";

    const isValid = Object.keys(errors).length === 0
    if (isValid) {
      const newDate = [pad(dateOfBirth.getDate()), pad(dateOfBirth.getMonth() + 1), dateOfBirth.getFullYear()].join('.');
      const rolename="Student";
      
      this.props.addStudent({
          name,
          lastName,
          surname,
          adress,
          email,
          phoneNumber,
          passportString,
          identificationCode,
          dateOfBirth:newDate,
          rolename,
          degree:''});     
    }
    else {
      this.setState({ errors });
    }
  }
  render() {
    const { result } = this.props;
    console.log("RENDER", result);
    const { errors } = this.state;

    return (
      <React.Fragment>
        <div>
          <Grid container spacing={3}>
            <Grid item lg={4} md={6} xs={12}>
              <TextField
                fullWidth
                label="Outlined"
                variant="outlined"
                label="Name"
                name="name"
                onChange={this.handleChange}
              />
              {/* <FormHelperText error>{error}</FormHelperText> */}
            </Grid>
            <Grid item lg={4} md={6} xs={12}>
              <TextField
                fullWidth
                label="Outlined"
                variant="outlined"
                label="Lastname"
                name="lastName"
                onChange={this.handleChange}
              />
              {/* <FormHelperText error>{error}</FormHelperText> */}
            </Grid>
            <Grid item lg={4} md={12} xs={12}>
              <TextField
                fullWidth
                label="Outlined"
                variant="outlined"
                label="Surname"
                name="surname"
                onChange={this.handleChange}
              />
              {/* <FormHelperText error>{error}</FormHelperText> */}
            </Grid>
          </Grid>
          <Grid justify="space-between" container spacing={3}>
            <Grid item lg={4} md={6} xs={12}>
              <TextField
                fullWidth
                label="Outlined"
                variant="outlined"
                label="Email"
                name="email"
                onChange={this.handleChange}
              />
              {/* <FormHelperText error>{error}</FormHelperText> */}
            </Grid>
            <Grid item lg={3} md={6} xs={12}>
              <InputMask
                mask="(+38)999 999 99 99"
                maskChar=" "
                onChange={this.handleChange}
              >
                {() =>
                  <TextField
                    fullWidth
                    label="Outlined"
                    variant="outlined"
                    label="Phone"
                    name="phoneNumber"
                  />
                }
              </InputMask>

              {/* <FormHelperText error>{error}</FormHelperText> */}
            </Grid>
            <Grid item lg={4} md={12} xs={12}>
              <TextField
                fullWidth
                label="Outlined"
                variant="outlined"
                label="Address"
                name="adress"
                onChange={this.handleChange}
              />
              {/* <FormHelperText error>{error}</FormHelperText> */}
            </Grid>
          </Grid>
          <Grid justify="space-between" container spacing={3}>
            <Grid item lg={4} md={6} xs={12}>
              <TextField
                fullWidth
                label="Outlined"
                variant="outlined"
                label="Identity code"
                name="identificationCode"
                onChange={this.handleChange}
              />
              {/* <FormHelperText error>{error}</FormHelperText> */}
            </Grid>
            <Grid item lg={3} md={6} xs={12}>
              <MuiPickersUtilsProvider utils={DateFnsUtils} locale={deLocale}>
                <KeyboardDatePicker
                  margin="normal"
                  label="Date of birthday"
                  format="dd/MM/yyyy"
                  value={this.state.dateOfBirth}
                  onChange={this.handleDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item lg={4} md={12} xs={12}>
              <TextField
                fullWidth
                label="Outlined"
                variant="outlined"
                label="Passport"
                name="passportString"
                onChange={this.handleChange}
              />
              {/* <FormHelperText error>{error}</FormHelperText> */}
            </Grid>
          </Grid>
          <Grid container spacing={3} direction="column" alignItems="flex-end">
            <Grid item xs>
              {LoadErrors(result)}
              <Button variant="outlined" color="primary" onClick={this.onSubmit}>
                Додати
              </Button>
            </Grid>
          </Grid>
        </div>

      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    result: get(state, 'addStudent.list.result')
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    addStudent: model => {
      dispatch(getListActions.addStudent(model));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(addStudent);