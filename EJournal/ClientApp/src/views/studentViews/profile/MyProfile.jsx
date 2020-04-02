import React from 'react';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
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

import Profile from "../../../components/Profile/Profile.jsx";
import Password from "../../../components/ChangePassword/Password.jsx";

class MyProfile extends React.Component {


    state={
        phone: ""
    }
render() {
    return (
       <div>
    <Grid
    className="mt-4"
      container
      
    >
      <Grid
        item
        
        lg={4}
        md={6}
        xl={4}
        xs={12}
      >
        <Card
         className="mr-3"
        >
          <CardContent>
            <div >
             
              <Avatar
              
                
                src='https://mdbootstrap.com/img/Photos/Avatars/avatar-2.jpg'
              />
            </div>
            
          </CardContent>
          <Divider />
          <CardActions>
            <Button
              color="primary"
              variant="text"
            >
              Оновити зображення
            </Button>
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
    <Profile></Profile>
    <Password></Password>
    </Grid>
    </Grid>
  </div>
      );
    }
}
// const mapStateToProps = state => {
//     return {
//         //data: get(state,'timetable.list.data'), 
//         login: get(state,'login'), 
//     };
//   }
  
//   const mapDispatchToProps = (dispatch) => {
//     return {
//         // getTimetable: filter => {
//         // dispatch(getListActions.getTimetable(filter));
//       }
//     }

//}
   
export default MyProfile;