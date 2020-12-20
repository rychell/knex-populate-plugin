
exports.up = function(knex) {
    return knex.schema.createTable('delivery_methods', function(t){
        t.increments('id')
        t.string('CarrierName')
        t.decimal('Price')
        t.integer('ETA')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('delivery_methods')
};
