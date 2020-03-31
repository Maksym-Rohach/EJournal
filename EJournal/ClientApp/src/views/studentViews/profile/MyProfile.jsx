import React from 'react';
import clsx from 'clsx';
import moment from 'moment';

import { connect } from 'react-redux';
import get from "lodash.get";
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Typography,
  Divider,
  Button,
  LinearProgress,
  CardHeader,
  Grid,
  TextField
} from '@material-ui/core';

import Password from "../../../components/Password";

class MyProfile extends React.Component {


render() {
    const{login} = this.props;
    const {id}= login.user;
    return (
       <div>
    <Grid style={{overflow: "hidden"}}
    className="mt-4"
      container
      spacing={4}
    >
      <Grid
        item
        lg={4}
        md={6}
        xl={4}
        xs={12}
      >
        <Card
         
        >
          <CardContent>
            <div >
              <div>
                <Typography
                  gutterBottom
                  variant="h2"
                >
                  John Doe
                </Typography>
                <Typography
                  
                  color="textSecondary"
                  variant="body1"
                >
                  москва, украъна
                </Typography>
                <Typography
                  
                  color="textSecondary"
                  variant="body1"
                >
                  
                </Typography>
              </div>
              <Avatar
                
                src='https://mdbootstrap.com/img/Photos/Avatars/avatar-2.jpg'
              />
            </div>
            <div >
              <Typography variant="body1">Profile Completeness: 70%</Typography>
              <LinearProgress
                value={70}
                variant="determinate"
              />
            </div>
          </CardContent>
          <Divider />
          <CardActions>
            <Button
              color="primary"
              variant="text"
            >
              Upload picture
            </Button>
            <Button variant="text">Remove picture</Button>
          </CardActions>
        </Card>
        
      </Grid>
      <Grid
        item
        lg={8}
        md={6}
        xl={8}
        xs={12}
      >
          <Card>
       <form
        autoComplete="off"
        noValidate
      >
        <CardHeader
          subheader="The information can be edited"
          title="Profile"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Please specify the first name"
                label="First name"
                margin="dense"
                name="firstName"
                
                required
                
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Last name"
                margin="dense"
                name="lastName"
               
                required
               
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Email Address"
                margin="dense"
                name="email"
              
                required
               
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Phone Number"
                margin="dense"
                name="phone"
               
                type="number"
               
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Select State"
                margin="dense"
                name="state"
               
                required
                select
                // eslint-disable-next-line react/jsx-sort-props
              
                variant="outlined"
              >
                
              </TextField>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Country"
                margin="dense"
                name="country"
               
                required
                
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            color="primary"
            variant="contained"
          >
            Save details
          </Button>
        </CardActions>
      </form>
    </Card>
    <Password userId={id} className="mt-4"></Password>
    </Grid>
    </Grid>
  </div>
      );
    }
}
const mapStateToProps = state => {
    return {
        //data: get(state,'timetable.list.data'), 
        login: get(state,'login'), 
    };
  }
  
//   const mapDispatchToProps = (dispatch) => {
//     return {
//         // getTimetable: filter => {
//         // dispatch(getListActions.getTimetable(filter));
//       }
//     }

//}
   
export default connect(mapStateToProps)(MyProfile);