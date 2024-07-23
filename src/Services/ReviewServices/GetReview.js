import Axios from "axios";
import { domainName } from '../../Domain/DomainName';

function GetReview(reviewId) {
    return (
        Axios.get(`${domainName}/review/${reviewId}`, {
            headers: {
                "ngrok-skip-browser-warning": "true"
            }
        })
            .then(res => res.data)
            .catch(error => console.log(error))
    )
}

export default GetReview;