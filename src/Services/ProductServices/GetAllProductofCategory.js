import Axios from "axios";
import { domainName } from '../../Domain/DomainName';

function GetAllProductofCategory(categoryId) {
    return (
        Axios.get(`${domainName}/product`, {
            headers: {
                "ngrok-skip-browser-warning": "true"
            }
        })
            .then(res => {
                const filteredProducts = res.data.result.filter(product => (
                    product.category_id.categoryId === categoryId
                ));

                return { ...res.data, result: filteredProducts };
            })
            .catch(error => console.log(error))
    )
}

export default GetAllProductofCategory;