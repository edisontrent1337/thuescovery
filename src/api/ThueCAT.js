
const API_BASE = "https://dev-cdb.thuecat.org/api/"

export default class ThueCat {
    constructor (apiKey) {
        this.apiKey = apiKey;
    }
    
    async search(term, type, limit, offset) {
        const url = API_BASE + 'search' + toUrlParams({term, type, limit, offset});
        try {
            let result = await fetch(url);
            return await result.json();
        } catch (e) {
            // TODO
            console.error("Failed to fetch data from ThueCAT", e);
        }
    }
    
    async geoSearch(lat, lon, radius, term, type, limit, offset) {
        const url = API_BASE + '/search/geocoord' + toUrlParams({lat, lon, radius, term, type, limit, offset});
        try {
            let result = await fetch(url, {method: 'POST'});
            return await result.json();
        } catch (e) {
            // TODO
            console.error("Failed to fetch data from ThueCAT", e);
        }
    }
}

function toUrlParams(obj) {
    let paramsString = "";
    let first = true;
    Object.keys(obj).forEach((key) => {
            if(key && obj[key]) {
            paramsString += (first ? '?' : '&');
            paramsString += key + "=" + obj[key];
            first = !first;
        }
    });
    return paramsString;
}