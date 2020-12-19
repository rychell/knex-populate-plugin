const order = {
    ID: 1,
    CustomerID: 1,
    DeliveryMethodID: 1
}
knexPopulate(knex).loadData(data).populate([{
    key: 'CustomerID',
    searchOnTable: 'Customers',
    matchingColumn: 'id',
    alias: 'Customer'
}])