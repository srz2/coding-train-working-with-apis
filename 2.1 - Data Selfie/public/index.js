if ('geolocation' in navigator) {
    console.log('Geolocation available');

    navigator.geolocation.getCurrentPosition(position => {
        console.log(position);

        document.getElementById('lat').innerHTML = position.coords.latitude.toFixed(4);
        document.getElementById('lon').innerHTML = position.coords.longitude.toFixed(4);

        const data = { 
            lat: position.coords.latitude,
            lon: position.coords.longitude
        };
        const options = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        };
        fetch('/api', options)
            .then(res => {
                return res.json();
            })
            .then(json => {
                console.log(json);
            });
    });

} else {
    console.log('Geolocation not available');
}