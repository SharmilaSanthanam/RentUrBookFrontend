import axios from "axios";

const instance = axios.create({
    baseURL: "https://renturbookmern.herokuapp.com",
});

export default instance;