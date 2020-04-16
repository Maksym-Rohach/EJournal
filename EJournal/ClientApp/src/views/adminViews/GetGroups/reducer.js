import GetGroupsService from './GetGroupsService';
import update from '../../../helpers/update';
export const GET_GROUPS_STARTED = "GET_GROUPS_STARTED";
export const GET_GROUPS_SUCCESS = "GET_GROUPS_SUCCESS";
export const GET_GROUPS_FAILED = "GET_GROUPS_FAILED";

export const GET_SPECIALITIES_STARTED = "GET_SPECIALITIES_STARTED";
export const GET_SPECIALITIES_SUCCESS = "GET_SPECIALITIES_SUCCESS";
export const GET_SPECIALITIES_FAILED = "GET_SPECIALITIES_FAILED";

const initialState = {
    list: {
        data: [],
        specialities: [],
        loading: false,
        success: false,
        failed: false,
    },
}

export const getGroups = (model) => {
    return (dispatch) => {
        dispatch(getListActions.started());
        GetGroupsService.getGroups(model)
            .then((response) => {
                console.log("response", response);
                dispatch(getListActions.success(response));
            }, err => { throw err; })
            .catch(err => {
                console.log("err", err);
                dispatch(getListActions.failed(err));
            });
    }
}
export const getSpecialities = () => {
    return (dispatch) => {
        dispatch(getSpecialitiesListActions.started());
        GetGroupsService.getSpecialities()
            .then((response) => {
                console.log("response", response);
                dispatch(getSpecialitiesListActions.success(response));
            }, err => { throw err; })
            .catch(err => {
                console.log("err", err);
                dispatch(getSpecialitiesListActions.failed(err));
            });
    }
}

export const getListActions = {
    started: () => {
        return {
            type: GET_GROUPS_STARTED
        }
    },
    success: (data) => {
        return {
            type: GET_GROUPS_SUCCESS,
            payload: data.data
        }
    },
    failed: (error) => {
        return {
            type: GET_GROUPS_FAILED
        }
    }
}
export const getSpecialitiesListActions = {
    started: () => {
        return {
            type: GET_SPECIALITIES_STARTED
        }
    },
    success: (data) => {
        return {
            type: GET_SPECIALITIES_SUCCESS,
            specPayload: data.data
        }
    },
    failed: (error) => {
        return {
            type: GET_SPECIALITIES_FAILED
        }
    }
}

export const getGroupsReducer = (state = initialState, action) => {
    let newState = state;

    switch (action.type) {
        case GET_SPECIALITIES_STARTED: {
            newState = update.set(state, 'list.loading', true);
            newState = update.set(newState, 'list.success', false);
            newState = update.set(newState, 'list.failed', false);
            break;
        }
        case GET_SPECIALITIES_SUCCESS: {
            newState = update.set(state, 'list.loading', false);
            newState = update.set(newState, 'list.failed', false);
            newState = update.set(newState, 'list.success', true);
            newState = update.set(newState, 'list.specialities', action.specPayload);
            break;
        }
        case GET_SPECIALITIES_FAILED: {
            newState = update.set(state, 'list.loading', false);
            newState = update.set(newState, 'list.success', false);
            newState = update.set(newState, 'list.failed', true);
            break;
        }

        case GET_GROUPS_STARTED: {
            newState = update.set(state, 'list.loading', true);
            newState = update.set(newState, 'list.success', false);
            newState = update.set(newState, 'list.failed', false);
            break;
        }
        case GET_GROUPS_SUCCESS: {
            newState = update.set(state, 'list.loading', false);
            newState = update.set(newState, 'list.failed', false);
            newState = update.set(newState, 'list.success', true);
            newState = update.set(newState, 'list.data', action.payload);
            break;
        }
        case GET_GROUPS_FAILED: {
            newState = update.set(state, 'list.loading', false);
            newState = update.set(newState, 'list.success', false);
            newState = update.set(newState, 'list.failed', true);
            break;
        }
        default: {
            return newState;
        }
    }
    return newState;
}