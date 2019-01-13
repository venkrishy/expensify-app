import React from 'react';
import { shallow } from 'enzyme';
import {ExpenseSummary} from '../../components/ExpenseSummary';
import expenses from '../fixtures/expenses';

let editExpense, removeExpense, history, wrapper;

beforeEach(() => {
});

test("should render ExpenseSummary with one expense", () => {
    const wrapper = shallow(<ExpenseSummary expenses={[expenses[0]]} expenseTotal="9434" />);
    expect(wrapper).toMatchSnapshot();

});

test("should render ExpenseSummary with two expenses", () => {
    const wrapper = shallow(<ExpenseSummary expenses={expenses} expenseTotal="9434" />);
    expect(wrapper).toMatchSnapshot();

});
