
let currentLocation;

export default async function getLocation() {
    if (currentLocation) {
        return Promise.resolve(currentLocation);
    }
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                currentLocation = { latitude: position.coords.latitude, longitude: position.coords.longitude };
                resolve(currentLocation);
            });
        } else {
            resolve({ latitude: 50.55462, longitude: 11.35008 });
        }
    });
}