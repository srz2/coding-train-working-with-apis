async function getData() {
    const response = await fetch('/api');
    const dataSet = await response.json();
    console.log(dataSet);


    dataSet.forEach(data => {
        const root = document.createElement('p');
        const mood = document.createElement('div');
        const geo = document.createElement('div');
        const date = document.createElement('div');
        const image = document.createElement('img');      

        var sz_Mood = ""
        if (data.mood === undefined || data.mood === null) {
            sz_Mood = "???";
        } else {
            sz_Mood = data.mood;
        }
        mood.textContent = `mood: ${sz_Mood}`;
        geo.textContent = `${data.lat}, ${data.lon}`;
        
        const sz_Date = new Date(data.timestamp).toLocaleDateString();
        date.textContent = `${sz_Date}`;

        if (data.image64 === undefined){
            root.append(mood, geo, date);
        } else {
            image.src = data.image64;
            root.append(mood, geo, date, image);
        }
        document.body.append(root);  
    });    
}

getData();