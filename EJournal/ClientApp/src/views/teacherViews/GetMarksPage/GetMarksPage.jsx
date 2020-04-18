import React, { Component } from 'react';
import * as getListActions from './reducer';
import * as getSubjectActions from './reducer';
import { connect } from 'react-redux';
import get from "lodash.get";
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdbreact';
import { Dropdown } from 'primereact/dropdown';
import{ ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap'; 
import './GetMarksService';
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

class GetMarks extends Component {
  state = {
    subject: '',
    marks:null
  }
    // constructor(props) {
    //     super(props);
    
    //     this.toggle = this.toggle.bind(this);
    //     this.state = {
    //       dropdownOpen: false,
    //       subject: '',
    //       marks:[]
    //     };
    //   }
    
    //   toggle(i) {
    //     const newArray = this.state.dropdownOpen.map((element, index) => { return (index === i ? !element : false); });
    //     this.setState({
    //       dropdownOpen: newArray,
    //       subject:"math",
    //     });
    //   }

  componentDidMount = () => {
    this.props.getSubject();
  }

  componentWillReceiveProps = () => {
    const{subject} = this.state;
    this.props.getMarks({subject});
  }

      // changeMonth=(e)=>{
      //   this.setState({month: e.value});
      // }

  render() { 
    const {listMarks, listSubject} = this.props;
    const {subject, marks} = this.state;
    console.log("ListSubject", listSubject);

    if(listSubject !== undefined){
      return ( 
        <React.Fragment>
          <InputLabel>Оберіть предмет:</InputLabel>
          <Select
            className="mr-3"
            style={{ minWidth: 150 }}
            value={listSubject}
            onChange={(e) => {
            this.setState({ subject: e.target.value, marks:null });
            }}
            // onChange={handleChange}
          >
            <MenuItem value={""}>Всі</MenuItem>
              {listSubject.map(function (el) {
                return <MenuItem value={el.id}>{el.name}</MenuItem>;
              })}
          </Select>
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
        </React.Fragment>
      );
    }
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