import Axios from "axios";
import { domainName } from '../../Domain/DomainName';

function GetCategory(categoryId) {
    return (
        Axios.get(`${domainName}/category/${categoryId}`, {
            headers: {
                "ngrok-skip-browser-warning": "true"
            }
        })
            .then(res => res.data)
            .catch(error => console.log(error))
    )
}

export default GetCategory;