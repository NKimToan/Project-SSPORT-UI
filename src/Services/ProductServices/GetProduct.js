import Axios from "axios";
import { domainName } from '../../Domain/DomainName';

function GetProduct(productId) {
    return (
        Axios.get(`${domainName}/product/${productId}`, {
            headers: {
                "ngrok-skip-browser-warning": "true"
            }
        })
            .then(res => res.data)
            .catch(error => console.log(error))
    )
}

export default GetProduct;