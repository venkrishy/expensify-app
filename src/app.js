import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './router/AppRouter'
import configureStore from './store/configureStore';
import {addExpense} from './actions/expenses';

import 'react-dates/lib/css/_datepicker.css';
import 'normalize.css/normalize.css';
import './styles/styles.scss';


const store = configureStore();


store.dispatch(addExpense( {description: 'Water Bill', amount: 4500 } ));
store.dispatch(addExpense( {description: 'Gas Bill', createdAt: 1000 } ));
store.dispatch(addExpense( {description: 'Rent', amount: 109500, createdAt: 2000} ));


const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));
