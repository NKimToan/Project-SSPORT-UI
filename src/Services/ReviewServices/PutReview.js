import Axios from "axios";
import { domainName } from '../../Domain/DomainName';

function PutReview(accessToken, reviewId, formData) {
    return (
        Axios.put(`${domainName}/review/${reviewId}`, formData, {
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

export default PutReview;