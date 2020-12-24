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
            matchingColumn: 'id'
        }])
        .exec()
    console.log(cutomersPopulated);
}

run()
// const order = {
//     ID: 1,
//     CustomerID: 1,
//     DeliveryMethodID: 1
// }