
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('address').del()
    .then(function () {
      // Inserts seed entries
      return knex('address').insert([
        {
          "id": 1,
          "Street": "Rua Oliveira Sobrinho",
          "Neighborhood": "Bonsucesso",
          "City": "Fortaleza",
          "Country": "Brasil",
          "ZipCode": 60541795
        },
        {
          "id": 2,
          "Street": "Rua A",
          "Neighborhood": "Centro",
          "City": "São Paulo",
          "Country": "Brasil",
          "ZipCode": 1125346
        },
        {
          "id": 3,
          "Street": "Rua Carvalho",
          "Neighborhood": "Centro",
          "City": "Nice",
          "Country": "França",
          "ZipCode": 232651261
        },
        {
          "id": 4,
          "Street": "Rua Sem saída",
          "Neighborhood": "BJ",
          "City": "Fortaleza",
          "Country": "Brasil",
          "ZipCode": 613210321
        }
      ]);
    });
};
