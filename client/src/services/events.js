import axios from "axios";

const API_URL =
  process.env.REACT_APP_API_URL;

const createNewEvent = (fields) => {
  return axios
    .post(API_URL + "/events/new-event", fields, { withCredentials: true })
    .then((response) => response);
};

const getEvents = () => {
  return axios
    .get(API_URL + "/events/all", { withCredentials: true })
    .then((response) => response.data);
};

const getUserEvents = (userId) => {
  return axios
    .get(API_URL + "/events/user-events/" + userId, { withCredentials: true })
    .then((response) => response.data);
};

const getSingleEvent = (eventId) => {
  return axios
    .get(API_URL + "/events/single-event/" + eventId, { withCredentials: true })
    .then((response) => response.data);
};

const updateEvent = (eventId, fieldsToUpdate) => {

  return axios
    .post(API_URL + "/events/edit-event/" + eventId, fieldsToUpdate, {
      withCredentials: true,
    })
    .then((response) => { console.log(response); return response });
};

const searchEvent = (query) => {
  return axios.get(API_URL + "/events/search/" + query, {
    withCredentials: true,
  }).then(response => response.data.results)
}

const eventServices = { createNewEvent, getEvents, getUserEvents, getSingleEvent, updateEvent, searchEvent }

export default eventServices;
