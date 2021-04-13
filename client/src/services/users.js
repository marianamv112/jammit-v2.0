import axios from "axios"
const API_URL = process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:5000/api';

export const update = (username, fieldsToUpdate) => {
    return axios.post(
        API_URL + "/user/" + username + "/edit" , fieldsToUpdate, { withCredentials: true}
    ).then(
        response => response.data
    )
}

export default update;