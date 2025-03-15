const data = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let a = true;
            if (a) {
                resolve("Truth is returned");
            } else {
                reject("Rejected !");
            }
        }, 4000);
    });
};

data()
    .then(msg => console.log(msg)) 
    .catch(error => console.log(error));