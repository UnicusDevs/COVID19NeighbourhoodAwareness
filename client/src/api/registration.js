import axiosAPI from './baseURL';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const signup = (values) => {

  const formData = new FormData();

  formData.append('FirstName', values.firstName);
  formData.append('LastName', values.firstName);
  formData.append('Suburb', values.suburb);
  formData.append('Age', values.age);
  formData.append('EmailAddress', values.emailAddress);
  formData.append('Password', values.password);
  formData.append('ProductImage', values.profileImage[0])

  axiosAPI.post("/signup", formData).then(response => {
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
    return err
  })
}