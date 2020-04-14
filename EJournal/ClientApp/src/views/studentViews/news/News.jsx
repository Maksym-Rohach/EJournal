import React, { useState } from "react";
//import * as getListActions from "./reducer";
import { connect } from "react-redux";
import get from "lodash.get";
import {
  Grid,
} from "@material-ui/core";


import NewsModal from '../../../components/news/NewsModal'
class News extends React.Component {
  componentDidMount() {

    //this.props.getData();
  }

  render() {
    return(
        <Grid className="mt-3" container justify="right" spacing={2}>
                <Grid lg={4} md={6} xl={3} xs={12} item>
                  <NewsModal />
                </Grid>
                <Grid lg={4} md={6} xl={3} xs={12} item>
                  <NewsModal />
                </Grid>
                <Grid lg={4} md={6} xl={3} xs={12} item>
                  <NewsModal />
                </Grid>
                <Grid lg={4} md={6} xl={3} xs={12} item>
                  <NewsModal />
                </Grid>
        </Grid>
    );
    }
  }

// const mapStateToProps = (state) => {
//   return {
//     errors: get(state, "homework.list.errors"),
//     data: get(state, "homework.list.data"),
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     getData: (filter) => {
//       dispatch(getListActions.getData(filter));
//     },
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(News);
export default News;