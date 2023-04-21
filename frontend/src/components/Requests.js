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

export const refereceRequest=(token, callback)=>{
    request('get', 'refs', token, null, callback)
}

export const refereceGetSection=(section, token, callback)=>{
    request('get', 'refs/'+section, token, null, callback)
}

export const machineCheckRequest=(number, token, callback)=>{
    request('get', 'check?number='+number, token, null, callback)    
}

export const machineryListRequest=(filter, order, page, token, callback)=>{
    const qFilter = Object.keys(filter).map(key=>key+'='+filter[key]).join('&');
    request('get', 'machinery?page='+page+'&order='+order+'&'+qFilter, token, null, callback);
}

export const machineryGetRequest=(guid, token, callback)=>{
    request('get', 'machinery/'+guid, token, null, callback)    
}

export const machinerySaveRequest=(guid, token, data, callback)=>{
    request('post', 'machinery/'+guid, token, data, callback)    
}