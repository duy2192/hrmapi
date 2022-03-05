module.exports= {
   "type": "mysql",
   "host": process.env.DB_HOST,
   "port":process.env.DB_PORT,
   "username": process.env.DB_USERNAME,
   "password": process.env.DB_PASSWORD,
   "database": process.env.DB_DBNAME,
   "synchronize": true,
   "logging": false,
   "entities": [
      "src/models/index.{ts,js}"
   ],
   "migrations": [
      "src/migration/**/*.ts"
   ],
   "subscribers": [
      "src/subscriber/**/*.ts"
   ],
   "cli": {
      "entitiesDir": "src/models",
      "migrationsDir": "src/migration",
      "subscribersDir": "src/subscriber"
   }
}