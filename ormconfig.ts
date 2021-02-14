require("dotenv").config();

module.exports = {
	type: "mysql",
	host: process.env.DB_HOST,
	port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	synchronize: true,
   logging: false,
   entities: [
       "src/models/entities/**/*.ts"
    ],
    migrations: [
       "src/migrations/**/*.ts"
    ],
    subscribers: [
       "src/subscribers/**/*.ts"
    ]
};