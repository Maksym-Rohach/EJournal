import React, { Component } from 'react';
import * as getListActions from './reducer';
import * as getSubjectActions from './reducer';
import { connect } from 'react-redux';
import get from "lodash.get";
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdbreact';
import{ ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap'; 
import {Dropdown} from 'primereact/dropdown';
import './GetMarksService';

class GetMarks extends Component {

    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          dropdownOpen: false,
          subject: '',
        };
      }
    
      toggle(i) {
        const newArray = this.state.dropdownOpen.map((element, index) => { return (index === i ? !element : false); });
        this.setState({
          dropdownOpen: newArray,
          subject:"math",
        });
      }

    componentDidMount = () => {
        this.props.getSubject();
      }

      changeMonth=(e)=>{
        this.setState({month: e.value});
      }

    render() { 

        const {listMarks, listSubject} = this.props;
        console.log("RENDER");
        return ( 
            <div>
              <div className="div-select">
                <select className="browser-default custom-select"
                 options={listSubject}>
        </select>
        </div>

<MDBTable>
      <MDBTableHead color="info-color" textWhite>
        <tr>
          <th>#</th>
          <th>First</th>
          <th>Last</th>
          <th>Handle</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <td>3</td>
          <td>Larry</td>
          <td>the Bird</td>
          <td>@twitter</td>
        </tr>
      </MDBTableBody>
    </MDBTable>
                </div>
         );
    }
}

const mapStateToProps = state => {
  console.log("mapStateto props", state);
    return {
        listMarks: get(state, 'getSubject.list.marks'),
        listSubject: get(state, 'getSubject.list.subject') 
    };
  }
  
  const mapDispatchToProps = (dispatch) => {
    console.log("mapDispatch");
    return {
        getMarks: filter => {
        dispatch(getListActions.getMarks(filter));
      },
      getSubject:()=>{
        dispatch(getSubjectActions.getSubject());
      }
    }
  }
   
export default connect(mapStateToProps, mapDispatchToProps)( GetMarks );