
// backend s kaisa interact uska hi code hoga
// // jo 4 function hai interat krenga 4 api in the backend

import axios from "axios"

// instance create for basic code (repeated code)
const api = axios.create({
        baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
    withCredentials: true // server ke pass acess rehta hai cokkies ke data read kr sake  or set
})


//as a object 
export async function register({ username, email, password }) {

    try {
        //post req
        const response = await api.post('/api/auth/register', {
            username, email, password
        })

        return response.data

    } catch (err) {

        console.log(err)

    }

}

export async function login({ email, password }) {

    try {

        const response = await api.post("/api/auth/login", {
            email, password
        })

        return response.data

    } catch (err) {
        console.log(err)
    }

}

export async function logout() {
    try {

        const response = await api.get("/api/auth/logout")

        return response.data

    } catch (err) {

    }
}

export async function getMe() {

    try {

        const response = await api.get("/api/auth/get-me")

        return response.data

    } catch (err) {
        console.log(err)
    }

}