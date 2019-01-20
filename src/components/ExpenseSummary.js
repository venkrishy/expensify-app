import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import selectExpenses from '../selectors/expenses';
import selectExpensesTotal from '../selectors/expenses-total';
import numeral from 'numeral';

export const ExpenseSummary = ({ expenseCount, expenseTotal }) => {
    const expenseWord = expenseCount == 1 ? 'expense' : 'expenses';
    const totalText = numeral(expenseTotal / 100).format('$0,0.00');
    return (
        <div className="page-header">
            <div className="content-container">
                <h1 className="page-header__title">Viewing <span>{expenseCount}</span> {expenseWord} totaling <span>{totalText}</span></h1>
                <div className="page-header__actions" >
                    <Link className="button" to="/create">Add Expense</Link>
                </div>
            </div>
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


