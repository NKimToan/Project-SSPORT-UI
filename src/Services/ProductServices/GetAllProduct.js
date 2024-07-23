import Axios from "axios";
import { domainName } from '../../Domain/DomainName';

function GetAllProduct() {
    return (
        Axios.get(`${domainName}/product`, {
            headers: {
                "ngrok-skip-browser-warning": "true"
            }
        })
            .then(res => res.data)
            .catch(error => console.log(error))
    )
}

export default GetAllProduct;