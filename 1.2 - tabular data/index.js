
async function getData(){
    const xlabel = [];
    const ytemps = [];

    const response = await fetch('./data.csv');
    const data = await response.text().then(data => { return data.trim()});

    const rows = data.split('\n').splice(1);
    rows.forEach(row => {
        // console.log(row);
        const column = row.split(',');
        // console.log(column);
        const year = column[0];
        const value = column[1];
        xlabel.push(year);
        ytemps.push(parseFloat(value) + 14);
        console.log(`${year} ${value}`);
    });

    return {
        xs: xlabel,
        ys: ytemps
    };
}

async function populateChart() {
    const data = await getData();
    const ctx = document.getElementById('chart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.xs,
            datasets: [{
                label: 'Combined Land-Surface Air and Sea-Surface Water Temperature',
                data: data.ys,
                fill: false,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor:'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        }
    });
}

populateChart();
