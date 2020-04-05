import axiosAPI from "./baseURL.js";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

// To Do: Add token once user has signed up.
export let sendUserToDatabase = (values) => {
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
      })
    }
  }).catch((err) => {
    console.log(err)
  })
};
