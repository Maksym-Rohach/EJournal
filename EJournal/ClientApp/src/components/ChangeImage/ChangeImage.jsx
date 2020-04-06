import React, { useState } from 'react';
import * as getListActions from './reducer';
import { connect } from 'react-redux';
import get from "lodash.get";
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import {serverUrl} from "../../config";
import {
  Card,
  CardActions,
  CardContent,
  Divider,
  IconButton
} from "@material-ui/core";
class Password extends React.Component {
  state = {
    image: '',    
  }
 
  render(){
    //const {errors,data}= this.props;
    const {login}= this.props;
      return (
        <Card className="mr-3 mb-3">
        <CardContent>
          <div>
            <img
              src={`${serverUrl}StudentsImage/100_${login.user.image}`}
            />
          </div>
        </CardContent>
        <Divider />
        <CardActions>
          {/* <Button
        color="primary"
        variant="text"
      >
        Оновити зображення
      </Button> */}
          <input
            accept="image/*"
            id="icon-button-file"
            type="file"
            style={{display: "none"}}
          />
          <label htmlFor="icon-button-file">
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <PhotoCamera />
            </IconButton>
          </label>
        </CardActions>
      </Card>
      );
    
  
}
};
const mapStateToProps = state => {
  return {
    errors: get(state, 'changeImage.list.errors'),
    data: get(state, 'changeImage.list.data'),
    login: get(state, "login")
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
      changeImage: filter => {
        dispatch(getListActions.changeImage(filter));
    }
  }
}
 
export default connect(mapStateToProps,mapDispatchToProps)(Password);

