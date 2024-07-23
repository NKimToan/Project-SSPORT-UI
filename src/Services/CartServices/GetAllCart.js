import Axios from "axios";
import { domainName } from '../../Domain/DomainName';

function GetAllCart(accessToken) {
    return (
        Axios.get(`${domainName}/cart`, {
            headers: {
                "ngrok-skip-browser-warning": "true",
                Authorization: `Bearer ${accessToken}`,
            }
        })
            .then(res => res.data)
            .catch(error => console.log(error))
    )
}

export default GetAllCart;