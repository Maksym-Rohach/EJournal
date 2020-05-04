import React, { useState } from "react";
import * as getListActions from "./reducer";
import { connect } from "react-redux";
import get from "lodash.get";
import LoadDistributionExpand from "../../../components/loadDistribution/LoadDistributionExpand";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
class LoadDistribution extends React.Component {
  state = {
    group: "",
    speciality: "0",
  };
  componentDidMount() {
    this.props.getGroups();
  }

  render() {
    const { groups } = this.props;
    const { speciality } = this.state;
    const handleChange = (event) => {
      this.setState({speciality:event.target.value});
    };
    //console.log(groups);
    if (groups != null) {
      return (
        <React.Fragment>
          <div className="mt-3">
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={speciality}
              onChange={handleChange}
              className="mb-4"
              style={{minWidth:"150px"}}
            >
              <MenuItem value={0}>Всі</MenuItem>
              
            </Select>
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
