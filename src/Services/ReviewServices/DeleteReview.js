import Axios from "axios";
import { domainName } from '../../Domain/DomainName';

function DeleteReview(accessToken, reviewId) {
    return (
        Axios.delete(`${domainName}/review/${reviewId}`, {
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

export default DeleteReview;