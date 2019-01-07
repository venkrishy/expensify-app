import { addExpense, editExpense, removeExpense } from '../../actions/expenses';

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
    const action = addExpense( { description : 'Coffee'} );
    const expenseData = { description: 'Coffee', note: '', amount: 0, createdAt: 0} ;
    expect(action).toEqual( {
        type: 'ADD_EXPENSE',
        expense : { id: expect.any(String), ...expenseData} 
    })
});

test('should setup addExpense with default values', () => {
    const action = addExpense();
    expect(action).toEqual( {
        type: 'ADD_EXPENSE',
        expense : { id: expect.any(String), description: '', note: '', amount: 0, createdAt: 0} 
    })
});

