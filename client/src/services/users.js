import axios from "axios"

const API_URL = process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:5000/api';


const update = (userId, fieldsToUpdate) => {
    return axios.post(
        API_URL + "/user/" + userId + "/edit", fieldsToUpdate, { withCredentials: true }
    ).then(
        (response) =>
            response.data
    )
}

const getUser = (userId) => {
    return axios.get(API_URL + '/user/' + userId, { withCredentials: true })
        .then(response => response.data)
}

const userServices = { update, getUser };

export default userServices;