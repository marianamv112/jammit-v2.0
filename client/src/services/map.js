import axios from "axios"
const API_URL = process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:5000/api';

export const googleSearch = (place) => {
    return axios.get(
        API_URL + "/map/" + place, { withCredentials: true}
    ).then(
        (response) => response.data.jamSessions.results
    )
}

export default googleSearch;