import Axios from "axios";
import { domainName } from '../../Domain/DomainName';

function GetAllReviewofCategory(categoryId) {
    return (
        Axios.get(`${domainName}/review`, {
            headers: {
                "ngrok-skip-browser-warning": "true"
            }
        })
            .then(res => {
                const filteredReviews = res.data.result.filter(review => (
                    review.product.category.categoryId === categoryId
                ));

                return { ...res.data, result: filteredReviews };
            })
            .catch(error => console.log(error))
    )
}

export default GetAllReviewofCategory;