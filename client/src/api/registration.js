import axiosAPI from './baseURL';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const signup = async (values, fileUrl) => {

  try {
    axiosAPI.post("/signup", {
      FirstName: values.firstName,
      LastName: values.lastName,
      Suburb: values.suburb,
      Age: values.age,
      EmailAddress: values.emailAddress,
      Password: values.password,
      ImageURL: fileUrl
    }).then(response => {
      if (response.status === 200) {
        axiosAPI.post("/login", {
          EmailAddress: values.emailAddress,
          Password: values.password
        }).then(response => {
          console.log(response)
          // Below sets the token. To view more of the token go to baseURL.js
          const token = response.data;
          cookies.set("covid19Project", token, { path: "/" })
          window.location.assign("/");
        })
      }
    })
  } catch (err) {
    console.log(err.response)
  }
}
