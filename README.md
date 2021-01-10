# Knex Populate Plugin

kpp is a kind of plugin to help you populate your data with data from other tables in your database.

See a very basic example:
On your database there are two tables: customers and address
- Table customers

| id | Name | Age | AddressID |
| --- | --- | --- | --- |
| 1 | Carol | 24 | 1 |
| 2 | Rychell | 27 | 1 |
| 3 | Ari | 20 | 1 |
| 4 | João | 18 | 4 |
| 5 | Maria | 21 | 3 |
| 6 | José | 24 | 4 |

- Table address

| id | Street | Neighborhood | City | Country | ZipCode | 
| --- | --- | --- | --- | --- | --- |
| 1 | Rua Oliveira Sobrinho | Bonsucesso | Fortaleza | Brasil | 60541795 |
| 2 | Rua A | Centro | São Paulo | Brasil | 1125346 |
| 3 | Rua Carvalho | Centro | Nice | França | 232651261 |
| 4 | Rua Sem saída | BJ | Fortaleza | Brasil | 613210321 |

If you need to populate your customers with  data from address table you will need to do a few queries to get it done. Using kpp it's simple like this:
```js
const knex = require('./database/connection') // this is your knex instance
const KnexPopulatePlugin = require('./../src/index')

const knexPopulate = new KnexPopulatePlugin(knex)

// First do the regular select to get all customers
const customers = await knex('customers').select()

// Then tell to kpp what you to populate and that's it
const customersPopulated = await knexPopulate
                                    .loadData(customers) // insert your the raw data
                                    .populate([ // Pass an array of settings
                                      {
                                        key: 'AddressID',
                                        searchOnTable: 'address',
                                        alias: 'Address'
                                      }
                                    ])
                                   .exec() // Finally execute all queries
```
Now customersPopulated content's looks like this and you can do whatever you want with this data.
```js
[
  {
    "id": 1,
    "Name": "Carol",
    "Age": 24,
    "Address": {
      "id": 1,
      "Street": "Rua Oliveira Sobrinho",
      "Neighborhood": "Bonsucesso",
      "City": "Fortaleza",
      "Country": "Brasil",
      "ZipCode": "60541795"
    }
  },
  {
    "id": 2,
    "Name": "Rychell",
    "Age": 27,
    "Address": {
      "id": 1,
      "Street": "Rua Oliveira Sobrinho",
      "Neighborhood": "Bonsucesso",
      "City": "Fortaleza",
      "Country": "Brasil",
      "ZipCode": "60541795"
    }
  },
  {
    "id": 3,
    "Name": "Ari",
    "Age": 20,
    "Address": {
      "id": 1,
      "Street": "Rua Oliveira Sobrinho",
      "Neighborhood": "Bonsucesso",
      "City": "Fortaleza",
      "Country": "Brasil",
      "ZipCode": "60541795"
    }
  },
  {
    "id": 4,
    "Name": "João",
    "Age": 18,
    "Address": {
      "id": 4,
      "Street": "Rua Sem saída",
      "Neighborhood": "BJ",
      "City": "Fortaleza",
      "Country": "Brasil",
      "ZipCode": "613210321"
    }
  },
  {
    "id": 5,
    "Name": "Maria",
    "Age": 21,
    "Address": {
      "id": 3,
      "Street": "Rua Carvalho",
      "Neighborhood": "Centro",
      "City": "Nice",
      "Country": "França",
      "ZipCode": "232651261"
    }
  },
  {
    "id": 6,
    "Name": "José",
    "Age": 24,
    "Address": {
      "id": 4,
      "Street": "Rua Sem saída",
      "Neighborhood": "BJ",
      "City": "Fortaleza",
      "Country": "Brasil",
      "ZipCode": "613210321"
    }
  }
]
```
