import Axios from "axios";
import { domainName } from '../../Domain/DomainName';

function PostPromotion(accessToken, promotionName, date_created, date_end, discount) {
    return (
        Axios.post(`${domainName}/promotion`, {
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

export default PostPromotion;