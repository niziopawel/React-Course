import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import { register } from '../services/userService';
import auth from '../services/authService';

class RegisterForm extends Form {
  state = {
    data: { email: '', password: '', name: '' },
    errors: {}
  };

  schema = {
    email: Joi.string()
      .email()
      .required()
      .label('E-mail'),
    password: Joi.string()
      .required()
      .min(5)
      .label('Password'),
    name: Joi.string()
      .required()
      .label('Name')
  };

  handleSubmit = async () => {
    try {
      const response = await register(this.state.data);
      auth.loginWithJwt(response.headers['x-auth-token']);
      this.props.history.push('/');
    } catch (ex) {
      if (ex.response) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div style={{ width: '50%', margin: '0 auto 0 auto' }}>
        <h1>Register</h1>
        <form onSubmit={this.onSubmit}>
          {this.renderInput('email', 'E-mail', 'text', true)}
          {this.renderInput('password', 'Password', 'password')}
          {this.renderInput('name', 'Name')}
          {this.renderButton('Register')}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
