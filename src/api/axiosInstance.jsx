import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:8080", // Replace with your API base URL
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true, // Include credentials like cookies if needed
});

export default instance;
