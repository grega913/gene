import Api from "@/services/Api";

export default {

	//Function to result by making request to route 'search/:searcTerm',
	//when we want to perform query as: "SELECT * FROM gene_planet.test where id="rs568405545";
	//another case if when we make request as "SELECT * FROM gene_planet.test where chrom = 1 and pos="10506";"
	//the logic that switches between ultimate query send to DB lies in backend part.

	getResById(searchTerm) {
		return Api().get(`search/${searchTerm}`);
	},

};