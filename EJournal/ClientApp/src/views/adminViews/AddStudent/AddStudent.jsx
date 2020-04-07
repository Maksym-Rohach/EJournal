import React, { Component } from 'react';
import { MDBInput, MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel'; import * as getListActions from './reducer';
import { connect } from 'react-redux';
import get from "lodash.get";

class addStudent extends Component {
  state = {
    result: {},
    selectedValue: 'a'
  };
  handleChange = (event) => {
    const res = this.state.result;
    this.setState({ result: res, selectedValue: event.target.value });
  };
  render() {
    const { result } = this.props;
    console.log("RENDER", result);

    return (
      <React.Fragment>
        <FormControl component="fieldset">
          <FormLabel component="legend">Gender</FormLabel>
          <RadioGroup row aria-label="gender" name="gender1" value={this.state.selectedValue} onChange={this.handleChange}>
            <FormControlLabel value="female" control={<Radio />} label="Female" />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
        </FormControl>

        <MDBContainer className='mt-5'>

          <MDBRow>
            <MDBCol md='6'>
              <MDBInput
                label='Type your email'
                icon='envelope'
                group
                type='email'
                validate
                error='wrong'
                success='right'
              />
            </MDBCol>
            <MDBCol md='6'>
              <MDBInput label='Type your password' icon='lock' group type='password' validate />
            </MDBCol>
          </MDBRow>
        </MDBContainer>

      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    result: get(state, 'addStudent.list.result')
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    addStudent: model => {
      dispatch(getListActions.addStudent(model));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(addStudent);

// import React, { useState } from 'react';
// import { Collapse, Button, CardBody, Card } from 'reactstrap';

// const Example = (props) => {
//   const [isOpen, setIsOpen] = useState(true);
//   const [isOpen2, setIsOpen2] = useState(false);
//   const [isOpen3, setIsOpen3] = useState(false);

//   const toggle = () => {setIsOpen2(false);setIsOpen3(false);setIsOpen(!isOpen);};
//   const toggle2 = () => {setIsOpen(false);setIsOpen3(false);setIsOpen2(!isOpen2);};
//   const toggle3 = () => {setIsOpen(false);setIsOpen2(false);setIsOpen3(!isOpen3);};

//   return (
//     <div>
//       <Button color="primary" onClick={toggle} style={{ marginBottom: '1rem' }}>Toggle</Button>
//       <Button color="primary" onClick={toggle2} style={{ marginBottom: '1rem' }}>Toggle2     </Button>
//       <Button color="primary" onClick={toggle3} style={{ marginBottom: '1rem' }}>Toggle3     </Button>

//       <Collapse isOpen={isOpen}>
//         <Card>
//           <CardBody>
//           Anim pariatur cliche reprehenderit,
//            enim eiusmod high life accusamus terry richardson ad squid. Nihil
//            anim keffiyeh helvetica, craft beer labore wes anderson cred
//            nesciunt sapiente ea proident.
//           </CardBody>
//         </Card>
//       </Collapse>
//       <Collapse isOpen={isOpen2}>
//         <Card>
//           <CardBody>
//           Anim pariatur cliche reprehenderit,

//           </CardBody>
//         </Card>
//       </Collapse>
//       <Collapse isOpen={isOpen3}>
//         <Card>
//           <CardBody>
//           123

//           </CardBody>
//         </Card>
//       </Collapse>
//     </div>
//   );
// }

// export default Example;