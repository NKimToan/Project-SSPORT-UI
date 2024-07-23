import axios from 'axios';
import { domainName } from '../../Domain/DomainName';

function CustomerRefreshToken(token) {
    return (axios.post(`${domainName}/customer/auth/refresh`, {
        token
    }, {
        headers: {
            "ngrok-skip-browser-warning": "true"
        }
    })
        .then(res =>
            res.data
        )
        .catch(error => console.log(error)))
}

export default CustomerRefreshToken;