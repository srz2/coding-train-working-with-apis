const intervalMs = 3000;
const attribution = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors';
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

const mymap = L.map('mapid').setView([0, 0], 1);
var marker = undefined;//L.marker([0, 0], {icon: issIcon}).addTo(mymap);
const tiles = L.tileLayer(tileUrl, { attribution: attribution });
tiles.addTo(mymap)

function getIssImage() {
    fetch('https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/International_Space_Station.svg/200px-International_Space_Station.svg.png')
        .then(res => {
            // console.log(res);
            return res.blob();
        })
        .then(blob => {
            console.log('Blob is: ' + blob);

            var issIcon = L.icon({
                iconUrl: URL.createObjectURL(blob),
                iconSize: [50, 32],
                iconAnchor: [25, 16]
            });
            marker = L.marker([0, 0], {icon: issIcon}).addTo(mymap);
        })
        .catch(err => {
            console.log('Error getting image\n' + err);
        });
}

async function getISS() {
    const api_url = 'https://api.wheretheiss.at/v1/satellites/25544';
    const response = await fetch(api_url)
    const data = await response.json();
    console.log(data);
    const {latitude, longitude, velocity} = data;
    console.log(latitude);
    console.log(longitude);
    console.log(velocity);

    // L.marker([latitude, longitude]).addTo(mymap);
    if (marker != undefined){
        marker.setLatLng([latitude, longitude]);
    }

    document.getElementById('lat').innerHTML = latitude;
    document.getElementById('lon').innerHTML = longitude;
    document.getElementById('vel').innerHTML = velocity;
}

getIssImage();
setInterval(() => {
    getISS();
}, intervalMs);
getISS();