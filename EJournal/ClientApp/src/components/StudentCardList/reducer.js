import StudentCardListService from './StudentCardListService';
import update from '../../helpers/update';

export const STUDENTCARDLIST_STARTED = "STUDENTCARDLIST_STARTED";
export const STUDENTCARDLIST_SUCCESS = "STUDENTCARDLIST_SUCCESS";
export const STUDENTCARDLIST_FAILED = "STUDENTCARDLIST_FAILED";

const initialState = {
    list: {
        data: [],
        loading: false,
        success: false,
        failed: false,
    },   
}

export const getStudentListCard = () => {
    return (dispatch) => {
        dispatch(getListActions.started());
        console.log("bober")
        StudentCardListService.getStudentListCard()
            .then((response) => {
                console.log("bober",response)
                dispatch(getListActions.success(response));               
            }, err=> { throw err; })
            .catch(err=> {
              dispatch(getListActions.failed(err));
            });
    }
}

export const studentCardListReducer = (state = initialState, action) => { 
    let newState = state;
  
    switch (action.type) {

        case STUDENTCARDLIST_STARTED: {
            newState = update.set(state, 'list.loading', true);
            newState = update.set(newState, 'list.success', false);
            newState = update.set(newState, 'list.failed', false);
            break;
        }
        case STUDENTCARDLIST_SUCCESS: {
            newState = update.set(state, 'list.loading', false);
            newState = update.set(newState, 'list.failed', false);
            newState = update.set(newState, 'list.success', true);
            newState = update.set(newState, 'list.data', action.payload);         
            break;
        }
        case STUDENTCARDLIST_FAILED: {
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


export const getListActions = {
    started: () => {
        return {
            type: STUDENTCARDLIST_STARTED
        }
    },  
    success: (data) => {
        return {
            type: STUDENTCARDLIST_SUCCESS,
            payload: data.data
        }
    },  
    failed: (error) => {
        return {           
            type: STUDENTCARDLIST_FAILED,
            errors: error
        }
    }
}