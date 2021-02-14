require("dotenv").config();

module.exports = {
	type: "mysql",
	host: process.env.DB_HOST,
	port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	synchronize: false,  // Not recommended to set to true , use migration instead
   logging: true,
   entities: [
       "src/models/entities/**/*.ts"
    ],
    migrations: [
       "src/migrations/**/*.ts"
    ],
    subscribers: [
       "src/subscribers/**/*.ts"
    ],
    "cli": {
      "entitiesDir": "src/models/entities",
      "migrationsDir": "src/migrations",
      "subscribersDir": "src/subscribers"
  }
};