import Axios from "axios";
import { domainName } from '../../Domain/DomainName';

function GetAllReview() {
    return (
        Axios.get(`${domainName}/review`, {
            headers: {
                "ngrok-skip-browser-warning": "true"
            }
        })
            .then(res => res.data)
            .catch(error => console.log(error))
    )
}

export default GetAllReview;