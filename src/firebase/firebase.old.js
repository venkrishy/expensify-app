import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyA40KY11JdS_4JXTXpeuZQsAgXfvl9cSas",
    authDomain: "expensify-ea967.firebaseapp.com",
    databaseURL: "https://expensify-ea967.firebaseio.com",
    projectId: "expensify-ea967",
    storageBucket: "expensify-ea967.appspot.com",
    messagingSenderId: "760879769547"
};
firebase.initializeApp(config);
const database = firebase.database();


database.ref('expenses').on('child_changed', (snapshot) => {
    console.log('key=', snapshot.key, 'val=', snapshot.val());
});

// database.ref('expenses')
//     .on('value', (snapshot) => {
//         const expenses = [];

//         snapshot.forEach( childSnapshot => {
//             expenses.push({
//                 id: childSnapshot.key,
//                 ...childSnapshot.val()
//             });
//         })

//         console.log(expenses);
//     });

// const generateExpense = (description, note, amount, createdAt) => ({description, note, amount, createdAt});
// database.ref('expenses').push(generateExpense('Buy Coffee', '', 12, 15));
// database.ref('expenses').push(generateExpense('Buy Tea', '', 1299, 15));
// database.ref('expenses').push(generateExpense('Buy House', '', 1200009, 15));


// database.ref().push( {
//     title: 'Course Topics',
//     body: 'React Native, Angular, Python'
// });

// const onValueChange = database.ref().on('value', (snapshot) => {
//     const user = snapshot.val();
//         console.log(`${user.name} is a ${user.job.title} at ${user.job.company}`);
//     });

// database.ref().set({
//     name: 'Venky K',
//     age: 18,
//     stressLevel: 6,
//     job: {
//         title:'Senior Manager',
//         company: 'Google'
//     },
//     isSingle: true,
//     location:  {
//         city: 'MO',
//         country: 'United States'
//     }
// }).then( () => {
//     console.log('data is saved');
// }).catch ( (e) => {
//     console.log('This failed for original set', e);
// });


// database.ref().update ( {
//     stressLevel: 9,
//     'job/company': 'Amazon',
//     'location/city': 'Seattle'
// })