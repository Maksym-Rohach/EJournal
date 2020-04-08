import React, { Component } from 'react';
import * as getListActions from './reducer';
import { connect } from 'react-redux';
import get from "lodash.get";
import { MDBDataTable } from 'mdbreact';
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
        const monthSelectItems = [
          {label: 'Січень', value: '01'},
          {label: 'Лютий', value: '02'},
          {label: 'Березень', value: '03'},
          {label: 'Квітень', value: '04'},
          {label: 'Травень', value: '05'},
          {label: 'Червень', value: '06'},
          {label: 'Липень', value: '07'},
          {label: 'Серпень', value: '08'},
          {label: 'Вересень', value: '09'},
          {label: 'Жовтень', value: '10'},
          {label: 'Листопад', value: '11'},
          {label: 'Грудень', value: '12'},
      ];
        console.log("RENDER");
        return ( 
            <div>
                {/* <ButtonDropdown className="mr-1" isOpen={this.state.dropdownOpen[4]} toggle={() => { this.toggle(4); }}>
                  <DropdownToggle caret color="info">
                    Предмет
                  </DropdownToggle>
                  <DropdownMenu>
                  </DropdownMenu>
                </ButtonDropdown> */}

                <ButtonDropdown className="mr-1" isOpen={this.state.dropdownOpen[4]} toggle={() => { this.toggle(4); }}>
                  <DropdownToggle caret color="info">
                    Місяць
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem>Січень</DropdownItem>
                    <DropdownItem>Лютий</DropdownItem>
                    <DropdownItem>Березень</DropdownItem>
                    <DropdownItem>Квітень</DropdownItem>
                    <DropdownItem>Травень</DropdownItem>
                    <DropdownItem>Червень</DropdownItem>
                    <DropdownItem>Вересень</DropdownItem>
                    <DropdownItem>Жовтень</DropdownItem>
                    <DropdownItem>Листопад</DropdownItem>
                    <DropdownItem>Грудень</DropdownItem>
                  </DropdownMenu>
                </ButtonDropdown>

          <Dropdown value={this.state.month} className="mt-3 ml-1" options={monthSelectItems}
           onChange={(e)=>this.changeMonth(e)} placeholder="Оберіть місяць"/>

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
        getMarks: filter => {
        dispatch(getListActions.getMarks(filter));
      },
      getSubject:()=>{
        dispatch(getListActions.getSubject());
      }
    }
  }
   
export default connect(mapStateToProps, mapDispatchToProps)( GetMarks );