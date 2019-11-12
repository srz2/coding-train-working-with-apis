if ('geolocation' in navigator) {
    console.log('Geolocation available');

    navigator.geolocation.getCurrentPosition(position => {
        console.log(position);

        document.getElementById('lat').innerHTML = position.coords.latitude.toFixed(4);
        document.getElementById('lon').innerHTML = position.coords.longitude.toFixed(4);
    });

} else {
    console.log('Geolocation not available');
}