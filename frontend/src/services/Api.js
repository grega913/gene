import axios from "axios";


let instance = axios.create({
	baseURL: process.env.VUE_APP_API,
	//withCredentials: true,
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json"
	}
});

instance.interceptors.response.use(
	response => {
		return response;
	},
	error => {
		console.error("error in response: " + error.response.data);
		return Promise.reject(error);
	}
);

export default () => {
	return instance;
};
