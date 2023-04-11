import axios from 'axios';

const point = '/api/'

const request=(method, path, token, data, callback)=>{
    const requestData={
        method: method,
        url: point+path,
        responseType: 'json',
        data: data,
    };
    if(token)
        requestData.headers={
            'Authorization': 'Token '+token
        }
    
    axios(requestData)
    .then(function (response) {
        callback(response.status, response.data);
    })
    .catch(function (error) {
        if (error.response) callback(error.response.status, error.response.data);
        else callback(500, error);
    })


}

export const loginRequest=(data, callback)=>{
    request('post', 'login', null, data, callback)    
}

export const logoutRequest=(token, callback)=>{    
    request('get', 'logout', token, null, callback)    
}

export const userDataRequest=(token, callback)=>{
    request('get', 'login', token, null, callback)    
}