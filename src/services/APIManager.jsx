import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

//======================Authentication======================//
export async function authenticate(username, password) {
    const response = await axios.post(`${apiUrl}/auth/login`, {
        username: username,
        password: password,
    }, {
        headers: {
        'Content-Type': 'application/json'
        }
    });
    
    return response.data;
}

export async function signOut(token) {
    fetch(`${apiUrl}/auth/sign-out`, {
        method: 'POST',
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json',
        }
    })
}

export async function checkToken(token) {
    const response = await axios.get(`${apiUrl}/auth/check`, {
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json',
        }
    });
    return response.data;
}

//=======================Operation=======================//

export async function getOperations(token) {
    const response = await axios.get(`${apiUrl}/operation/operations`, {
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json',
        }
    });
    return response.data;
}

export async function realizeOperation(token, number1, number2, operation) {
    const response = await axios.post(`${apiUrl}/operation/realize`, {
        number1: number1,
        number2: number2,
        type: operation
    },{
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json',
        }
    });
    
    return response.data;
}

//=======================User=======================//

export async function getUserBalance(token) {
    const response = await axios.get(`${apiUrl}/user/balance`, {
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json',
        }
    });
    return response.data;
}

export async function getUserRecords(token, search, currentPage, pageSize, deleted) {
    const response = await axios.get(
        `${apiUrl}/user/records?search=${search}&page=${currentPage - 1}&size=${pageSize}&inactive=${deleted}`, {
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json',
        }
    });

    return response.data;
}

export async function inactivateUserRecord(token, recordId, inactivate) {
    const response = await fetch(`${apiUrl}/user/record/${recordId}/inactivate?inactive=${inactivate}`, {
        method: 'PUT',
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json',
        }
    })

    return response.data;
}

