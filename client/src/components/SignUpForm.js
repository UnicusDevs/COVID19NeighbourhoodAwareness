import React, {useState} from 'react';

// Google API
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

// React hook
import { useForm } from 'react-hook-form';

// API
import { signup } from "./../api/registration";
import axiosAPI from './../api/baseURL';

// Redux
import { connect } from 'react-redux';
import { saveFormData, saveFormErrorMessages } from "./../redux/actions/signupFormActions.js";

// CSS
import styles from './../sass/components/SignupForm.module.scss';

//Other
import ProfileImageDefault from './../assets/icons8-login-as-user-96.png';

export let SignUpForm = props => {

  const [profileImage, setProfileImage] = useState(ProfileImageDefault);
  const [address, setAddress] = useState("");
  const [file, setFile] = useState({});
  const [fileUrl, setFileUrl] = useState("");

  // The below is a axios post to create new user then log them in. 
  let sendUserToDatabase = async (values) => {

    // The below uploads file to s3 Bucket.
    let fileUrl; 
    const formData = new FormData();
    formData.append('file', file)

    await axiosAPI.post('/signup/upload', formData).then((response) => {
      fileUrl = response.data
    });

    signup(values, fileUrl)
  };

  const {register, handleSubmit, errors} = useForm({
    validateCriteriaMode: "all",
    mode: "onSubmit"
  });

  // The below sends the data off to the store, and calls axios function
  const onSubmit = async (formData, file) => {

    // Below saves formData to redux
    props.saveFormData(formData)
    // Below calls axios function
    sendUserToDatabase(formData) ;
  };

  const handleFileChosen = (event) => {
    const file = event.target.files[0]
    setFile(event.target.files[0])
    // The below creates an object so we can view the image
    setProfileImage(URL.createObjectURL(file));
  };

  const handleChange = (event) => {
    setAddress(event.target.value)
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form} >
      <div className={styles.signUpFormContainer}>
        <div className={styles.signUpFormHeader}>
          <h1>Sign up</h1>
        </div> 
        <div className={styles.profileImageContainer}>

          <div>
            <label> Profile Image </label>
          </div>
          
          <img src={profileImage} alt="profile" className={styles.profileImage}/>

          <input
            name="profileImage"
            label="Profile Image"
            type="file"
            onChange={handleFileChosen}
            ref={register}
          />

        </div>
        <div className={styles.row}>

          <div className={styles.left}>
            <div className={styles.inputContainer}>
              <div>
                <label> First Name </label>
              </div>

              <input 
                name="firstName" 
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
              {errors.suburb && errors.suburb.types.required && (<h5>Suburb required</h5>)}
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
  }
};

function mapStateToProps(state) {
  return {
    displayPopUpSignUp: state.popUpReducer.displayPopUpSignUp
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);