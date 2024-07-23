import Axios from 'axios';
import { domainName } from '../../Domain/DomainName';

function UpdateCustomer(customerId, accessToken, formData) {
    return (
        Axios.put(`${domainName}/customer/${customerId}`, formData,
            {
                headers: {
                    "ngrok-skip-browser-warning": "true",
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": 'multipart/form-data'
                }
            })
            .then(res => res.data)
            .catch(error => console.log(error))
    )
}

export default UpdateCustomer;