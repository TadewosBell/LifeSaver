const LIFESAVER_ENDPOINTS = {
    DEV_ENV: 'http://localhost:5000/',
    PROD_ENV: '',
  };
  
const CURRENT_ENDPOINT = LIFESAVER_ENDPOINTS.DEV_ENV;

export function performHTTPRequest(method, path, jsonData, onSuccess, onFailure) {
    const endpoint = CURRENT_ENDPOINT;
    const url = endpoint + path;
    if (jsonData != null) {
        var body = JSON.stringify(jsonData);
    }
    fetch(url, {
        method: method,
        cache: 'no-cache',
        headers: {
        'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrer: 'no-referrer',
        body: body,
    }).then((res) => {
        if (onSuccess) {
        res.json().then((body) => {
            onSuccess(body);
        });
        }
    }).catch((err) => {
        if (onFailure) {
        onFailure(err.toString());
        }
    });
}

async function request(method, path, jsonData) {
    const endpoint = CURRENT_ENDPOINT;
    const url = endpoint + path;
    const requestInfo = {
        method: method,
        cache: 'no-cache',
        headers: {
        'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrer: 'no-referrer',
    }

    if (jsonData != null) {
        requestInfo.body = JSON.stringify(jsonData);
    }

    const response = await fetch(url, requestInfo);

    return await response.json();
}

export function getMissions() {
    return request('GET', 'Missions');
}

export async function submitCall(user, call){
    return true;
}

export function getJson(token, onSuccess, onFailure){
    const postData = {
        token,
    }

    performHTTPRequest('POST', 'JsonObject', postData, onSuccess, onFailure);
}

export function getUserName(userName, onSuccess, onFailure) {

    const getString = `GetRequest/${userName}`;
    performHTTPRequest('GET', getString, null, onSuccess, onFailure);
  }