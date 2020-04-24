import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const SpecialitiesSelect = React.lazy(() => import('../../../components/SpecialitiesSelect'));
const StudentCardList = React.lazy(() => import('../../../components/StudentCardList'));
const GroupsSelect = React.lazy(() => import('../../../components/GroupsSelect/GroupsSelect'));

const styles = theme => ({
    cardHeight: {
      color: '#009688'
    },
    root: {
        flexGrow: 1,
    },
  })

class StudentsView extends React.Component {
    render(){        
        const { classes } = this.props;

        return(
            <React.Fragment>
                <div className={classes.root}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6} lg={3}>
                            <SpecialitiesSelect/>
                        </Grid>
                        <Grid item xs={12} md={6} lg={3}>
                            <GroupsSelect/>
                        </Grid>
                        <Grid item xs={12}>
                            <StudentCardList/>
                        </Grid>
                    </Grid>
                </div>
            </React.Fragment>
        );
    }
}
export default withStyles(styles)(StudentsView);
