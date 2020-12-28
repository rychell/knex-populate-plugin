const KnexPopulatePlugin = require('./../src/index')
const knex = require('./database/connection')

const knexPopulate = new KnexPopulatePlugin(knex)


async function run() {
    const customers = await knex('orders').select()
    const cutomersPopulated = await knexPopulate
        .loadData(customers)
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
        }])
        .exec()
    console.log(JSON.stringify(cutomersPopulated, null, 2));
}

run()
// const order = {
//     ID: 1,
//     CustomerID: 1,
//     DeliveryMethodID: 1
// }