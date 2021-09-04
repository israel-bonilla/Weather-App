import { useEffect, useState } from "react";

const API_KEY = process.env.REACT_APP_API_KEY;

const useGeolocation = () => {
    const [location, setLocation] = useState({
        loaded: false,
        coords: { lat: "", lon: "" },
    });

    const onSuccess = pos => {
        setLocation({
            loaded: true,
            coords: {
                lat: pos.coords.latitude,
                lon: pos.coords.longitude,
            },
        });

        reverseGeocode(pos.coords);
    };

    const onError = error => {
        setLocation({
            loaded: true,
            error,
        });
    };

    const reverseGeocode = async ({ latitude, longitude }) => {
        await fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=${1}&appid=${API_KEY}`)
        .then(res => res.json())
        .then(data => setLocation(prevState => ({
            ...prevState,
            name: `${data[0].name}, ${data[0].state}`,
        })));
    }

    useEffect(() => {
        if(!("geolocation" in navigator)) {
            onError({
                code: 0,
                message: "Geolocation is not supported",
            });
        }

        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }, []);

    return location;
}

export default useGeolocation;
