import React from 'react';

// React hook
import {useForm} from 'react-hook-form';

// Redux
import {connect} from 'react-redux';
import { saveFormData } from "./../redux/actions/signupFormActions.js";

// API Calls
import {sendUserToDatabase} from './../api/sendUserToDatabase';


let SignUpForm = props => {

  const {register, handleSubmit, watch, errors} = useForm();

  // The below sends the data off to the store. 
  const onSubmit = formData => {
    props.saveFormData(formData)
    sendUserToDatabase(formData)
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      <div>
        <label> First Name </label>
        <input name="firstName" label="Hello" placeholder="Josephine" type="text" ref={register} />
      </div>

      <div>
        <label> Last Name </label>
        <input name="lastName" placeholder="Smith" type="text" ref={register} />
      </div>

      <div>
        <label> Age </label>
        <input name="age" placeholder="24" type="number" ref={register} />
      </div>

      <div>
        <label> Suburb </label>
        <input name="suburb" placeholder="Richmond" type="text" ref={register} />
      </div>

      <div>
        <label> Email Address </label>
        <input name="emailAddress" placeholder="me@example.com" type="email" ref={register} />
      </div>

      <div>
        <label> Password </label>
        <input name="password" placeholder="******" type="password" ref={register} />
      </div>

      <div>
        <label> Confirm Password </label>
        <input name="confirmPassword" placeholder="******" type="password" ref={register} />
      </div>

      <button type="submit"> Submit </button>
   </form>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveFormData: (formData) => dispatch(saveFormData(formData))
  }
};

function mapStateToProps(state) {
  return {
    firstName: state.signUpFormReducer.firstName
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);