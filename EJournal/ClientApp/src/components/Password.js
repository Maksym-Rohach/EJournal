import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Button,
  TextField
} from '@material-ui/core';
const propTypes = {
  userId: PropTypes.string
};

class Password extends React.Component {
  state = {
    password: '',
    confirmPassword: ''          
  }
  render(){
  const {userId} = this.props;

  alert(userId);

  return (
    <Card className="mt-3">
      <form>
        <CardHeader
          subheader="Оновити пароль"
          title="Пароль"
        />
        <Divider />
        <CardContent>
          <TextField
            fullWidth
            label="Пароль"
            name="password"           
            type="password"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Підтвердіть пароль"
            name="confirm"
            style={{ marginTop: '1rem' }}
            type="password"
            variant="outlined"
          />
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            color="primary"
            variant="outlined"
          >
            Оновити
          </Button>
        </CardActions>
      </form>
    </Card>
  );
}
};

Password.propTypes = propTypes;
export default Password;
