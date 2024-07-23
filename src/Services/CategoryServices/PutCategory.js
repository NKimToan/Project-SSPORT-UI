import Axios from "axios";
import { domainName } from '../../Domain/DomainName';

function PutCategory(accessToken, formData, categoryId) {
    return (
        Axios.put(`${domainName}/category/${categoryId}`,
            formData
            , {
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

export default PutCategory;