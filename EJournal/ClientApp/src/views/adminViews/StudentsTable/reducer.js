import StudentsTableService from './StudentsTableService';
import update from '../../../helpers/update';
export const STUDENTS_TABLE_STARTED = "STUDENTS_TABLE_STARTED";
export const STUDENTS_TABLE_SUCCESS = "STUDENTS_TABLE_SUCCESS";
export const STUDENTS_TABLE_FAILED = "STUDENTS_TABLE_FAILED";


const initialState = {
    list: {
        data: [],
        loading: false,
        success: false,
        failed: false,
    },   
}

export const getStudents = (model) => {
    return (dispatch) => {
        dispatch(getListActions.started());
        StudentsTableService.getStudents(model)
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
            type: STUDENTS_TABLE_STARTED
        }
    },  
    success: (data) => {
        return {
            type: STUDENTS_TABLE_SUCCESS,
            payload: data.data
        }
    },  
    failed: (error) => {
        return {           
            type: STUDENTS_TABLE_FAILED,
            errors: error
        }
    }
  }

export const studentTableReducer = (state = initialState, action) => { 
  let newState = state;

  switch (action.type) {

      case STUDENTS_TABLE_STARTED: {
          newState = update.set(state, 'list.loading', true);
          newState = update.set(newState, 'list.success', false);
          newState = update.set(newState, 'list.failed', false);
          break;
      }
      case STUDENTS_TABLE_SUCCESS: {
          newState = update.set(state, 'list.loading', false);
          newState = update.set(newState, 'list.failed', false);
          newState = update.set(newState, 'list.success', true);
          newState = update.set(newState, 'list.data', action.payload);         
          break;
      }
      case STUDENTS_TABLE_FAILED: {
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