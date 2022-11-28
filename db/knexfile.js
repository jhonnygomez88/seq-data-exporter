const path = require("path");

const {
  ORACLE_USER,
  ORACLE_PASSWORD,
  ORACLE_MIN_POOL = 0,
  ORACLE_MAX_POOL = 20,
  ACQUIRE_CONNECTION_TIMEOUT = 10000,
  ORACLE_CONNECTION_STRING,
  NODE_ENV = "development",
} = process.env;

const connectionData = {
  user: ORACLE_USER,
  password: ORACLE_PASSWORD,
  connectionString: ORACLE_CONNECTION_STRING,
  options: {
    acquireConnectionTimeout: +ACQUIRE_CONNECTION_TIMEOUT,
    pool: { min: +ORACLE_MIN_POOL, max: +ORACLE_MAX_POOL },
  },
};

module.exports = connectionData;