import axios from 'axios';
import { domainName } from '../../Domain/DomainName';

function GetAllCustomer(accessToken) {
    return (
        axios.get(`${domainName}/customer`, {
            headers: {
                'ngrok-skip-browser-warning': 'true',
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then(res => res.data)
            .catch(error => console.log(error))
    )
}
export default GetAllCustomer;