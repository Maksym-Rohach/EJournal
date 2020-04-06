import TeachersTableService from './TeachersTableService';
import update from '../../../helpers/update';
export const TEACHERS_TABLE_STARTED = "TEACHERS_TABLE_STARTED";
export const TEACHERS_TABLE_SUCCESS = "TEACHERS_TABLE_SUCCESS";
export const TEACHERS_TABLE_FAILED = "TEACHERS_TABLE_FAILED";


const initialState = {
    list: {
        data: [],
        loading: false,
        success: false,
        failed: false,
    },   
}

export const getTeachers = (model) => {
    return (dispatch) => {
        dispatch(getListActions.started());
        TeachersTableService.getTeachers(model)
            .then((response) => {
                console.log("response", response);
                dispatch(getListActions.success(response));               
            }, err=> { throw err; })
            .catch(err=> {
              dispatch(getListActions.failed(err));
            });
    }
}

export const getListActions = {
    started: () => {
        return {
            type: TEACHERS_TABLE_STARTED
        }
    },  
    success: (data) => {
        return {
            type: TEACHERS_TABLE_SUCCESS,
            payload: data.data
        }
    },  
    failed: (error) => {
        return {           
            type: TEACHERS_TABLE_FAILED,
            errors: error
        }
    }
  }

export const teachersTableReducer = (state = initialState, action) => { 
  let newState = state;

  switch (action.type) {

      case TEACHERS_TABLE_STARTED: {
          newState = update.set(state, 'list.loading', true);
          newState = update.set(newState, 'list.success', false);
          newState = update.set(newState, 'list.failed', false);
          break;
      }
      case TEACHERS_TABLE_SUCCESS: {
          newState = update.set(state, 'list.loading', false);
          newState = update.set(newState, 'list.failed', false);
          newState = update.set(newState, 'list.success', true);
          newState = update.set(newState, 'list.data', action.payload);         
          break;
      }
      case TEACHERS_TABLE_FAILED: {
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