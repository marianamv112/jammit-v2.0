import axios from "axios";

const API_URL =
  process.env.NODE_ENV === "production" ? "/api" : "http://localhost:5000/api";

export const createNewEvent = (fields) => {
  return axios
    .post(API_URL + "/events/new-event", fields, { withCredentials: true })
    .then((response) => response);
};

export const getEvents = () => {
  return axios
    .get(API_URL + "/events/all", { withCredentials: true })
    .then((response) => response.data);
};

export const getUserEvents = (userId) => {
  return axios
    .get(API_URL + "/events/user-events/" + userId, { withCredentials: true })
    .then((response) => response.data);
};

export const getSingleEvent = (eventId) => {
  return axios
    .get(API_URL + "/events/single-event/" + eventId, { withCredentials: true })
    .then((response) => response.data);
};

export const updateEvent = (eventId, fieldsToUpdate) => {
 
  return axios
    .post(API_URL + "/events/edit-event/" + eventId, fieldsToUpdate, {
      withCredentials: true,
    })
    .then((response) => { console.log(response); return response});
};

export const searchEvent = (query) => {
  return axios.get(API_URL + "/events/search/" + query, {
    withCredentials: true,
  }).then(response => response.data.results)
}

export default { createNewEvent, getEvents, getUserEvents, getSingleEvent, updateEvent, searchEvent };
