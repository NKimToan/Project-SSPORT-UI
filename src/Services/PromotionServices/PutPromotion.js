import Axios from "axios";
import { domainName } from '../../Domain/DomainName';

function PutPromotion(accessToken, promotionId, promotionName, date_created, date_end, discount) {
    return (
        Axios.put(`${domainName}/promotion/${promotionId}`, {
            promotionName,
            date_created,
            date_end,
            discount
        }, {
            headers: {
                "ngrok-skip-browser-warning": "true",
                Authorization: `Bearer ${accessToken}`,
            }
        })
            .then(res => res.data)
            .catch(error => console.log(error))
    )
}

export default PutPromotion;