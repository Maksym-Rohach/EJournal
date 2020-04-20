import React from 'react';
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import teal from '@material-ui/core/colors/teal';
import {serverUrl} from '../../config';

const styles = theme => ({
  cardHeight: {
    color: '#009688'
  }
})

class StudentCard extends React.Component {
  render(){
    const { student } = this.props;
    const { classes } = this.props;
    return (
        <Card>
          <CardActionArea>
            <CardMedia
              image={`${serverUrl}UsersImages/250_${student.image}`}
              title="Contemplative Reptile"
            />
            <img src={`${serverUrl}UsersImages/250_${student.image}`}/>
            <CardContent>
              <Typography gutterBottom variant="h5">
                {student.name} {student.lastName}
              </Typography>
              <Typography variant="h6" color="textSecondary" component="p">
                Спеціальність: {student.speciality}   
              </Typography>
              <Typography className={classes.cardHeight} variant="subtitle2" color="textSecondary" component="p">
                Група: {student.groupName}   
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      );
  }
}
export default withStyles(styles)(StudentCard);