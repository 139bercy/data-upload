module.exports = {
    HOST: process.env['DB_HOST'] ?? "localhost",
    USER: process.env['DB_USER'] ?? "admin",
    PASSWORD: process.env['DB_PASSWORD'] ?? "admin",
    DB: process.env['DB_NAME'] ?? "testdb",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };
