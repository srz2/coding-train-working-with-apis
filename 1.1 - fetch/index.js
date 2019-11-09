const imageUrl = 'https://images.unsplash.com/photo-1420593248178-d88870618ca0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80';

console.log('About to get image');
fetch(imageUrl)
    .then(res => {
        console.log('Got blob');
        return res.blob();
    }).then(blob => {
        console.log(blob);
        document.getElementById('myImage').src = URL.createObjectURL(blob);
    }).catch(err => {
        console.log('Error Occured: ' + err);
    });


getImage().then(console.log("Async Done")).catch(err => {
    console.log("Async Error: " + err);
});
async function getImage() {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    document.getElementById('myImage2').src = URL.createObjectURL(blob);
    console.log(blob);
}