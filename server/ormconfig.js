require("dotenv").config();

module.exports = {
  type: "postgres",
  host: process.env.HOST,
  username: process.env.NAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  post: process.env.PORT,
  synchronize: false,
  logging: false,
  ssl: { rejectUnauthorized: false },
  migrations: ["dist/migration/**/*.js"],
  entities: ["dist/entities/**/*.js"],
  cli: { migrationsDir: "src/migration" },
};
