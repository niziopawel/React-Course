import React from 'react';
import { Redirect } from 'react-router-dom';
import Joi from 'joi-browser';
import Form from './common/form';
import auth from '../services/authService';

class LoginForm extends Form {
  state = {
    data: { username: '', password: '' },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .required()
      .label('Username'),
    password: Joi.string()
      .required()
      .label('Password')
  };

  handleSubmit = async () => {
    try {
      const { data } = this.state;
      await auth.login(data.username, data.password);

      const { state } = this.props.location;

      window.location = state ? state.from.pathname : '/';
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.password = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    if (auth.getCurrentUser()) return <Redirect to='/' />;

    return (
      <div style={{ width: '50%', margin: '0 auto 0 auto' }}>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('username', 'Username', 'text', true)}
          {this.renderInput('password', 'Password', 'password')}
          {this.renderButton('Login')}
        </form>
      </div>
    );
  }
}

export default LoginForm;
