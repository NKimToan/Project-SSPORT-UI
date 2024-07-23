import Axios from "axios";
import { domainName } from '../../Domain/DomainName';

function PostCategory(formData, accessToken) {
    return (
        Axios.post(`${domainName}/category`, formData, {
            headers: {
                "ngrok-skip-browser-warning": "true",
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": 'multipart/form-data'
            }
        })
            .then(res => res.data)
            .catch(error => error.response.data.message)
    )
}

export default PostCategory;