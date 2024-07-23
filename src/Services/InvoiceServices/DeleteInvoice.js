import Axios from "axios";

import { domainName } from "../../Domain/DomainName";

function DeleteInvoice(accessToken, invoiceId) {
    return (
        Axios.delete(`${domainName}/invoice/${invoiceId}`, {
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

export default DeleteInvoice;