import { SAVE_FORM_DATA, SAVE_FORM_ERROR } from "./allActions";

export const saveFormData = formData => {
  return {
    type: SAVE_FORM_DATA,
    payload: { formData }
  };
};

export const saveFormErrorMessages = errorMessage => {
  return {
    type: SAVE_FORM_ERROR,
    payload: {errorMessage}
  };
};