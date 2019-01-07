import React from 'react';
import { shallow } from  'enzyme';
import ExpenseListItem from '../../components/ExpenseListItem';
import expenses from '../fixtures/expenses';

test("should render ExpenseListItem with expenses", () => {
    const wrapper = shallow(<ExpenseListItem {...expenses[0]} />);
    expect(wrapper).toMatchSnapshot();
    
});

test("should render ExpenseListItem with NO expenses", () => {
    const wrapper = shallow(<ExpenseListItem id={expenses[0].id} />);
    expect(wrapper).toMatchSnapshot();
});

