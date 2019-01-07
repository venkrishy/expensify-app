import React from 'react';
import { Link } from 'react-router-dom';

const ExpenseListItem = ({ id, description, amount, createdAt }) => {
    return (
        <div>
            <p>
                <Link to={`/edit/${id}`}>{description}</Link> - ${amount} - {createdAt} 
            </p>
        </div>
    )
}

export default ExpenseListItem;