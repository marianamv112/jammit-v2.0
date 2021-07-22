import { googleSearch } from '../../services/map'

export const setPlaces = (query) => {
    return (dispatch) => {
        dispatch({ type: "LOADING" });
        googleSearch(query).then((res) => {
            let jamSessions = []
            res.forEach(venue => {
                jamSessions.push({
                    _id: venue.place_id,
                    title: venue.name,
                    eventPicture: venue.photos ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${venue.photos[0].photo_reference}&key=${process.env.REACT_APP_PLACES_API_KEY}` : "",
                    location: venue.formatted_address,
                    latitude: venue.geometry.location.lat,
                    longitude: venue.geometry.location.lng
                })
            })
            return jamSessions
        }).then(jamSessions => {
            dispatch({
                type: "SET_PLACES",
                places: jamSessions
            })
        })
    }
}

export default setPlaces;