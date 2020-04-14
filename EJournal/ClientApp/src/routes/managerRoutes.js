import React from 'react';

const Login = React.lazy(() => import('../views/defaultViews/LoginPage'));
const CommentsChart = React.lazy(() => import('../views/adminViews/CommentsChart/CommentsChart'));
const PersonsChart = React.lazy(() => import('../views/adminViews/PersonsChart'));
const StudentCardList = React.lazy(() => import('../components/StudentCardList/StudentCardList'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/manager', exact: true, name: 'Login', component: Login },
  { path: '/manager/students', exact: true, component: StudentCardList },
];

export default routes;