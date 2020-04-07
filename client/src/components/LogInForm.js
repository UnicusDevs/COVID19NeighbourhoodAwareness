import React from 'react';
import Cookies from 'universal-cookie';

// React hook
import { useForm } from 'react-hook-form';

// Axios / cookies
import axiosAPI from "./../api/baseURL";

// CSS
import styles from './../sass/components/SignupForm.module.scss';


const cookies = new Cookies();

let LogInForm = props => {

  // To Do: Add token on login stage
  // The below is a axios post to create new user then log them in. 
  let sendUserToDatabase = (values) => {
    console.log('BBBBBB');
    axiosAPI.post("/login", {
        EmailAddress: values.emailAddress,
        Password: values.password
      }).then(response => {
          console.log(response);
        // Below sets the token. To view more of the token go to baseURL.js
        const token = response.data;
        cookies.set("covid19Project", token, { path: "/" })
        window.location.assign("/");
        console.log(response.data)
      }).catch((err) => {
    console.log('AAAAA');
    })
  };

  const {register, handleSubmit, errors} = useForm({
    validateCriteriaMode: "all",
    mode: "onSubmit"
  });

  // The below sends the data off to the store, and calls axios function
  const onSubmit = formData => {
    // Below calls axios function
    sendUserToDatabase(formData);
  };

  const handlePopUpClose = () => {
    props.togglePopUpOff()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form} >
      <div className={styles.signUpFormContainer}>

        <div className={styles.inputContainer}>
          <div>
            <label> Email Address </label>
          </div>

          <input 
            name="emailAddress" 
            placeholder="me@example.com" 
            type="email" 
            ref={register({ required: true, pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/  })} 
          />

          {errors.emailAddress && errors.emailAddress.types.required && (<p>Email required</p>)}
          {errors.emailAddress && errors.emailAddress.types.pattern && (<p>Not a valid email address</p>)}
        </div>

        <div className={styles.inputContainer}>
          <div>
            <label> Password </label>
          </div>

          <input
            name="password"
            placeholder="******"
            type="password"
            ref={register({ required: true })}
          />

          {errors.password && errors.password.types.required && (<p>Password required</p>)}
        </div>

        <div className={styles.buttons}>
          <button onClick={handlePopUpClose}> Cancel </button>
          <button type="submit"> Submit </button>
        </div>

      </div>      
   </form>
  );
};

export default LogInForm;