import React from 'react';
import { connect } from 'react-redux';
import selectExpenses from '../selectors/expenses';
import selectExpensesTotal from '../selectors/expenses-total';
import numeral from 'numeral';

export const ExpenseSummary = ({ expenseCount, expenseTotal }) => {
    const expenseWord = expenseCount == 1 ? 'expense' : 'expenses';
    const totalText = numeral(expenseTotal / 100).format('$0,0.00');
    return (
        <div>
            <p>Viewing {expenseCount} {expenseWord} totaling {totalText}</p>
        </div>
    );
};




const mapStateToProps = (state) => {
    return {
        expenseCount: selectExpenses(state.expenses, state.filters).length,
        expenseTotal: selectExpensesTotal(state.expenses)
    };
};

export default connect(mapStateToProps)(ExpenseSummary);


