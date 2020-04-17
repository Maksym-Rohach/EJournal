import React, { Component } from 'react';
import * as getListActions from './reducer';
import * as getSpecialitiesListActions from './reducer';
import { connect } from 'react-redux';
import get from "lodash.get";
import { Dropdown } from 'primereact/dropdown';
import Grid from '@material-ui/core/Grid';
import CardActionArea from '@material-ui/core/CardActionArea';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import PlusOneIcon from '@material-ui/icons/PlusOne';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

import './GetGroupsStyle.css';


class GetGroups extends Component {

    state = {
        specialityId: 0,
        openDialog: false
    };
    dialogClickOpen = () => {
        this.setState({ openDialog: true });
    }
    dialogClickClose = () => {
        this.setState({ openDialog: false });
    }
    mapCards(data) {
        if (data !== undefined) {
            return (
                data.map(item => {
                    return (
                        <Grid key={item.name} item lg={3} md={6} xs={12}>
                            <Card>
                                <CardActionArea>
                                    <CardContent>
                                        <Typography className="default-name" component="h2" variant="h2" >
                                            {item.name}
                                        </Typography>
                                        <Typography className="default-curator" component="h6" variant="h6">
                                            {item.nameOfCurator}
                                        </Typography>
                                        <Typography className="default-count" component="p" variant="p" >
                                            {item.countOfStudents} студентів
                                        </Typography>
                                        <Tooltip TransitionComponent={Zoom} title="Average marks" arrow>
                                            <Avatar className="badge">{item.averageMark}</Avatar>
                                        </Tooltip>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <Tooltip TransitionComponent={Zoom} title="Add student" arrow>
                                        <IconButton aria-label="add student">
                                            <PlusOneIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip TransitionComponent={Zoom} title="Edit info" arrow>
                                        <IconButton onClick={this.dialogClickOpen} aria-label="edit">
                                            <EditIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Dialog
                                        open={this.state.openDialog}
                                        onClose={this.dialogClickClose}
                                        aria-labelledby="responsive-dialog-title">
                                        <DialogTitle id="responsive-dialog-title">{"Use Google's location service?"}</DialogTitle>
                                        <DialogContent>
                                            <DialogContentText>
                                                Let Google help apps determine location. This means sending anonymous location data to
                                                Google, even when no apps are running.
                                                </DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button autoFocus onClick={this.dialogClickClose} color="primary">
                                                Disagree
                                                </Button>
                                            <Button onClick={this.dialogClickClose} color="primary" autoFocus>
                                                Agree
                                                </Button>
                                        </DialogActions>
                                    </Dialog>

                                    <Tooltip TransitionComponent={Zoom} title="Delete group" arrow>

                                        <IconButton aria-label="delete">
                                            <DeleteOutlineIcon />
                                        </IconButton>
                                    </Tooltip>
                                </CardActions>
                            </Card>
                        </Grid>
                    );
                })
            );
        }
    }

    componentWillMount = () => {
        this.props.getSpecialities();
        console.log(this.props.specialities);
    }
    changeSpec = (event) => {
        const specialityId = event.target.value;
        console.log(specialityId);
        this.setState({ specialityId: specialityId });
        this.props.getGroups({ specialityId: specialityId });
    }
    render() {
        const { data, specialities } = this.props;
        console.log("RENDER", data);

        return (
            <React.Fragment>
                <Dropdown className="mt-2" value={this.state.specialityId} options={specialities} onChange={this.changeSpec} placeholder="Select a speciality" />
                <Grid className="mt-3" container spacing={3}>
                    {this.mapCards(data)}
                </Grid>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        data: get(state, 'getGroups.list.data'),
        specialities: get(state, 'getGroups.list.specialities')
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getGroups: filter => {
            dispatch(getListActions.getGroups(filter));
        },
        getSpecialities: () => {
            dispatch(getSpecialitiesListActions.getSpecialities());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GetGroups);
