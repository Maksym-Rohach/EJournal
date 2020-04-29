import React, { useState } from "react";
import * as getListActions from "./reducer";
import { connect } from "react-redux";
import get from "lodash.get";
import LoadDistributionExpand from "../../../components/loadDistribution/LoadDistributionExpand";
class LoadDistribution extends React.Component {
  state = {
    group: "",
  };
  componentDidMount() {
    this.props.getGroups();
  }

  render() {
    const { groups } = this.props;

    //console.log(groups);
    if (groups != null) {
      return (
        <React.Fragment>
          <div className="mt-3">
            <LoadDistributionExpand groups={groups} />
          </div>
        </React.Fragment>
      );
    } else {
      return (
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Завантаження...</span>
        </div>
      );
    }
  }
}
const mapStateToProps = (state) => {
  return {
    groups: get(state, "loadDistribution.list.groups"),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGroups: () => {
      dispatch(getListActions.getGroups());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoadDistribution);
