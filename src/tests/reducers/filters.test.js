import filtersReducer from '../../reducers/filters';
import moment from 'moment';

test('should setup default filter values', () => {
    const action = {type : '@@INIT'};
    const state = filtersReducer(undefined, action);
    expect(state).toEqual( {
        text: '',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    });
});

test('should set sortBy to amount', () => {
    const state = filtersReducer(undefined, { type: 'SORT_BY_AMOUNT'});
    expect(state.sortBy).toBe('amount')
});

test('should set sortBy to date', () => {
    const currentState = {
        sortBy: 'amount'
    };

    const state = filtersReducer(currentState, { type: 'SORT_BY_DATE'});
    expect(state.sortBy).toEqual('date')
});

test('should set text filter', () => {
    const state = filtersReducer(undefined, { type: 'SET_TEXT_FILTER', text: 'VENKY'});
    expect(state.text).toEqual('VENKY');
});

test('should set start date', () => {
    const state = filtersReducer(undefined, { type: 'SET_START_DATE', startDate: moment(1) });
    expect(state.startDate).toEqual(moment(1));
});

test('should set end date', () => {
    const state = filtersReducer(undefined, { type: 'SET_END_DATE', endDate: moment(2) });
    expect(state.endDate).toEqual(moment(2));
});