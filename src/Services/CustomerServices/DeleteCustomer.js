import axios from 'axios';
import { domainName } from '../../Domain/DomainName';

function DeleteCustomer(accessToken, customerId) {
    return (
        axios.delete(`${domainName}/customer/${customerId}`, {
            headers: {
                'ngrok-skip-browser-warning': 'true',
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then(res => res.data)
            .catch(error => console.log(error))
    )
}
export default DeleteCustomer;