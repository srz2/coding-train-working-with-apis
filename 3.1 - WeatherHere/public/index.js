if ('geolocation' in navigator) {
    console.log('Geolocation available');

    console.log('Getting position...');
    navigator.geolocation.getCurrentPosition(async position => {
        console.log('Obtained Position!');
        const lat = position.coords.latitude.toFixed(4);
        const lon = position.coords.longitude.toFixed(4)
        document.getElementById('lat').innerHTML = lat;
        document.getElementById('lon').innerHTML = lon;

        const api_url = `/weather/${lat},${lon}`; //`https://api.darksky.net/forecast/${DARK_SKY_API_KEY}/${lat},${lon}`;
        console.log('Sending Proxy: ' + api_url);
        const response = await fetch(api_url);
        const json = await response.json();
        console.log(json);
    });
} else {
    console.log('Geolocation not available');
}