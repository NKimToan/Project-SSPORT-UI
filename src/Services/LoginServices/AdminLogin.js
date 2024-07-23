import axios from 'axios';
import { domainName } from '../../Domain/DomainName';

function AdminLogin(username, password) {
    return (axios.post(`${domainName}/admin/auth/login`, {
        username, password
    }, {
        headers: {
            "ngrok-skip-browser-warning": "true"
        }
    }).then(res => res.data)
        .catch(error => console.log(error)))
}

export default AdminLogin;