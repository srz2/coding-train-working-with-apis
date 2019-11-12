const intervalMs = 3000;

async function getISS() {
    const api_url = 'https://api.wheretheiss.at/v1/satellites/25544';
    const response = await fetch(api_url)
    const data = await response.json();
    console.log(data);
    const {latitude, longitude, velocity} = data;
    console.log(latitude);
    console.log(longitude);
    console.log(velocity);

    document.getElementById('lat').innerHTML = latitude;
    document.getElementById('lon').innerHTML = longitude;
    document.getElementById('vel').innerHTML = velocity;
}

setInterval(() => {
    getISS();
}, intervalMs);
getISS();