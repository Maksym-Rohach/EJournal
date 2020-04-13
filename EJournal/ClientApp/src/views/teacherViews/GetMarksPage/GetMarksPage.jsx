import React, { Component } from 'react';
import * as getListActions from './reducer';
import { connect } from 'react-redux';
import get from "lodash.get";
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdbreact';
import{ ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap'; 
import {Dropdown} from 'primereact/dropdown';
class GetMarks extends Component {

    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          dropdownOpen: new Array(19).fill(false),
          subject: '',
          month: '',
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

        const {listMarks} = this.props;
        
        console.log("RENDER");
        return ( 
            <div>
                <select className="browser-default custom-select" color="info-color">
          <option>Оберіть предмет</option>
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
          <option value="3">Option 3</option>
        </select>

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
  console.log("mapStateto props");
    return {
        listMarks: get(state, 'list.data'), 
    };
  }
  
  const mapDispatchToProps = (dispatch) => {
    console.log("mapDispatch");
    return {
        getMarks: filter => {
        dispatch(getListActions.getMarks(filter));
      },
      getSubject:()=>{
        dispatch(getListActions.getSubject());
      }
    }
  }
   
export default connect(mapStateToProps, mapDispatchToProps)( GetMarks );