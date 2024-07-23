import Axios from "axios";
import { domainName } from "../../Domain/DomainName";
function GetImageProduct(productImage) {
    return (
        Axios.get(`${domainName}/images/products/${productImage}`, {
            headers: {
                "ngrok-skip-browser-warning": "true",
                "Content-Type": 'multipart/form-data'
            },
            responseType: 'blob'
        })
            .then(res => URL.createObjectURL(res.data))
            .catch(error => console.log(error))
    )
}

export default GetImageProduct;