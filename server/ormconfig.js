require("dotenv").config();

module.exports = {
  type: "postgres",
  host: process.env.HOST,
  username: process.env.NAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  post: process.env.DATABASE_PORT,
  synchronize: false,
  logging: false,
  migrations: ["dist/migration/**/*.js"],
  entities: ["dist/entities/**/*.js"],
  cli: { migrationsDir: "src/migration" },
};
