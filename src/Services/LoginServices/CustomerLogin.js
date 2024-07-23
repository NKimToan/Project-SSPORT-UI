import axios from 'axios';
import { domainName } from '../../Domain/DomainName';

function CustomerLogin(username, password) {
    return (axios.post(`${domainName}/customer/auth/login`, {
        username, password
    }, {
        headers: {
            "ngrok-skip-browser-warning": "true"
        }
    }).then(res => res.data)
        .catch(error => {
            return error.response.data.message
        }))
}

export default CustomerLogin;