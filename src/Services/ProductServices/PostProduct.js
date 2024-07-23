import Axios from "axios";
import { domainName } from '../../Domain/DomainName';

function PostProduct(accessToken, formData) {
    return (
        Axios.post(`${domainName}/product`, formData, {
            headers: {
                "ngrok-skip-browser-warning": "true",
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": 'multipart/form-data'
            }
        })
            .then(res => res.data)
            .catch(error => error.response.data.message)
    )
}

export default PostProduct;