import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { 
    startAddExpense, 
    addExpense, 
    editExpense, 
    removeExpense, 
    setExpenses, 
    startSetExpenses, 
    startEditExpense, 
    startRemoveExpense } from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const uid = 'thisismytestid';
const defaultAuthState = {
    auth:  {
        uid
    }
};
const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
    const expenseData = {};
    expenses.forEach(
        ({ id, description, note, amount, createdAt }) => {
            expenseData[id] = { description, note, amount, createdAt };
        })

    database.ref(`users/${uid}/expenses`).set(expenseData).then(() => done());
});

test('removeExpense', () => {
    const action = removeExpense({ id: '123' });
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123'
    })
});

test('editExpense', () => {
    const action = editExpense('123', { note: 'description' });
    expect(action).toEqual({
        id: '123',
        type: 'EDIT_EXPENSE',
        updates: {
            note: 'description'
        }
    })
});

test('should setup addExpense with provided values', () => {
    const action = addExpense(expenses[2]);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[2]
    })
});

test('should setup expense to database and store', (done) => {
    const store = createMockStore(defaultAuthState);
    const expenseData = {
        description: 'Mouse',
        amount: 3000,
        note: 'This one',
        createdAt: 1000
    };
    store.dispatch(startAddExpense(expenseData)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        });

        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
    });
});

test('should setup expense with defaults to database and store', (done) => {
    const store = createMockStore(defaultAuthState);
    const expenseData = {
        description: '',
        amount: 0,
        note: '',
        createdAt: 0
    };
    store.dispatch(startAddExpense({})).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        });

        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
    });
});

test('should setup setExpense action object with data', () => {
    const action = setExpenses(expenses);
    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses
    })
});



test('should setup set expenses (load expenses) to database and store', (done) => {
    const store = createMockStore(defaultAuthState);
    store.dispatch(startSetExpenses()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses
        })
        done();
    });
});


test('should remove expense from database and store', (done) => {
    const store = createMockStore(defaultAuthState);
    const idToRemove = expenses[1].id;
    store.dispatch(startRemoveExpense({ id: idToRemove })).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'REMOVE_EXPENSE',
            id: idToRemove
        })
        return database.ref(`users/${uid}/expenses/${idToRemove}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(null);
        done();
    });
});

test('should edit expense from firebase', (done) => {
    const store = createMockStore(defaultAuthState);
    const idToEdit = expenses[1].id;
    const updates = {
        description: 'Something to edit',
        note: 'Some  note',
        amount: 3333,
        createdAt: 1000
    };
    store.dispatch(startEditExpense(idToEdit, updates)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            id: idToEdit,
            type: 'EDIT_EXPENSE',
            updates
        })
        return database.ref(`users/${uid}/expenses/${idToEdit}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(updates);
        done();
    });
});

