import axios from 'axios';

export const signUp = (user) => {
    // return the axios promise object
    return axios.post('/api/1/users', user)

}

export const login = (user) =>{
    return axios.post('/api/1/login', {}, {auth: user})
}