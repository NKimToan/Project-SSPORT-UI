import axios from 'axios';
import { domainName } from '../../Domain/DomainName';

function GetMyCustomer(accessToken) {
    return (
        axios.get(`${domainName}/customer/my-infor`, {
            headers: {
                'ngrok-skip-browser-warning': 'true',
                Authorization: `Bearer ${accessToken}`,
                Accept: 'application/json',
            }
        })
            .then(res => res.data)
            .catch(error => console.log(error))
    )
}
export default GetMyCustomer;