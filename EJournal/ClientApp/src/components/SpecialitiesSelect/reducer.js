import SpecialitiesSelectService from './SpecialitiesSelectService';
import update from '../../helpers/update';

export const SPECIALITIES_SELECT_STARTED = "SPECIALITIES_SELECT_STARTED";
export const SPECIALITIES_SELECT_SUCCESS = "SPECIALITIES_SELECT_SUCCESS";
export const SPECIALITIES_SELECT_FAILED = "SPECIALITIES_SELECT_FAILED";

export const getListActions = {
    started: () => {
        return {
            type: SPECIALITIES_SELECT_STARTED
        }
    },  
    success: (data) => {
        console.log("spec",data)
        return {
            type: SPECIALITIES_SELECT_SUCCESS,
            payload: data.data
        }
    },  
    failed: (error) => {
        return {           
            type: SPECIALITIES_SELECT_FAILED,
            errors: error
        }
    }
}

const initialState = {
    list: {
        data: [],
        loading: false,
        success: false,
        failed: false,
    },   
}

export const getSpecialitiesSelect = () => {
    return (dispatch) => {
        dispatch(getListActions.started());
        console.log("WARM")
        SpecialitiesSelectService.getSpecialitiesSelect()
            .then((response) => {
                dispatch(getListActions.success(response));               
            }, err=> { throw err; })
            .catch(err=> {
              dispatch(getListActions.failed(err));
            });
    }
}

export const specialitiesSelectReducer = (state = initialState, action) => { 
    let newState = state;
  
    switch (action.type) {

        case SPECIALITIES_SELECT_STARTED: {
            newState = update.set(state, 'list.loading', true);
            newState = update.set(newState, 'list.success', false);
            newState = update.set(newState, 'list.failed', false);
            break;
        }
        case SPECIALITIES_SELECT_SUCCESS: {
            newState = update.set(state, 'list.loading', false);
            newState = update.set(newState, 'list.failed', false);
            newState = update.set(newState, 'list.success', true);
            newState = update.set(newState, 'list.data', action.payload); 
            console.log("specialities",action.payload);
            break;
        }
        case SPECIALITIES_SELECT_FAILED: {
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