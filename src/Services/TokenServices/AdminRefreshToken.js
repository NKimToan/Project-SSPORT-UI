import axios from 'axios';
import { domainName } from '../../Domain/DomainName';

function AdminRefreshToken(token) {
    return (axios.post(`${domainName}/admin/auth/refresh`, {
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

export default AdminRefreshToken;