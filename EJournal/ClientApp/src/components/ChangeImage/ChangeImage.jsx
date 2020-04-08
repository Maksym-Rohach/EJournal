import React, { useState } from "react";
import * as getListActions from "./reducer";
import { connect } from "react-redux";
import get from "lodash.get";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import CropperPage from "../cropper/CropperPage";
import { serverUrl } from "../../config";
import Skeleton from "@material-ui/lab/Skeleton";
import {
  Card,
  CardActions,
  CardContent,
  Divider,
  CardHeader,
  IconButton,
  Tooltip,
} from "@material-ui/core";

import "./ChangeImageStyle.css";
class Password extends React.Component {
  state = {
    image: "",
    croppedImage: "",
    isLoading: false,
  };

  componentWillMount = () => {
    this.props.getImage();
  };

  triggerChildInput = () => {
    this.refs.cropperPage.handleClick();
  };

  getCroppedImage = (img) => {
    this.setState(
      {
        isLoading: true,
        croppedImage: img,
      },
      this.changeImage
    );
  };

  changeImage = () => {
    this.props.changeImage({ image: this.state.croppedImage });
  };

  render() {
    //const {errors,data}= this.props;
    const { data } = this.props;
    console.log(data);
    return (
      <Card className="mr-3 mb-3">
        <CardContent className="d-flex justify-content-center ">
          {data == "" ? (
            <Skeleton
            animation="wave"
            variant="circle"
            width={250}
            height={250}
            />
          ) : (
            <div>
              <img
                src={`${serverUrl}${data}?t=${new Date().getTime()}`}
                //src={data}
                className="image"
              />
            </div>
          )}
        </CardContent>
        <CardActions>
          <Tooltip title="Змінити зображення">
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
              onClick={this.triggerChildInput}
            >
              <PhotoCamera height={35} fontSize="large" />
            </IconButton>
          </Tooltip>
        </CardActions>

        <CropperPage
          ref="cropperPage"
          getCroppedImage={this.getCroppedImage}
          isHidden={true}
          isForAvatar={true}
        />
      </Card>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    errors: get(state, "changeImage.list.errors"),
    data: get(state, "changeImage.list.data"),
    login: get(state, "login"),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeImage: (filter) => {
      dispatch(getListActions.changeImage(filter));
    },
    getImage: () => {
      dispatch(getListActions.getImage());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Password);
