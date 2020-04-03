
import {SAVE_FORM_DATA} from "./allActions";

export const saveFormData = formData => {
  return {
    type: SAVE_FORM_DATA,
    payload: { formData }
  };
};