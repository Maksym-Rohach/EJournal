import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import createHistory from 'history/createHashHistory';

///reducers
import {personsChartReducer} from '../views/adminViews/PersonsChart/reducer';
import {commentsChartReducer} from '../views/adminViews/CommentsChart/reducer';
import {loginReducer} from '../views/defaultViews/LoginPage/reducer';
import {studentTableReducer} from '../views/adminViews/StudentsTable/reducer';
import {teachersTableReducer} from '../views/adminViews/TeachersTable/reducer';
import {marksTableReducer} from '../views/adminViews/MarksTable/reducer';
import {addStudentReducer} from '../views/adminViews/AddStudent/reducer';
import {timetableReducer} from '../views/studentViews/timetable/reducer';
import {changePasswordReducer} from '../components/ChangePassword/reducer';
import {changeImageReducer} from '../components/ChangeImage/reducer';
import {profileReducer} from '../components/Profile/reducer';
import {studentHomePageReducer} from '../views/studentViews/home/reducer';
import {homeworkReducer} from '../views/studentViews/homework/reducer';
import {GetSubjectReducer} from '../views/teacherViews/GetMarksPage/reducer';

// Create browser history to use in the Redux store
const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
export const history = createHistory({ basename: baseUrl });

export default function configureStore(history, initialState) {
  const reducers = {
    persons: personsChartReducer,
    comments: commentsChartReducer,
    login: loginReducer,
    students: studentTableReducer,
    teachers:teachersTableReducer,
    marks:marksTableReducer,
    timetable: timetableReducer,
    password: changePasswordReducer,
    changeImage: changeImageReducer,
    profile:profileReducer,
    studentHome:studentHomePageReducer,
    addStudent:addStudentReducer,
    homework:homeworkReducer,
    getSubject:GetSubjectReducer,
  };

  const middleware = [
    thunk,
    routerMiddleware(history)
  ];

  // In development, use the browser's Redux dev tools extension if installed
  const enhancers = [];
  const isDevelopment = process.env.NODE_ENV === 'development';
  if (isDevelopment && typeof window !== 'undefined' && window.devToolsExtension) {
    enhancers.push(window.devToolsExtension());
  }



  const rootReducer = combineReducers({
    ...reducers,
    router: connectRouter(history)
  });

  return createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleware), ...enhancers)
  );
}
