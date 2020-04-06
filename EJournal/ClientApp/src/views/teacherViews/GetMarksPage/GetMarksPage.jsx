import React, { Component } from 'react';
import * as getListActions from './reducer';
import { connect } from 'react-redux';
import get from "lodash.get";
import { MDBDataTable } from 'mdbreact';
import{ ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap'; 
class GetMarks extends Component {

    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          dropdownOpen: new Array(19).fill(false),
          subject: ''
        };
      }
    
      toggle(i) {
        const newArray = this.state.dropdownOpen.map((element, index) => { return (index === i ? !element : false); });
        this.setState({
          dropdownOpen: newArray,
          subject:"math",
        });
      }

    // componentDidMount = () => {
    //     const { speciality } = this.state;
    //     this.props.getMarks({ speciality });
    //   }

    render() { 

        const {listMarks} = this.props;
        console.log("RENDER");
        return ( 
            <div>
                <ButtonDropdown className="mr-1" isOpen={this.state.dropdownOpen[4]} toggle={() => { this.toggle(4); }}>
                  <DropdownToggle caret color="info">
                    Subject
                  </DropdownToggle>
                  <DropdownMenu>
                  </DropdownMenu>
                </ButtonDropdown>
            <MDBDataTable
                striped
                bordered
                hover
                data={listMarks}/>
                </div>
         );
    }
}

const mapStateToProps = state => {
  console.log("mapStateto props");
    return {
        listMarks: get(state, 'list.data'), 
    };
  }
  
  const mapDispatchToProps = (dispatch) => {
    console.log("mapDispatch");
    return {
        getListActions: filter => {
        dispatch(getListActions.getMarks(filter));
      }
    }
  }
   
export default connect(mapStateToProps, mapDispatchToProps)( GetMarks );