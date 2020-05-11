import SetTeacherSubjectsService from './SetTeacherSubjectsService';
import update from '../../../helpers/update';
export const GET_TEACHER_SUBJECTS_STARTED = "GET_TEACHER_SUBJECTS_STARTED";
export const GET_TEACHER_SUBJECTS_SUCCESS = "GET_TEACHER_SUBJECTS_SUCCESS";
export const GET_TEACHER_SUBJECTS_FAILED = "GET_TEACHER_SUBJECTS_FAILED";

export const GET_TEACHERS_STARTED = "GET_TEACHERS_STARTED";
export const GET_TEACHERS_SUCCESS = "GET_TEACHERS_SUCCESS";
export const GET_TEACHERS_FAILED = "GET_TEACHERS_FAILED";

export const CHANGE_TEACH_SUBJ_STARTED = "CHANGE_TEACH_SUBJ_STARTED";
export const CHANGE_TEACH_SUBJ_SUCCESS = "CHANGE_TEACH_SUBJ_SUCCESS";
export const CHANGE_TEACH_SUBJ_FAILED = "CHANGE_TEACH_SUBJ_FAILED";

const initialState = {
    list: {
        teachers: [],
        teacherSubjects: [],
        messageResult: {},
        errors:{},
        loading: false,
        success: false,
        failed: false,
    },
}
export const getTeachers = () => {
    return (dispatch) => {
        dispatch(getTeachListActions.started());
        SetTeacherSubjectsService.getTeachers()
            .then((response) => {
                console.log("response", response);
                dispatch(getTeachListActions.success(response));
            }, err => { throw err; })
            .catch(err => {
                dispatch(getTeachListActions.failed(err));
            });
    }
}
export const getTeacherSubjects = (model) => {
    return (dispatch) => {
        dispatch(getTeachSubjListActions.started());
        SetTeacherSubjectsService.getTeacherSubjects(model)
            .then((response) => {
                console.log("response", response);
                dispatch(getTeachSubjListActions.success(response));
            }, err => { throw err; })
            .catch(err => {
                dispatch(getTeachSubjListActions.failed(err));
            });
    }
}
export const changeTeacherSubjects = (model) => {
    return (dispatch) => {
        dispatch(changeTeachSubjListActions.started());
        SetTeacherSubjectsService.changeTeacherSubjects(model)
            .then((response) => {
                console.log("response", response);
                dispatch(changeTeachSubjListActions.success(response));
            }, err => { throw err; })
            .catch(err => {
                dispatch(changeTeachSubjListActions.failed(err));
            });
    }
}
export const getTeachListActions = {
    started: () => {
        return {
            type: GET_TEACHERS_STARTED
        }
    },
    success: (data) => {
        return {
            type: GET_TEACHERS_SUCCESS,
            teachPayload: data.data
        }
    },
    failed: (error) => {
        return {
            type: GET_TEACHERS_FAILED,
            errors: error
        }
    }
}

export const getTeachSubjListActions = {
    started: () => {
        return {
            type: GET_TEACHER_SUBJECTS_STARTED
        }
    },
    success: (data) => {
        return {
            type: GET_TEACHER_SUBJECTS_SUCCESS,
            teachSubjPayload: data.data
        }
    },
    failed: (error) => {
        return {
            type: GET_TEACHER_SUBJECTS_FAILED,
            errors: error
        }
    }
}
export const changeTeachSubjListActions = {
    started: () => {
        return {
            type: CHANGE_TEACH_SUBJ_STARTED
        }
    },
    success: (data) => {
        return {
            type: CHANGE_TEACH_SUBJ_SUCCESS,
            messagePayload: data.data
        }
    },
    failed: (error) => {
        return {
            type: CHANGE_TEACH_SUBJ_FAILED,
            errors: error
        }
    }
}


export const setTeacherSubjectsReducer = (state = initialState, action) => {
    let newState = state;

    switch (action.type) {
        case CHANGE_TEACH_SUBJ_STARTED: {
            newState = update.set(state, 'list.loading', true);
            newState = update.set(newState, 'list.success', false);
            newState = update.set(newState, 'list.failed', false);
            newState = update.set(newState, 'list.messageResult', {});
            break;
        }
        case CHANGE_TEACH_SUBJ_SUCCESS: {
            newState = update.set(state, 'list.loading', false);
            newState = update.set(newState, 'list.failed', false);
            newState = update.set(newState, 'list.success', true);
            newState = update.set(newState, 'list.messageResult', action.messagePayload);
            break;
        }
        case CHANGE_TEACH_SUBJ_FAILED: {
            newState = update.set(state, 'list.loading', false);
            newState = update.set(newState, 'list.success', false);
            newState = update.set(newState, 'list.failed', true);
            newState = update.set(newState, 'list.errors', action.errors);
            break;
        }
        case GET_TEACHERS_STARTED: {
            newState = update.set(state, 'list.loading', true);
            newState = update.set(newState, 'list.success', false);
            newState = update.set(newState, 'list.failed', false);
            break;
        }
        case GET_TEACHERS_SUCCESS: {
            newState = update.set(state, 'list.loading', false);
            newState = update.set(newState, 'list.failed', false);
            newState = update.set(newState, 'list.success', true);
            newState = update.set(newState, 'list.teachers', action.teachPayload);
            newState = update.set(newState, 'list.messageResult', {});
            break;
        }
        case GET_TEACHERS_FAILED: {
            newState = update.set(state, 'list.loading', false);
            newState = update.set(newState, 'list.success', false);
            newState = update.set(newState, 'list.failed', true);
            newState = update.set(newState, 'list.errors', action.errors);
            break;
        }
        case GET_TEACHER_SUBJECTS_STARTED: {
            newState = update.set(state, 'list.loading', true);
            newState = update.set(newState, 'list.success', false);
            newState = update.set(newState, 'list.failed', false);
            break;
        }
        case GET_TEACHER_SUBJECTS_SUCCESS: {
            newState = update.set(state, 'list.loading', false);
            newState = update.set(newState, 'list.failed', false);
            newState = update.set(newState, 'list.success', true);
            newState = update.set(newState, 'list.teacherSubjects', action.teachSubjPayload);
            newState = update.set(newState, 'list.messageResult', {});
            break;
        }
        case GET_TEACHER_SUBJECTS_FAILED: {
            newState = update.set(state, 'list.loading', false);
            newState = update.set(newState, 'list.success', false);
            newState = update.set(newState, 'list.failed', true);
            newState = update.set(newState, 'list.errors', action.errors);
            break;
        }
        default: {
            return newState;
        }
    }
    return newState;
}