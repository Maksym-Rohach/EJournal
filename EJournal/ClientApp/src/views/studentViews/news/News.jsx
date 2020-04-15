import React, { useState } from "react";
import * as getListActions from "./reducer";
import { connect } from "react-redux";
import get from "lodash.get";
import { Grid } from "@material-ui/core";

import NewsModal from "../../../components/news/NewsModal";
class News extends React.Component {
  componentDidMount() {
    this.props.getData();
  }
  load = () => {
    const { data } = this.props;
    if (data.news != undefined) {
      return (
        <Grid className="mt-3" container justify="right" spacing={2}>
          {data.news.map(function (el) {
            return (
              <Grid lg={4} md={6} xl={3} xs={12} item>
                <NewsModal key={el.id} el={el} />
              </Grid>
            );
          })}
        </Grid>
      );
    }
  };
  render() {
    //const {data}= this.props;
    //console.log(data);
    return <div>{this.load()}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    data: get(state, "news.list.data"),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getData: () => {
      dispatch(getListActions.getNews());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(News);
//export default News;
