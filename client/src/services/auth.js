import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

const signup = (username, email, password) => {
  return axios
    .post(
      API_URL + "/auth/signup",
      { username, email, password },
      { withCredentials: true }
    )
    .then(response => response.data)
};

const loggedin = () => {
  return axios
    .get(API_URL + "/auth/loggedin", { withCredentials: true })
    .then((response) =>  response.data)
    
};

const login = (email, password) => {
 
  return axios
    .post(API_URL + "/auth/login", { email, password }, { withCredentials: true })
    .then((response) =>  response.data)
};

const logout = () => {
  return axios
    .post(API_URL + "/auth/logout", { withCredentials: true })
    .then((response) => response.data);
};
 
const verifyUser = (confirmationCode) => {
  return axios
  .get(API_URL + "/auth/confirm/" + confirmationCode, { withCredentials: true })
  .then((response) => response.data)
}

const authServices = { loggedin, signup, login, logout, verifyUser };

export default authServices;
