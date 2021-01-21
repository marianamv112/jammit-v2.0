import axios from "axios";
const API_URL = process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:5000/api';

export const signup = (username, email, password) => {
  return axios
    .post(
      API_URL + "/auth/signup",
      { username, email, password },
      { withCredentials: true }
    )
    .then(response => response.data)
};

export const loggedin = () => {
  return axios
    .get(API_URL + "/auth/loggedin", { withCredentials: true })
    .then((response) => response.data)
    
};

export const login = (username, password) => {
  return axios
    .post(API_URL + "/auth/login", { username, password }, { withCredentials: true })
    .then((response) =>  response.data)
};

export const logout = () => {
  return axios
    .post(API_URL + "/auth/logout", {}, { withCredentials: true })
    .then((response) => response.data);
};

export const verifyUser = (confirmationCode) => {
  return axios
  .get(API_URL + "/auth/confirm/" + confirmationCode, { withCredentials: true })
  .then((response) => response.data)
}

export default { loggedin, signup, login, logout, verifyUser };
