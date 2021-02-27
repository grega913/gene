Short demo can be downloaded here:
https://github.com/grega913/gene/blob/main/gene_search.mp4


There are 3 main parts of application:

# DB (MySql):
 I've choosen local instance of MySQL because I've used it the most in my previous work and am quite familiar with it. 
 I've learned quite a few new things regarding the manipulation of vcf files in python (allel.vcf_to_csv) and parsed the data successfully to mysql via multithread load data infile.
 A smaller table (cca 1 mio recs) was created for testing the application and application worked ok. 
 In downloaded vcf file I did not found fileds as listed in instructions, so I decided to extract folowing 6 columns from the file:['CHROM', 'POS', 'ID', 'REF', 'ALT_1', 'INFO_1']
 
 Indexing of the larger table (85 mio recs) was challenging and I did not succeed at that.




# Backend (Node.js):
 Backend part is completed with Express.js library for routing.
 A sinle route (/search/:param) was created which is performing simple SELECT statement
 A helper function 'getQueryString' is taking care of switching between 2 SQL statements, based on the existance of space as second character in searchTerm.
 
 - install dependencies: 	cd backend
							npm install
		
 - start command: npm start



# Frontend (Vue.js):
 Simple Vue.js app for displaying html and making requests to API with the use of Axios library.
 Main logic is in "frontend/src/components/Search.vue" component, Api connectivity is defined in "frontend/src/services/Api_service.vue"
 
 - install dependencies: 	cd frontend
							npm install
							
 - start command : npm start
