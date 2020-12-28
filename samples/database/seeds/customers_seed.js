exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('customers').del()
    .then(function () {
      // Inserts seed entries
      return knex('customers').insert([
        {
          "id": 1,
          "Name": "Carol",
          "Age": 24,
          "AddressID": 1
        },
        {
          "id": 2,
          "Name": "Rychell",
          "Age": 27,
          "AddressID": 1
        },
        {
          "id": 3,
          "Name": "Ari",
          "Age": 20,
          "AddressID": 1
        },
        {
          "id": 4,
          "Name": "João",
          "Age": 18,
          "AddressID": 4
        },
        {
          "id": 5,
          "Name": "Maria",
          "Age": 21,
          "AddressID": 3
        },
        {
          "id": 6,
          "Name": "José",
          "Age": 24,
          "AddressID": 4
        }
      ]);
    });
};
