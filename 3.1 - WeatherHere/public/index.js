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
        const data = await response.json();
        console.log(data);

        const weather_data = data.weather;
        document.getElementById('location').textContent = data.weather.timezone.replace('_', ' ');
        document.getElementById('summary').textContent = data.weather.currently.summary;
        document.getElementById('temp').textContent = data.weather.currently.temperature;

        const aq_data = data.air_quality.results[0].measurements[0];
        document.getElementById('aq_parameter').textContent = aq_data.parameter;
        document.getElementById('aq_value').textContent = aq_data.value;
        document.getElementById('aq_units').textContent = aq_data.unit;
        document.getElementById('aq_date').textContent = new Date(aq_data.lastUpdated).toLocaleDateString();

        const db_Data = { lat, lon, weather_data, aq_data};
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(db_Data)
        };
        const dbResponse = await fetch('/api', options);
        const dbJson = await dbResponse.json();
        console.log(dbJson);
    });
} else {
    console.log('Geolocation not available');
}