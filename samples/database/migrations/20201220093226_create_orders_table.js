
exports.up = function(knex) {
    return knex.schema.createTable('orders', function(t){
        t.increments('id')
        t.integer('CustomerID')
        t.integer('DeliveryMethodID')
        t.integer('PaymentMethodID')
        t.integer('CompanyBranchID')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('orders')
};
