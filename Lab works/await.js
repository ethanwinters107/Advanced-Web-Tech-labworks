const abs = async() => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("HELLOOOOOOO");
        }, 5000);
    });
};

const Data = async () => {
    console.log("HALOOO EVORYNYAN~");
    const result = await abs();
    console.log(result); 
}
Data()