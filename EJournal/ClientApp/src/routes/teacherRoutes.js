import React from 'react';

const Login = React.lazy(() => import('../views/defaultViews/LoginPage'));
const CommentsChart = React.lazy(() => import('../views/adminViews/CommentsChart/CommentsChart'));
const PersonsChart = React.lazy(() => import('../views/adminViews/PersonsChart'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/teacher', exact: true, name: 'Login', component: Login },
  { path: '/teacher/clients', exact: true, name: 'Clients', component: PersonsChart },
  { path: '/teacher/comments', exact: true, name: 'Comments', component: CommentsChart },
  
];

export default routes;