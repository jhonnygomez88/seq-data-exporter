const config = require("./knexfile.js");
let knexHelper = require("@condor-labs/knex-oracle")(config);
knexHelper = knexHelper.getClient();
let knex = {};

const shouldReconnect = (error) => {
  const recconect = knexHelper.shouldReconnectSession(error);
  if (recconect) {
    overwriteKnexMethods({ shouldReloadHelper: true });
    console.warn({ type: "KNEX_RECCONECTION_SUCCESS", message: error.message });
  }
};

const overwriteKnexMethods = ({ shouldReloadHelper = false }) => {
  if (shouldReloadHelper) {
    knexHelper = require("@condor-labs/knex-oracle")(config);
    knexHelper = knexHelper.getClient(true);
  }
  knex = knexHelper.knex;
  knex.oracleTypes = knexHelper.oracleTypes;
  knex.executeProcedure = knexHelper.executeProcedure;
  knex.executeFunction = knexHelper.executeFunction;
  knex.executeNonQuery = knexHelper.executeProcedure;
  knex.executeNonQueryTrx = knexHelper.executeProcedureTrx;
  knex.executeStatement = knexHelper.executeStatement;
  knex.shouldReconnect = shouldReconnect;
};

overwriteKnexMethods({});

module.exports = knex;