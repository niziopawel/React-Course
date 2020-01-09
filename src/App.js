import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Movies from './components/movies';
import Customers from './components/customers';
import Rentals from './components/rental';
import NotFound from './components/notFound';
import NavBar from './components/navBar';
import MovieForm from './components/movieForm';
import LoginForm from './components/loginForm';
import Logout from './components/logout';
import RegisterForm from './components/registerFrom';
import ProtectedRoute from './components/common/ProtectedRoute';
import auth from './services/authService';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={user} />
        <main className='container mt-5'>
          <Switch>
            <Route path='/login' component={LoginForm}></Route>
            <Route path='/logout' component={Logout}></Route>
            <Route path='/register' component={RegisterForm}></Route>
            <ProtectedRoute
              path='/movies/:id'
              component={MovieForm}
            ></ProtectedRoute>
            <Route path='/movies' component={Movies}></Route>
            <Route path='/customers' component={Customers}></Route>
            <Route path='/rentals' component={Rentals}></Route>
            <Route path='/not-found' component={NotFound}></Route>
            <Redirect from='/' exact to='/movies' />
            <Redirect to='/not-found' />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
