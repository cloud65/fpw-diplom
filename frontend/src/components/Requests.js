import axios from 'axios';

const point = '/api/'

const request=(method, path, data, callback)=>{
    axios({method: method,
        url: point+path,
        responseType: 'json',
        data: data,
    })
    .then(function (response) {
    console.log(response);
    })
    .catch(function (error) {
    console.log(error);
    })
    .finally(function () {
    // выполняется всегда
    });  

}

export const loginRequest=(data, callback)=>{
    request('post', 'login', data, callback)    
}