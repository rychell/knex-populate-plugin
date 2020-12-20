
exports.up = function(knex) {
    return knex.schema.createTable('order_items', function(t){
        t.increments('id')
        t.integer('OrderID')
        t.integer('ProductID')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('order_items')
};
