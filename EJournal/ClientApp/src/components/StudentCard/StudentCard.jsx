import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

export default class StudentCard extends React.Component {

  render(){
    const { student } = this.props;
    return (
        <Card>
          <CardActionArea>
            <CardMedia
              image="/static/images/cards/contemplative-reptile.jpg"
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {student.name}                 
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      );
  }
}
