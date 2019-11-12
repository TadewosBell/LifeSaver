const LIFESAVER_ENDPOINTS = {
    DEV_ENV: 'http://localhost:5000/', //https://cors-anywhere.herokuapp.com/
    PROD_ENV: '',
};
  
const CURRENT_ENDPOINT = LIFESAVER_ENDPOINTS.DEV_ENV;

async function request(method, path, jsonData) {
    const url = CURRENT_ENDPOINT + path;
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

    return await fetch(url, requestInfo);
}

export async function getCalls() {
    const response = await request('GET', 'Calls')
    return await response.json();
}

export async function getCall(id) {
    const response = await request('GET', `Calls/${id}`);
    return await response.json();
}

export async function postCall(call) {
    await request('POST', 'Calls', call);
}

export async function updateCall(id, call) {
    await request('PUT', `Calls/${id}`, call);
}

export async function deleteCall(id) {
    await request('DELETE', `Calls/${id}`);
}

export async function getMissions() {
    const response = await request('GET', 'Missions');
    return await response.json();
}

export async function getMission(id) {
    const response = await request('GET', `Missions/${id}`);
    return await response.json();
}

export async function postMission(mission) {
    await request('POST', 'Missions', mission);
}

export async function deleteMission(id) {
    await request('DELETE', `Missions/${id}`);
}
