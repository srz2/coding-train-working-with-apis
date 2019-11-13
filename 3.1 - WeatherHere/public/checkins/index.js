const attribution = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors';
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

const mymap = L.map('mapid').setView([0, 0], 1);
const tiles = L.tileLayer(tileUrl, { attribution: attribution });
tiles.addTo(mymap)

async function getData() {
    const response = await fetch('/api');
    const dataSet = await response.json();
    console.log(dataSet);


    dataSet.forEach(data => {

        console.log(data);
        const marker = L.marker([data.lat, data.lon]).addTo(mymap);
        const msg = `Location:</br>&nbsp;&nbsp;&nbsp;&nbsp;${data.weather_data.timezone.replace('_', ' ')} (${data.lat}&deg; ${data.lon}&deg;)</br></br>The weather here is ${data.weather_data.currently.summary} with a temperature of ${data.weather_data.currently.temperature}&deg; fahrenheit.
        The concentration of particulate matter (${data.aq_data.parameter}) is ${data.aq_data.value} ${data.aq_data.units} which was last read on ${data.aq_data.lastUpdated}.`

        marker.bindPopup(msg);
    });
}

getData();