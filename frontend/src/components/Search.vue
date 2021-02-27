<template>
	<div><H2>SEARCH </H2>
		<div class="search">
			<p>Search field accepts strings in 2 ways: </p>
			<li>search by id - example 'rs540431307'</li>
			<li>search by chrom and pos - example: '1 10235'</li>
			<input v-model="searchString" placeholder="insert search" @input="debounceInput($event, searchString)">
			<div v-if="queryResponse">
			<table>
				<thead>
					<tr>
						<th>Chrom</th>
						<th>Pos</th>
						<th>Id</th>
						<th>Ref</th>
						<th>Alt_1</th>
						<th>Info_1</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td v-for="(item, index) in queryResponse" :key="index">{{item}}</td>
					</tr>
				</tbody>
			</table>
			</div>
		</div>

	</div>
</template>


<script>

import _ from 'lodash';
import api_service from "@/services/Api_service";

export default {
	name:"Search",
	data() {
		return {
			searchString:null,
			queryResponse:null	
		}
	},
	methods: {
		/*Main API request function within debounce method since we want
		//to perform request only after the user has stopped writing,
		to avoid multiple (nonwanted) requests to API.
		*/
		debounceInput: _.debounce(async function ($event, searchString)  {
			console.log("searchString in debounce: ", searchString)
			this.queryResponse=null

			if (searchString.length>2) {
				this.checkInputString(searchString)
			}
			
			try {
				const result = await api_service.getResById(searchString)
				console.log("result: ", result)

				if (result.status === 200 && typeof(result.data)=='object') {
					this.queryResponse = result.data
				} else {
					console.log("check the status od API response!")
				}

			} catch(e) {
				console.log(e)
			}

		}, 500), //waiting 500ms before executing this function, so that 


		//simple checker for allowed characters in input field
		checkInputString(txt) {
			if(!txt.match(/^[-\w\s]+$/))  {
				alert("Only alphanumeric characters and space allowed!")
				return false
			}
		}
			
		
	}

}

</script>

<style scoped>
	.search {
		text-align: left;
		margin-left: 50px;
	}
	input {
		margin-top: 30px;
	}
	table {
		margin-top:10px;
		text-align: center;
		border: 2px;
	}

	td {
		text-align: center;
	}

</style>