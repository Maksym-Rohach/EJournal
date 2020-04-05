import MarksTableService from './MarksTableService';
import update from '../../../helpers/update';
export const MARKS_TABLE_STARTED = "MARKS_TABLE_STARTED";
export const MARKS_TABLE_SUCCESS = "MARKS_TABLE_SUCCESS";
export const MARKS_TABLE_FAILED = "MARKS_TABLE_FAILED";


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
        MarksTableService.getMarks(model)
            .then((response) => {
                console.log("response", response);
                dispatch(getListActions.success(response));               
            }, err=> { throw err; })
            .catch(err=> {
                console.log("error "+err);
              dispatch(getListActions.failed(err));
            });
    }
}

export const getListActions = {
    started: () => {
        return {
            type: MARKS_TABLE_STARTED
        }
    },  
    success: (data) => {
        return {
            type: MARKS_TABLE_SUCCESS,
            payload: data.data
        }
    },  
    failed: (error) => {
        return {           
            type: MARKS_TABLE_FAILED,
            errors: error
        }
    }
  }

export const marksTableReducer = (state = initialState, action) => { 
  let newState = state;

  switch (action.type) {

      case MARKS_TABLE_STARTED: {
          newState = update.set(state, 'list.loading', true);
          newState = update.set(newState, 'list.success', false);
          newState = update.set(newState, 'list.failed', false);
          break;
      }
      case MARKS_TABLE_SUCCESS: {
          newState = update.set(state, 'list.loading', false);
          newState = update.set(newState, 'list.failed', false);
          newState = update.set(newState, 'list.success', true);
          newState = update.set(newState, 'list.data', action.payload);         
          break;
      }
      case MARKS_TABLE_FAILED: {
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