const KnexPopulatePlugin = require('./../src/index')
const knex = require('./database/connection')

const knexPopulate = new KnexPopulatePlugin(knex)


async function run() {
    const orders = await knex('orders').select()
    const ordersPopulated = await knexPopulate
        .loadData(orders)
        .populate([{
            key: 'CustomerID',
            searchOnTable: 'customers',
            matchingColumn: 'id',
            alias: 'Customer'
        },{
            key: 'Customer.AddressID',
            searchOnTable: 'address',
            searchColumns: ['id', 'City', 'ZipCode'],
            alias: 'Address'
        },{
            key: 'id',
            searchOnTable: 'order_items',
            matchingColumn: 'OrderID',
            alias: 'Items',
            keepOriginalKey: true,
            multiple:true
        },
        {
            key: 'Items.ProductID',
            searchOnTable: 'products',
            alias: 'Product'
        }])
       .exec()
    console.log(JSON.stringify(ordersPopulated, null, 2));

    const customers = await knex('customers').select()
    const customersPopulated = await knexPopulate
        .loadData(customers)
        .populate([{
            key: 'id',
            searchOnTable: 'orders',
            matchingColumn: 'CustomerID',
            alias: 'Orders',
            keepOriginalKey: true,
            multiple: true
        },
        {
            key: 'Orders.CustomerID',
            searchOnTable: 'customers',
            alias: 'Customer'
        },
        {
            key: 'Orders.Customer.AddressID',
            searchOnTable: 'address',
            alias: 'Address'
        },
        {
            key: 'Orders.Customer.Address.id',
            searchOnTable: 'customers',
            matchingColumn: 'AddressID',
            alias: 'Customers',
            keepOriginalKey: true,
            multiple:true
        }])
    }

run()


