
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('products').del()
    .then(function () {
      // Inserts seed entries
      return knex('products').insert([
        {
          "id": 1,
          "Description": "Laptop Dell",
          "Price": 1000,
          "Brand": 1,
          "Category": 1
        },
        {
          "id": 2,
          "Description": "Eardots Xaomi",
          "Price": 50,
          "Brand": 2,
          "Category": 1
        },
        {
          "id": 3,
          "Description": "VGA to USB Adapter",
          "Price": 15,
          "Brand": 3,
          "Category": 2
        },
        {
          "id": 4,
          "Description": "Mouse Wireless",
          "Price": 30,
          "Brand": 1,
          "Category": 1
        },
        {
          "id": 5,
          "Description": "Smartphone",
          "Price": 400,
          "Brand": 2,
          "Category": 2
        },
        {
          "id": 6,
          "Description": "Book Collection",
          "Price": 70,
          "Brand": 3,
          "Category": 3
        }
      ]);
    });
};
