module.exports = {
    HOST: process.env['PGHOST'] ?? "localhost",
    USER: process.env['PGUSER'] ?? "admin",
    PASSWORD: process.env['PGPASSWORD'] ?? "admin",
    DB: process.env['PGDATABASE'] ?? "testdb",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };
