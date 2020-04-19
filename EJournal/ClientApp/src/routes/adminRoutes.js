import React from 'react';

const Login = React.lazy(() => import('../views/defaultViews/LoginPage'));
const CommentsChart = React.lazy(() => import('../views/adminViews/CommentsChart'));
const PersonsChart = React.lazy(() => import('../views/adminViews/PersonsChart'));
const StudentsTable = React.lazy(() => import('../views/adminViews/StudentsTable'));
const TeachersTable = React.lazy(() => import('../views/adminViews/TeachersTable'));
const MarksTable = React.lazy(() => import('../views/adminViews/MarksTable'));
const AddStudent = React.lazy(() => import('../views/adminViews/AddStudent'));
const AddTeacher = React.lazy(() => import('../views/adminViews/AddTeacher'));
const GetGroups = React.lazy(() => import('../views/adminViews/GetGroups'));
const LoadDistribution = React.lazy(() => import('../views/adminViews/LoadDistribution'));
const AddNews = React.lazy(() => import('../views/adminViews/AddNews/AddNews'));
// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/admin', exact: true, name: 'Login', component: Login },
  { path: '/admin/clients', exact: true, name: 'Login', component: PersonsChart },
  { path: '/admin/comments', exact: true, name: 'Login', component: CommentsChart },
  { path: '/admin/students', exact: true, name: 'Students', component: StudentsTable },
  { path: '/admin/teachers', exact: true, name: 'Teachers', component: TeachersTable },
  { path: '/admin/marks', exact: true, name: 'Marks', component: MarksTable },
  { path: '/admin/addstudent', exact: true, name: 'AddStudent', component: AddStudent },
  { path: '/admin/addteacher', exact: true, name: 'AddTeacher', component: AddTeacher },
  { path: '/admin/getgroups', exact: true, name: 'GetGroups', component: GetGroups },
  { path: '/admin/load-distribution', exact: true, name: 'LoadDistribution', component: LoadDistribution },
  { path: '/admin/add-news', exact: true, name: 'AddNews', component: AddNews },
];

export default routes;