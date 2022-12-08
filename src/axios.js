import axios from "axios";

const instance = axios.create({
//     baseURL: "https://renturbookmern.herokuapp.com",
     baseURL: "https://renturbook.onrender.com",
    
});

export default instance;
