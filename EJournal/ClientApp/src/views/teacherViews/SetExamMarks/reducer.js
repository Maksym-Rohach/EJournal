import SetExamService from './SetExamService';
import update from '../../../helpers/update';

export const GETEXAMS_STARTED = "GETEXAMS_STARTED";
export const GETEXAMS_SUCCESS = "GETEXAMS_SUCCESS";
export const GETEXAMS_FAILED = "GETEXAMS_FAILED";

const initialState = {
    list: {
        exams:[],
        loading: false,
        success: false,
        failed: false,
    },   
}

export const getExams = () => {
    return (dispatch) => {
        dispatch(getListActions.started());
        SetExamService.getExams()
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
            type: GETEXAMS_STARTED
        }
    },  
    success: (data) => {
        return {
            type: GETEXAMS_SUCCESS,
            payload: data.data
        }
    },  
    failed: (error) => {
        return {           
            type: GETEXAMS_FAILED,
            errors: error
        }
    }
  }



export const SetExamsReducer = (state = initialState, action) => { 
    let newState = state;
  
    switch (action.type) {
  
        case GETEXAMS_STARTED: {
            newState = update.set(state, 'list.loading', true);
            newState = update.set(newState, 'list.success', false);
            newState = update.set(newState, 'list.failed', false);
            break;
        }
        case GETEXAMS_SUCCESS: {
            newState = update.set(state, 'list.loading', false);
            newState = update.set(newState, 'list.failed', false);
            newState = update.set(newState, 'list.success', true);
            newState = update.set(newState, 'list.exams', action.payload);         
            break;
        }
        case GETEXAMS_SUCCESS: {
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