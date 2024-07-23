import axios from 'axios';
import { domainName } from '../../Domain/DomainName';

function CustomerRegister(formData) {
    return (axios.post(`${domainName}/customer`, formData, {
        headers: {
            "ngrok-skip-browser-warning": "true",
            "Content-Type": 'multipart/form-data'
        }
    }).then(res => {
        return res.data
    })
        .catch(error => {
            return error.response.data.message
        }))
}

export default CustomerRegister;