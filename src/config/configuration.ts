export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000, // parse port from .env file, should be 80. If no .env file present, then default to 3000
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 27017,
  },
  isProduction: process.env.PRODUCTION === 'true',
  database_conn_string: process.env.DB_CONNECTION_STRING,
  jwt_secret: process.env.JWT_SECRET,
});
