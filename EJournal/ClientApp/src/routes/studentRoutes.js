import React from 'react';

const Marks = React.lazy(() => import('../views/studentViews/marks/Marks'));
const Timetable = React.lazy(() => import('../views/studentViews/timetable/Timetable'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/student', exact: true, name: 'Marks', component: Marks },
  { path: '/student/timetable', exact: true, name: 'Timetable', component: Timetable }
];

export default routes;