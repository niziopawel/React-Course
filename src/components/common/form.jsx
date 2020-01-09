import React, { Component } from 'react';
import Input from './input';
import Joi from 'joi-browser';
import Select from './select';

class Form extends Component {
  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);

    if (!error) return null;

    const errors = error.details.reduce((prev, curr) => {
      prev[curr.path[0]] = curr.message;
      return prev;
    }, {});

    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };

    const { error } = Joi.validate(obj, schema);

    return error ? error.details[0].message : null;
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);

    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  onSubmit = e => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });

    if (errors) return;

    this.handleSubmit();
  };

  renderButton(label) {
    return (
      <button
        disabled={this.validate()}
        onClick={e => this.onSubmit(e)}
        className='btn btn-primary'
      >
        {label}
      </button>
    );
  }

  renderInput(name, label, type = 'text', focus) {
    const { data, errors } = this.state;

    return (
      <Input
        focus={focus}
        type={type}
        name={name}
        value={data[name]}
        onChange={this.handleChange}
        label={label}
        error={errors[name]}
      />
    );
  }

  renderSelect(name, label, options) {
    const { data, errors } = this.state;

    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }
}

export default Form;
