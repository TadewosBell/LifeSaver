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


export function getJson(token, onSuccess, onFailure){
    const postData = {
        token,
    }

    performHTTPRequest('POST', 'JsonObject', postData, onSuccess, onFailure);
}

export function signUp(firstName, lastName, email, password, onSuccess, onFailure){
    const postData = {
        firstName,
        lastName,
        email,
        password,
    }

    performHTTPRequest('POST', 'SignUp', postData, onSuccess, onFailure);
}


export function getUserName(userName, onSuccess, onFailure) {

    const getString = `GetRequest/${userName}`;
    performHTTPRequest('GET', getString, null, onSuccess, onFailure);
  }