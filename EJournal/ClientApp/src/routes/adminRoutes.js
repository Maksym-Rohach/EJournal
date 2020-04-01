import React from 'react';

const Login = React.lazy(() => import('../views/defaultViews/LoginPage'));
const CommentsChart = React.lazy(() => import('../views/adminViews/CommentsChart'));
const PersonsChart = React.lazy(() => import('../views/adminViews/PersonsChart'));
const StudentsTable = React.lazy(() => import('../views/adminViews/StudentsTable'));
const TeachersTable = React.lazy(() => import('../views/adminViews/TeachersTable'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/admin', exact: true, name: 'Login', component: Login },
  { path: '/admin/clients', exact: true, name: 'Login', component: PersonsChart },
  { path: '/admin/comments', exact: true, name: 'Login', component: CommentsChart },
  { path: '/admin/students', exact: true, name: 'Students', component: StudentsTable },
  { path: '/admin/teachers', exact: true, name: 'Teachers', component: TeachersTable },

];

export default routes;