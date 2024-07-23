import Axios from "axios";
import { domainName } from '../../Domain/DomainName';

function GetAllPromotion() {
    return (
        Axios.get(`${domainName}/promotion`, {
            headers: {
                "ngrok-skip-browser-warning": "true"
            }
        })
            .then(res => res.data)
            .catch(error => console.log(error))
    )
}

export default GetAllPromotion;