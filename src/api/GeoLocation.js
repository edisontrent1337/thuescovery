
export default async function getLocation() {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                resolve({latitude: position.coords.latitude, longitude: position.coords.longitude});
            });
        } else {
            resolve({latitude: 50.55462, longitude: 11.35008});
        }
    });
}