import React from 'react';

// React hook
import {useForm} from 'react-hook-form';

// Redux
import {connect} from 'react-redux';
import { saveFormData } from "./../redux/actions/signupFormActions.js";
import store from "./../redux/configureStore";

let SignUpForm = props => {

  const {register, handleSubmit, watch, errors} = useForm();

  // The below sends the data off to the store. 
  const onSubmit = formData => {
    props.saveFormData(formData)
  };

  const onChange = (event) => {
    // console.log(event.target.value)
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input name="firstName" placeholder="Josephine" type="text" onChange={onChange} ref={register} />
      </div>
      <div>
        <input onChange={onChange} name="lastName" placeholder="Smith" type="text" ref={register} />
      </div>
      <div>
        <input name="emailAddress" placeholder="me@example.com" type="email" ref={register} />
      </div>
      <div>
        <input name="age" placeholder="24" type="number" ref={register} />
      </div>
      <div>
        <input name="password" placeholder="******" type="password" ref={register} />
      </div>
      <div>
        <input name="confirmPassword" placeholder="******" type="password" ref={register} />
      </div>
      <div>
        <input name="suburb" placeholder="Richmond" type="text" ref={register} />
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