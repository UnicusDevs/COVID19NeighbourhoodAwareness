import React from 'react';

// Components
import SignUpForm from './../components/SignUpForm';

class SignupPage extends React.Component {

  submit = values => {
    // print the form values to the console
    console.log(values)
  }

  render() {
    return (
      <div>
        <h1> SignupPage </h1>
        <SignUpForm onSubmit={this.submit} />
      </div>
    )
  }
};

export default SignupPage;