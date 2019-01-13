const promise = new Promise((resolve, reject) => {
    setTimeout( () => {
        resolve('this is my  data');
    }, 1600);
    
});

console.log('before');

promise.then((data) => {
    console.log(data);
    return new Promise((resolve, reject) => {
        setTimeout( () => {
            resolve('this is my new promise');
        }, 5000);
    });
}).then ( (str) => {
    console.log('does this run?', str);
}).catch((error) => {
    console.log('error', error);
});

console.log('after');