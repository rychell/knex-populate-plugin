exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('order_items').del()
    .then(function () {
      // Inserts seed entries
      return knex('order_items').insert([
        {
          "id": 1,
          "OrderID": 1,
          "ProductID": 1
        },
        {
          "id": 2,
          "OrderID": 1,
          "ProductID": 2
        },
        {
          "id": 3,
          "OrderID": 1,
          "ProductID": 3
        },
        {
          "id": 4,
          "OrderID": 2,
          "ProductID": 1
        },
        {
          "id": 5,
          "OrderID": 3,
          "ProductID": 4
        },
        {
          "id": 6,
          "OrderID": 3,
          "ProductID": 5
        },
        {
          "id": 7,
          "OrderID": 4,
          "ProductID": 1
        },
        {
          "id": 8,
          "OrderID": 4,
          "ProductID": 4
        },
        {
          "id": 9,
          "OrderID": 4,
          "ProductID": 5
        },
        {
          "id": 10,
          "OrderID": 4,
          "ProductID": 6
        },
        {
          "id": 11,
          "OrderID": 4,
          "ProductID": 2
        },
        {
          "id": 12,
          "OrderID": 5,
          "ProductID": 5
        },
        {
          "id": 13,
          "OrderID": 6,
          "ProductID": 2
        },
        {
          "id": 14,
          "OrderID": 6,
          "ProductID": 4
        },
        {
          "id": 15,
          "OrderID": 6,
          "ProductID": 6
        },
        {
          "id": 16,
          "OrderID": 6,
          "ProductID": 1
        },
        {
          "id": 17,
          "OrderID": 7,
          "ProductID": 3
        },
        {
          "id": 18,
          "OrderID": 7,
          "ProductID": 5
        },
        {
          "id": 19,
          "OrderID": 8,
          "ProductID": 4
        },
        {
          "id": 20,
          "OrderID": 8,
          "ProductID": 5
        },
        {
          "id": 21,
          "OrderID": 9,
          "ProductID": 6
        },
        {
          "id": 22,
          "OrderID": 10,
          "ProductID": 1
        },
        {
          "id": 23,
          "OrderID": 10,
          "ProductID": 2
        },
        {
          "id": 24,
          "OrderID": 10,
          "ProductID": 3
        },
        {
          "id": 25,
          "OrderID": 10,
          "ProductID": 4
        }
      ]);
    });
};
