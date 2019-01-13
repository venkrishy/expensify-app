import selectExpensesTotal from '../../selectors/expenses-total';
import expenses from '../fixtures/expenses';

test('should calculate sum when there are no expenses', () => {
    const total = selectExpensesTotal();
    expect(total).toEqual(0);
});

test('should calculate sum when passed an empty array', () => {
    const total = selectExpensesTotal([]);
    expect(total).toEqual(0);
});

test('should calculate sum when there is only one expense', () => {
    const total = selectExpensesTotal(expenses[0]);
    expect(total).toEqual(195);
});

test('should calculate sum when there are multiple expenses', () => {
    const total = selectExpensesTotal(expenses);
    expect(total).toEqual(114195);
});