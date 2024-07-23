import Axios from "axios";
import { domainName } from '../../Domain/DomainName';

function PutProduct(accessToken, productId, formData) {
    return (
        Axios.put(`${domainName}/product/${productId}`, formData, {
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

export default PutProduct;