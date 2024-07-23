import Axios from "axios";
import { domainName } from '../../Domain/DomainName';

function GetCart(accessToken, cartId) {
    return (
        Axios.get(`${domainName}/cart/${cartId}`, {
            headers: {
                "ngrok-skip-browser-warning": "true",
                Authorization: `Bearer ${accessToken}`,
            }
        })
            .then(res => res.data)
            .catch(error => console.log(error))
    )
}

export default GetCart;