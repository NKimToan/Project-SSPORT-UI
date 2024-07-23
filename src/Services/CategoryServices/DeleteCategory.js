import Axios from "axios";
import { domainName } from '../../Domain/DomainName';


function DeleteCategory(accessToken, categoryId) {
    return (
        Axios.delete(`${domainName}/category/${categoryId}`, {
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

export default DeleteCategory;