
exports.up = function(knex) {
    return knex.schema.createTable('address', function(t){
        t.increments('id')
        t.string('Street')
        t.string('Neighborhood')
        t.string('City')
        t.string('Country')
        t.string('ZipCode')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('address')
};
