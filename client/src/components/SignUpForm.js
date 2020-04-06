import React from 'react';

// React hook
import { useForm } from 'react-hook-form';

// Axios / cookies
import axiosAPI from "./../api/baseURL";

// Redux
import { connect } from 'react-redux';
import { saveFormData, saveFormErrorMessages } from "./../redux/actions/signupFormActions.js";


let SignUpForm = props => {

  // To Do: Add token once user has signed up.
  // The below is a axios post to create new user then log them in. 
  let sendUserToDatabase = (values) => {
    axiosAPI.post("/signup", {
      FirstName: values.firstName,
      LastName: values.lastName,
      Age: values.age,
      Suburb: values.suburb,
      EmailAddress: values.emailAddress,
      Password: values.password,
    }).then(response => {
      if (response.status === 200) {
        axiosAPI.post("/login", {
          EmailAddress: values.emailAddress,
          Password: values.password
        }).then(response => {
          window.location.assign("/");
          return response
        })
      }
    }).catch((err) => {
      // Below saves error message to redux store.
      props.saveFormErrorMessages(err.response.data.error)
    })
  };

  const {register, handleSubmit, watch, errors} = useForm({
    validateCriteriaMode: "all",
    mode: "onSubmit"
  });

  // The below sends the data off to the store, and calls axios function
  const onSubmit = formData => {

    // Below saves formData to redux
    props.saveFormData(formData)
    // Below calls axios function
    sendUserToDatabase(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      <div>
        <label> First Name </label>
        <input 
          name="firstName" 
          label="Hello" 
          placeholder="Josephine" 
          type="text" 
          ref={register({required: true, minLength: 2})} 
        />

        {errors.firstName && errors.firstName.types.required && (<p>First Name required</p>)}
        {errors.firstName && errors.firstName.types.minLength && (<p>Name must be greater than two letters</p>)}
      </div>

      <div>
        <label> Last Name </label>
        <input 
          name="lastName" 
          placeholder="Smith" 
          type="text" 
          ref={register({required: true, minLength: 2})} 
        />

        {errors.lastName && errors.lastName.types.required && (<p>Last Name required</p>)}
        {errors.lastName && errors.lastName.types.minLength && (<p>last must be greater than two letters</p>)}
      </div>

      <div>
        <label> Age </label>
        <input 
          name="age" 
          placeholder="24" 
          type="number" 
          ref={register({ required: true })} 
        />

        {errors.lastName && errors.lastName.types.required && (<p>Age required</p>)}
      </div>

      <div>
        <label> Suburb </label>
        <input 
          name="suburb" 
          placeholder="Richmond" 
          type="text" 
          ref={register({ required: true, minLength: 2 })} 
        />

        {errors.lastName && errors.lastName.types.required && (<p>Suburb required</p>)}
      </div>

      <div>
        <label> Email Address </label>
        <input 
          name="emailAddress" 
          placeholder="me@example.com" 
          type="email" 
          ref={register({ required: true, pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/  })} 
        />
        
        {errors.emailAddress && errors.emailAddress.types.required && (<p>Email required</p>)}
        {errors.emailAddress && errors.emailAddress.types.pattern && (<p>Not a valid email address</p>)}
      </div>

      <div>
        <label> Password </label>
        <input 
          name="password" 
          placeholder="******" 
          type="password" 
          ref={register({ required: true })} 
        />

        {errors.password && errors.password.types.required && (<p>Password required</p>)}
      </div>

      <div>
        <label> Confirm Password </label>
        <input 
          name="confirmPassword" 
          placeholder="******" 
          type="password"
          ref={register({ required: true })} 
        />

        {errors.password && errors.password.types.required && (<p>Please confirm your password</p>)}
      </div>

      <button type="submit"> Submit </button>
   </form>
  );
};

// Below calls dispatch with redux store. 
const mapDispatchToProps = (dispatch) => {
  return {
    saveFormData: (formData) => dispatch(saveFormData(formData)),
    saveFormErrorMessages: (errorMessage) => dispatch(saveFormErrorMessages(errorMessage))
  }
};

export default connect(null, mapDispatchToProps)(SignUpForm);