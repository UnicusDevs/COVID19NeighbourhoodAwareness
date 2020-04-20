import React, {useState} from 'react';
import Cookies from 'universal-cookie';

// Google API
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

// React hook
import { useForm } from 'react-hook-form';

// Axios / cookies
import axiosAPI from "./../api/baseURL";

// Redux
import { connect } from 'react-redux';
import { saveFormData, saveFormErrorMessages } from "./../redux/actions/signupFormActions.js";
import { togglePopUpOffSignUp } from "./../redux/actions/popUpActions";

// CSS
import styles from './../sass/components/SignupForm.module.scss';

const cookies = new Cookies();

let SignUpForm = props => {

  const [address, setAddress] = useState("");

  // To Do: Add token on login stage
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
          // Below sets the token. To view more of the token go to baseURL.js
          const token = response.data;
          cookies.set("covid19Project", token, { path: "/" })
          window.location.assign("/");
        })
      }
    }).catch((err) => {
      // Below saves error message to redux store.
      console.log(err.response.data.error)
      props.saveFormErrorMessages(err.response.data.error)
    })
  };

  const {register, handleSubmit, errors} = useForm({
    validateCriteriaMode: "all",
    mode: "onSubmit"
  });

  // The below sends the data off to the store, and calls axios function
  const onSubmit = formData => {
    console.log(formData)
    // Below saves formData to redux
    props.saveFormData(formData)
    // Below calls axios function
    sendUserToDatabase(formData);
  };

  const handlePopUpClose = () => {
    props.togglePopUpOffSignUp()
  }

  const handleChange = (event) => {
    setAddress(event.target.value)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form} >
      <div className={styles.signUpFormContainer}>
        <div className={styles.signUpFormHeader}>
          <h1>Sign up</h1>
        </div> 
        <div className={styles.row}>
          <div className={styles.left}>
            <div className={styles.inputContainer}>
              <div>
                <label> First Name </label>
              </div>

              <input 
                name="firstName" 
                label="Hello" 
                placeholder="Josephine" 
                type="text" 
                ref={register({required: true, minLength: 2})}
              />

              {errors.firstName && errors.firstName.types.required && (<h5>First Name required</h5>)}
              {errors.firstName && errors.firstName.types.minLength && (<h5>Name must be greater than two letters</h5>)}
            </div>

            <div className={styles.inputContainer}>
              <div>
                <label> Last Name </label>
              </div>

              <input
                name="lastName"
                placeholder="Smith"
                type="text"
                ref={register({ required: true, minLength: 2 })}
              />

              {errors.lastName && errors.lastName.types.required && (<h5>Last Name required</h5>)}
              {errors.lastName && errors.lastName.types.minLength && (<h5>last must be greater than two letters</h5>)}
            </div>

            <div className={styles.inputContainer}>
              <div>
                <label> Age </label>
              </div>

              <input 
                name="age" 
                placeholder="24" 
                type="number" 
                ref={register({ required: true })} 
              />

              {errors.age && errors.age.types.required && (<h5>Age required</h5>)}
            </div> 

          <div className={styles.inputContainer}>
            <div>
              <label> Suburb </label>
            </div>
              <GooglePlacesAutocomplete
    
                autocompletionRequest={{
                  componentRestrictions: {
                    country: ['au'],
                  },
                }}

                renderInput={(props) => (
                  <div className={styles.googleInputContainer}>
                    <input
                      name="suburb"
                      type="text"
                      {...props}
                      className={styles.googleInput}
                      ref={register({ required: true, minLength: 2 })}
                    />
                  </div>
                )}

                renderSuggestions={(active, suggestions, onSelectSuggestion) => (
                  <div className={styles.suggestionsContainer}>
                    {suggestions.map((suggestion) => {
                      return (
                        <div
                          key={suggestion.id}
                          className={styles.suggestion}
                          onClick={(event) => onSelectSuggestion(suggestion, event)}
                        >
                          <h4>{suggestion.description}</h4>
                          <hr />
                        </div>
                      )
                    })
                    }
                  </div>
                )}
                />
              {errors.suburb && errors.suburb.types.required && (<p>Suburb required</p>)}
            </div>
          </div> 
          <div className={styles.right}>
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

              {errors.emailAddress && errors.emailAddress.types.required && (<h5>Email required</h5>)}
              {errors.emailAddress && errors.emailAddress.types.pattern && (<h5>Not a valid email address</h5>)}
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

              {errors.password && errors.password.types.required && (<h5>Password required</h5>)}
            </div>

            <div className={styles.inputContainer}>   
              <div>
                <label> Confirm Password </label>
              </div>

              <input
                name="confirmPassword"
                placeholder="******"
                type="password"
                ref={register({ required: true })}
              /> 

              {errors.confirmPassword && errors.confirmPassword.types.required && (<h5>Please confirm your password</h5>)}
            </div>
            <div className={styles.buttons}>
              <button type="submit"> Submit </button>
            </div>
          </div>
        </div>
      </div>      
   </form>
  );
};

// Below calls dispatch with redux store. 
const mapDispatchToProps = (dispatch) => {
  return {
    saveFormData: (formData) => dispatch(saveFormData(formData)),
    saveFormErrorMessages: (errorMessage) => dispatch(saveFormErrorMessages(errorMessage)),
    togglePopUpOffSignUp: () => dispatch(togglePopUpOffSignUp()),
  }
};

function mapStateToProps(state) {
  return {
    displayPopUpSignUp: state.popUpReducer.displayPopUpSignUp
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);