import Axios from "axios";
import { domainName } from '../../Domain/DomainName';

function DeleteProduct(accessToken, productId) {
    return (
        Axios.delete(`${domainName}/product/${productId}`, {
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

export default DeleteProduct;