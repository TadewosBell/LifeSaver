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

export async function signUp(firstName, lastName, email, password){
    const postData = {
        firstName,
        lastName,
        email,
        password
    }
    const response = await request('POST', 'SignUp', postData);
    return await response.json();
}

export async function signIn(email, password){
    const getData = {
        email,
        password
    }

    const response = await request('POST', 'SignIn', getData);
    return await response.json();
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

export async function getCallsForMission(id) {
    const response = await request('GET', `Missions/Calls/${id}`);
    return await response.json();
}

export async function addCallToMission(missionId, callId) {
    await request('POST', `Missions/Calls?mission=${missionId}&call=${callId}`);
}

export async function removeCallFromMission(missionId, callId) {
    await request('DELETE', `Missions/Calls?mission=${missionId}&call=${callId}`);
}

export async function getUsersForMission(id) {
    const response = await request('GET', `Missions/Users/${id}`);
    return await response.json();
}

export async function addUserToMission(missionId, userEmail) {
    await request('POST', `Missions/Users?mission=${missionId}&user=${userEmail}`);
}

export async function removeUserFromMission(missionId, userEmail) {
    await request('DELETE', `Missions/Users?mission=${missionId}&user=${userEmail}`);
}

export async function getCallForFirstResponder(userEmail) {
    const response = await request('GET', `Users/Calls/${userEmail}`);
    return await response.json();
}
