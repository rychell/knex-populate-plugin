
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('orders').del()
    .then(function () {
      // Inserts seed entries
      return knex('orders').insert([
        {
          "id": 1,
          "CustomerID": 1,
          "DeliveryMethodID": 1,
          "PaymentMethodID": 4,
          "CompanyBranchID": 1
        },
        {
          "id": 2,
          "CustomerID": 3,
          "DeliveryMethodID": 2,
          "PaymentMethodID": 2,
          "CompanyBranchID": 1
        },
        {
          "id": 3,
          "CustomerID": 4,
          "DeliveryMethodID": 3,
          "PaymentMethodID": 1,
          "CompanyBranchID": 2
        },
        {
          "id": 4,
          "CustomerID": 2,
          "DeliveryMethodID": 1,
          "PaymentMethodID": 3,
          "CompanyBranchID": 2
        },
        {
          "id": 5,
          "CustomerID": 5,
          "DeliveryMethodID": 2,
          "PaymentMethodID": 4,
          "CompanyBranchID": 1
        },
        {
          "id": 6,
          "CustomerID": 1,
          "DeliveryMethodID": 3,
          "PaymentMethodID": 2,
          "CompanyBranchID": 1
        },
        {
          "id": 7,
          "CustomerID": 3,
          "DeliveryMethodID": 1,
          "PaymentMethodID": 1,
          "CompanyBranchID": 2
        },
        {
          "id": 8,
          "CustomerID": 5,
          "DeliveryMethodID": 2,
          "PaymentMethodID": 3,
          "CompanyBranchID": 2
        },
        {
          "id": 9,
          "CustomerID": 2,
          "DeliveryMethodID": 3,
          "PaymentMethodID": 4,
          "CompanyBranchID": 1
        },
        {
          "id": 10,
          "CustomerID": 4,
          "DeliveryMethodID": 1,
          "PaymentMethodID": 2,
          "CompanyBranchID": 1
        }
      ]);
    });
};
