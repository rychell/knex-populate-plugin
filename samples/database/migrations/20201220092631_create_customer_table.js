
exports.up = function(knex) {
    return knex.schema.createTable('customers', function(t){
        t.increments('id')
        t.string('Name')
        t.integer('Age')
        t.integer('AddressID')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('customers')
};
