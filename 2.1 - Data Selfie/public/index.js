if ('geolocation' in navigator) {
    console.log('Geolocation available');

    navigator.geolocation.getCurrentPosition(position => {
        console.log(position);

        document.getElementById('lat').innerHTML = position.coords.latitude.toFixed(4);
        document.getElementById('lon').innerHTML = position.coords.longitude.toFixed(4);

        const data = { 
            inital_connection: true,
            manual_submission: false,
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

function submitData() {
    const sz_Mood = document.getElementById('mood').value;
    const sz_Lat = document.getElementById('lat').innerText;
    const sz_Lon = document.getElementById('lon').innerText;
    console.log(sz_Mood);
    const data = {
        inital_connection: false,
        manual_submission: true,
        lat: parseInt(sz_Lat),
        lon: parseInt(sz_Lon),
        mood: sz_Mood
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

    console.log('Submitted Data');
}