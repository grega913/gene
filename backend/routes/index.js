const routes = require('express').Router();
const db_conn = require("../config/db_conn.js")
const connection = db_conn()

//test route
routes.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected!' });
});


//route we'll be calling from frontend 
routes.get('/search/:param', (req, res) => {

	let search_term = req.params.param
	//let search_term_fixed = " rs538322974"

	/*Calling a function to check if the search term contain " " as the second char,
	and create different query strings based on that.
	*/
	const query_string = getQueryString(search_term)

	connection.query(query_string, function (err, rows, fields) {
		if (err) throw err
		resp = rows[0]
		if (resp) {
			res.send(resp)
		} else {
			res.send('Search param: ' + search_term  + " returned no results!")
		}
	})
});


/*
Function that returns query string based on the input data. 2 scenarios possible:
1. If input data contains string in the form "rs568405545", the query to DB should look as: "SELECT * FROM gene_planet.test where id = '${search_term}'".
2. If input data contains space as the second char, the query to DB is: "SELECT * FROM gene_planet.test where chrom = 1 and pos='10506'",where
'chrom' is value at position before the space and 'pos' is value after the space.
*/
function getQueryString(searchTerm) {
	if (searchTerm.substring(1,2)== " ") {
		let chrom = searchTerm.substring(0,1)
		let pos = searchTerm.substring(2, (searchTerm.length))

		return `SELECT * FROM gene_planet.test where chrom = '${chrom}' and pos = '${pos}'`
	} else {
		return `SELECT * FROM gene_planet.test where id = '${searchTerm}'`
	}
}
 

module.exports = routes;