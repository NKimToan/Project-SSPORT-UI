import Axios from "axios";
import { domainName } from '../../Domain/DomainName';

function GetAllCategory() {
    return (
        Axios.get(`${domainName}/category`, {
            headers: {
                "ngrok-skip-browser-warning": "true"
            }
        })
            .then(res => res.data)
            .catch(error => console.log(error))
    )
}

export default GetAllCategory;