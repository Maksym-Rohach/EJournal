import React, { Suspense, Component } from 'react';
import { Route, Switch, HashRouter as Router } from "react-router-dom";
//import './App.scss';
// import "./assets/scss/black-dashboard-react.scss";
// import "./assets/css/black-dashboard-react.css";
// import "./assets/demo/demo.css";
// import "./assets/css/nucleo-icons.css";
// import 'font-awesome/css/font-awesome.min.css';


// Pages
const LoginPage = React.lazy(() => import("./views/defaultViews/LoginPage"));


// Layouts
const AdminLayout = React.lazy(() => import("./layouts/adminLayout/AdminLayout"));



//const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;
class App extends Component {

  state = {
    isLoading: false,
    isError: false
  }

  render() { 
    return (
      <Router>  
      <Suspense fallback={ <div>Загрузка...</div> }>
        <Switch>
          <Route path="/admin" name="Admin" render={ props => <AdminLayout { ...props } /> } />
          <Route exact path="/login" name="Login" render={ props => <LoginPage { ...props } /> } />
        </Switch>
      </Suspense>
      </Router> 
    );
  }
};

export default App;