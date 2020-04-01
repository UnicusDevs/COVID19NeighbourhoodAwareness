import React from 'react';

// Redux
import { Field, reduxForm } from "redux-form";
import {connect} from 'react-redux';

let SignUpForm = props => {
  const { handleSubmit } = props
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="firstName">First Name</label>
        <Field name="firstName" component="input" type="text" />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

SignUpForm = connect()(SignUpForm);

SignUpForm = reduxForm({
  form: 'signup'
})(SignUpForm);

export default SignUpForm;