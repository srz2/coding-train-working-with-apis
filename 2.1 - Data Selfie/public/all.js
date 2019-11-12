async function getData() {
    const response = await fetch('/api');
    const dataSet = await response.json();
    console.log(dataSet);


    const list = document.createElement('ul');
    dataSet.forEach(data => {
        const root = document.createElement('li');
        const mood = document.createElement('div');
        const geo = document.createElement('div');
        const date = document.createElement('div');        

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

        root.append(mood, geo, date);
        list.append(root);
    });
    document.body.append(list);
}

getData();