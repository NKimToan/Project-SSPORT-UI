import { Card, Badge } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import "../../App.css";

function Products({ products, reviews, categoryId }) {

    const reviewsByProduct = reviews.reduce((acc, review) => {
        if (!acc[review.product.productId]) {
            acc[review.product.productId] = { total: 0, count: 0 };
        }
        acc[review.product.productId].total += review.rate;
        acc[review.product.productId].count += 1;
        return acc;
    }, {});

    const getAverageRating = (productId) => {
        const reviewData = reviewsByProduct[productId];
        if (reviewData) {
            return (reviewData.total / reviewData.count).toFixed(1);
        }
        return 0;
    };


    return <>
        {products.map((product, id) => (
            <div className="col mb-3" key={id}>
                <Card className="h-100 position-relative">
                    <Badge bg="warning" text="dark" className="position-absolute top-0 end-0 m-2">GIẢM {(1 - (product.price / product.cost)) * 100}%</Badge>
                    <Link to={`/${categoryId}/product/${product.product_id}`}>
                        <Card.Img variant="top"
                            src={product.image ? `${product.imageUrl}` : ""}
                            style={{
                                width: '100%',
                                height: '13em',
                            }} />
                    </Link>
                    <Card.Body className="d-flex flex-column">
                        <Card.Title className="text-start fs-6 ellipsis" style={{ height: "3rem" }}>{product.product_name}</Card.Title>
                        <div className="d-flex justify-content-between align-items-center mb-2">
                            <Card.Text className="text-danger fw-bold mb-0">{product.price}đ</Card.Text>
                            <Card.Text className="text-muted text-decoration-line-through small">{product.cost}</Card.Text>
                        </div>
                        <div className="d-flex justify-content-between align-items-center mt-auto">
                            <div className="d-flex align-items-center me-1">
                                <div className="text-warning me-1">Rating:
                                    {getAverageRating(product.product_id)}
                                </div>
                                <FaStar style={{ color: 'gold' }} />
                            </div>
                            <small className="text-muted">{product.quantity_sold} đã bán</small>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        ))}
    </>

}

export default Products;