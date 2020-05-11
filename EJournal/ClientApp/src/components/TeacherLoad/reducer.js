import TeacherLoadService from './TeacherLoadService';
import update from '../../helpers/update';

export const TEACHERLOAD_STARTED = "TEACHERLOAD_STARTED";
export const TEACHERLOAD_SUCCESS = "TEACHERLOAD_SUCCESS";
export const TEACHERLOAD_FAILED = "TEACHERLOAD_FAILED";

export const GET_GROUPS_STARTED = "GET_GROUPS_STARTED";
export const GET_GROUPS_SUCCESS = "GET_GROUPS_SUCCESS";
export const GET_GROUPS_FAILED = "GET_GROUPS_FAILED";

export const GET_SUBJECTS_STARTED = "GET_SUBJECTS_STARTED";
export const GET_SUBJECTS_SUCCESS = "GET_SUBJECTS_SUCCESS";
export const GET_SUBJECTS_FAILED = "GET_SUBJECTS_FAILED";

const initialState = {
    list: {
        data: [],
        groups: [],
        subjects: [],
        loading: false,
        success: false,
        failed: false,
    },   
}

export const getLoad = () => {
    return (dispatch) => {
        dispatch(getListActions.started());
        TeacherLoadService.getProfile()
            .then((response) => {
                dispatch(getListActions.success(response));               
            }, err=> { throw err; })
            .catch(err=> {
              dispatch(getListActions.failed(err));
            });
    }
}
export const getGroups = () => {
    return (dispatch) => {
        dispatch(getGroupsListActions.started());
        TeacherLoadService.getGroups()
            .then((response) => {
                console.log("response", response);
                dispatch(getGroupsListActions.success(response));
            }, err => { throw err; })
            .catch(err => {
              //  console.log("err", err);
                dispatch(getGroupsListActions.failed(err));
            });
    }
}
export const getSubjects = (model) => {
    return (dispatch) => {
        dispatch(getSubjectsListActions.started(model));
        TeacherLoadService.getSubjects()
            .then((response) => {
                //console.log("response", response);
                dispatch(getSubjectsListActions.success(response));
            }, err => { throw err; })
            .catch(err => {
              //  console.log("err", err);
                dispatch(getSubjectsListActions.failed(err));
            });
    }
}
export const getListActions = {
    started: () => {
        return {
            type: TEACHERLOAD_STARTED
        }
    },  
    success: (data) => {
        return {
            type: TEACHERLOAD_SUCCESS,
            payload: data.data
        }
    },  
    failed: (error) => {
        return {           
            type: TEACHERLOAD_FAILED,
            errors: error
        }
    }
  }

  export const getGroupsListActions = {
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

export const getSubjectsListActions = {
    started: () => {
        return {
            type: GET_SUBJECTS_STARTED
        }
    },
    success: (data) => {
        return {
            type: GET_SUBJECTS_SUCCESS,
            payload: data.data
        }
    },
    failed: (error) => {
        return {
            type: GET_SUBJECTS_FAILED
        }
    }
}

export const teacherLoadReducer = (state = initialState, action) => { 
  let newState = state;

  switch (action.type) {

      case TEACHERLOAD_STARTED: {
          newState = update.set(state, 'list.loading', true);
          newState = update.set(newState, 'list.success', false);
          newState = update.set(newState, 'list.failed', false);
          break;
      }
      case TEACHERLOAD_SUCCESS: {
          newState = update.set(state, 'list.loading', false);
          newState = update.set(newState, 'list.failed', false);
          newState = update.set(newState, 'list.success', true);
          newState = update.set(newState, 'list.data', action.payload);         
          break;
      }
      case TEACHERLOAD_FAILED: {
          newState = update.set(state, 'list.loading', false);
          newState = update.set(newState, 'list.success', false);
          newState = update.set(newState, 'list.failed', true);
          newState = update.set(newState, "list.errors", action.errors);
          break;
      }
      case GET_GROUPS_STARTED: {
        newState = update.set(state, 'list.loading', true);
        newState = update.set(newState, 'list.success', false);
        newState = update.set(newState, 'list.failed', false);
        break;
    }
    case  GET_GROUPS_SUCCESS: {
        newState = update.set(state, 'list.loading', false);
        newState = update.set(newState, 'list.failed', false);
        newState = update.set(newState, 'list.success', true);
        newState = update.set(newState, 'list.groups', action.payload);         
        break;
    }
    case GET_GROUPS_FAILED: {
        newState = update.set(state, 'list.loading', false);
        newState = update.set(newState, 'list.success', false);
        newState = update.set(newState, 'list.failed', true);
        newState = update.set(newState, "list.errors", action.errors);
        break;
    }
      default: {
          return newState;
      }
  }
  return newState;
}