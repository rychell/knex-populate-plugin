module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './samples/database/db.sqlite3'
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './samples/database/migrations'
    }
  }
};
