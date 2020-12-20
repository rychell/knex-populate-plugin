
exports.up = function(knex) {
    return knex.schema.createTable('products', function(t){
        t.increments('id')
        t.string('Description')
        t.decimal('Price')
        t.string('Brand')
        t.string('Category')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('products')
};
