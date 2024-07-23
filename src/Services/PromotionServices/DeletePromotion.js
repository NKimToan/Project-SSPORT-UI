import Axios from "axios";
import { domainName } from '../../Domain/DomainName';


function DeletePromotion(accessToken, promotionId) {
    return (
        Axios.delete(`${domainName}/promotion/${promotionId}`, {
            headers: {
                "ngrok-skip-browser-warning": "true",
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then(res => res.data)
            .catch(error => console.log(error))
    )
}

export default DeletePromotion;