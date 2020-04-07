import { SAVE_FORM_DATA, SAVE_FORM_ERROR} from "./../actions/allActions";

const signUpFormDefaultState = {
  firstName: "",
  lastName: "",
  emailAddress: "",
  age: undefined,
  suburb: "",
  errorMessage: ""
};

const signUpFormReducer = (state = signUpFormDefaultState, action) => {
  switch (action.type) { 
    case SAVE_FORM_DATA:
      const formData = action.payload.formData
      
        return {
          ...state,
          firstName: formData.firstName,
          lastName: formData.lastName,
          emailAddress: formData.emailAddress,
          age: formData.age,
          suburb: formData.suburb,
        }
    case SAVE_FORM_ERROR: 
      console.log(action.payload.errorMessage)

      return {
        ...state,
        errorMessage: action.payload.errorMessage
      }

    default: 
      return state;
  }
};

export default signUpFormReducer;

