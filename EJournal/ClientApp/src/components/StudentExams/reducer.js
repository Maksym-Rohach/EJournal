import StudentExamsService from './StudentExamsService';
import update from '../../helpers/update';
export const GET_EXAMS_STARTED = "GET_EXAMS_STARTED";
export const GET_EXAMS_SUCCESS = "GET_EXAMS_SUCCESS";
export const GET_EXAMS_FAILED = "GET_EXAMS_FAILED";

const initialState = {
    list: {
        exams: [],      
        loading: false,
        success: false,
        failed: false,
    },
}

export const getStudentExams = (model) => {
    return (dispatch) => {
        dispatch(getListActions.started());
        StudentExamsService.getStudentExams(model)
            .then((response) => {
                console.log("response", response);
                dispatch(getListActions.success(response));
            }, err => { throw err; })
            .catch(err => {
                console.log("error " + err);
                dispatch(getListActions.failed(err));
            });
    }
}
export const getListActions = {
    started: () => {
        return {
            type: GET_EXAMS_STARTED
        }
    },
    success: (data) => {
        return {
            type: GET_EXAMS_SUCCESS,
            payload: data.data
        }
    },
    failed: (error) => {
        return {
            type: GET_EXAMS_FAILED,
            errors: error
        }
    }
}
export const getStudentsExamsReducer = (state = initialState, action) => {
    let newState = state;
    switch (action.type) {
        case GET_EXAMS_STARTED: {
            newState = update.set(state, 'list.loading', true);
            newState = update.set(newState, 'list.success', false);
            newState = update.set(newState, 'list.failed', false);
            break;
        }
        case GET_EXAMS_SUCCESS: {
            newState = update.set(state, 'list.loading', false);
            newState = update.set(newState, 'list.failed', false);
            newState = update.set(newState, 'list.success', true);
            newState = update.set(newState, 'list.exams', action.payload);
            break;
        }
        case GET_EXAMS_FAILED: {
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