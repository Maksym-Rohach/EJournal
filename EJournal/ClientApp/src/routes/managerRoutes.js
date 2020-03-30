import React from 'react';

const Login = React.lazy(() => import('../views/defaultViews/LoginPage'));
const CommentsChart = React.lazy(() => import('../views/adminViews/CommentsChart/CommentsChart'));
const PersonsChart = React.lazy(() => import('../views/adminViews/PersonsChart'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/manager', exact: true, name: 'Login', component: Login },
];

export default routes;