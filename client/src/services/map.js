import axios from "axios"
const API_URL = process.env.REACT_APP_API_URL;

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