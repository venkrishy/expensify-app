import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startAddExpense, addExpense, editExpense, removeExpense } from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore( [thunk]);

test('removeExpense', () => {
    const action = removeExpense( {id: '123'});
    expect(action).toEqual( {
        type: 'REMOVE_EXPENSE',
        id: '123'
    })
});

test('editExpense', () => {
    const action = editExpense( '123', {note: 'description'});
    expect(action).toEqual( {
        id: '123',
        type: 'EDIT_EXPENSE',
        updates : {
            note: 'description'
        }
    })
});

test('should setup addExpense with provided values', () => {
    const action = addExpense(expenses[2]);
    expect(action).toEqual( {
        type: 'ADD_EXPENSE',
        expense : expenses[2]
    })
});

test('should setup expense to database and store', (done) => {
    const store = createMockStore( {} );
    const expenseData = {
        description: 'Mouse',
        amount: 3000, 
        note: 'This one',
        createdAt: 1000
    };
    store.dispatch(startAddExpense(expenseData)).then( () => {
        const actions = store.getActions();
        expect(actions[0]).toEqual( {
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        });

        return database.ref(`expenses/${actions[0].expense.id}`).once('value');
    }).then( (snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
    });
});

test('should setup expense with defaults to database and store', (done) => {
    const store = createMockStore( {} );
    const expenseData = {
        description: '',
        amount: 0, 
        note: '',
        createdAt: 0
    };
    store.dispatch(startAddExpense({})).then( () => {
        const actions = store.getActions();
        expect(actions[0]).toEqual( {
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        });

        return database.ref(`expenses/${actions[0].expense.id}`).once('value');
    }).then( (snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
    });
});

// test('should setup addExpense with default values', () => {
//     const action = addExpense();
//     expect(action).toEqual( {
//         type: 'ADD_EXPENSE',
//         expense : { id: expect.any(String), description: '', note: '', amount: 0, createdAt: 0} 
//     })
// });

