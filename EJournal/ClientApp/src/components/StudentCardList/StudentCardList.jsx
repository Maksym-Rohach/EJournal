import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import StudentCard from '../StudentCard/StudentCard'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  }
}));

export default class StudentCardList extends React.Component{
    render(){
        const classes = useStyles();
        return (
            <div className={classes.root}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={3}>
                    <StudentCard />
                </Grid>        
            </Grid>
            </div>
        );
    }
}
