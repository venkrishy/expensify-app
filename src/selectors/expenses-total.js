export default (expenses) => {
    return [].concat(expenses || [])
        .map(expense => expense.amount)
        .reduce((a, c) => a + c, 0)
}