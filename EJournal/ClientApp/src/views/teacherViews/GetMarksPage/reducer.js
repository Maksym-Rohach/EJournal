import GetMarksService from './GetMarksService';
import update from '../../../helpers/update';
export const GETMARKS_TABLE_STARTED = "GETMARKS_TABLE_STARTED";
export const GETMARKS_TABLE_SUCCESS = "GETMARKS_TABLE_SUCCESS";
export const GETMARKS_TABLE_FAILED = "GETMARKS_TABLE_FAILED";

const initialState = {
    list: {
        data: [],
        loading: false,
        success: false,
        failed: false,
    },   
}

export const getMarks = (model) => {
    return (dispatch) => {
        dispatch(getListActions.started());
        GetMarksService.getStudents(model)
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
            type: GETMARKS_TABLE_STARTED
        }
    },  
    success: (data) => {
        return {
            type: GETMARKS_TABLE_SUCCESS,
            payload: data.data
        }
    },  
    failed: (error) => {
        return {           
            type: GETMARKS_TABLE_FAILED,
            errors: error
        }
    }
  }

export const GetMarksTableReducer = (state = initialState, action) => { 
  let newState = state;

  switch (action.type) {

      case GETMARKS_TABLE_STARTED: {
          newState = update.set(state, 'list.loading', true);
          newState = update.set(newState, 'list.success', false);
          newState = update.set(newState, 'list.failed', false);
          break;
      }
      case GETMARKS_TABLE_SUCCESS: {
          newState = update.set(state, 'list.loading', false);
          newState = update.set(newState, 'list.failed', false);
          newState = update.set(newState, 'list.success', true);
          newState = update.set(newState, 'list.data', action.payload);         
          break;
      }
      case GETMARKS_TABLE_SUCCESS: {
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