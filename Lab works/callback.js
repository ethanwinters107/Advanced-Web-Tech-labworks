function fetchData(callback) {
    setTimeout(() => {
        console.log("Data fetching successful");
        callback();
    },4000)
}
function processData() {
    console.log("Please wait while data is being processed~");
}
fetchData(processData);