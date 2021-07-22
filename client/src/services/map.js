import axios from "axios"
const API_URL = process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:5000/api';

export const googleSearch = (place) => {
    return axios.get(
        API_URL + "/map/places/" + place, { withCredentials: true}
    ).then(
        (response) => {
            console.log(response.data.jamSessions.results)
            return response.data.jamSessions.results}
    )
}

export const getGoogleImage = (imageRef) => {
    return axios.get(API_URL + '/map/image/' + imageRef).then(img => console.log(img))
}

export default googleSearch;