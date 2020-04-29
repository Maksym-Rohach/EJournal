import React from 'react';
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
//import Image from 'material-ui-image';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {serverUrl} from '../../config';

const styles = theme => ({
  cardHeight: {
    color: '#009688',    
  },
  media: {
    height: '12rem',
  },
  minHeighr: {
    height: '22rem'
  }
})

class StudentCard extends React.Component {
  render(){
    const { student } = this.props;
    const { classes } = this.props;
    return (
        <Card className={classes.minHeighr}>
          <CardActionArea className={classes.minHeighr}>
            <CardMedia
              className={classes.media}
              image={`${serverUrl}UsersImages/250_${student.image}`}
              title="Contemplative Reptile"
            />
            {/* <Image
              onClick={() => console.log('onClick')}
              src=
              aspectRatio={(16/9)}
            /> */}
            <CardContent>
              <Typography gutterBottom variant="h6">
                {student.name} {student.lastName}
              </Typography>
              <Typography variant="body1" color="textSecondary" component="p">
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