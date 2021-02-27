var mysql = require("mysql");
var db = null;


module.exports = function() {
  if (!db) {
    db = mysql.createPool({
      connectionLimit: 10,
      host: "localhost",
      port: "3306",
      user: "guser",
      password: "gpass",
      database: "gene_planet"
    });
  }
  return db;
};

