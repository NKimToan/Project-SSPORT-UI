import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import GetAllCategory from "../Services/CategoryServices/GetAllCategory";
import GetAllReview from "../Services/ReviewServices/GetAllReview";
import { ListGroup } from "react-bootstrap";
import "../App.css";
import Products from "../Components/Products/Products";
import GetImageProduct from "../Services/ImageServices/GetImageProduct";
import GetAllProductofCategory from "../Services/ProductServices/GetAllProductofCategory";
import GetAllReviewofCategory from "../Services/ReviewServices/GetAllReviewofCategory";
function Home() {
    document.title = "SSPORT";
    const { id } = useParams();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [categoryId, setCategoryId] = useState(id ? parseInt(id) : 1);
    const [isUpdated, setIsUpdated] = useState(false);


    useEffect(() => {
        document.title = "Sản phẩm";

        if (id) {
            setCategoryId(parseInt(id));
        }

        GetAllCategory()
            .then(data => {
                setCategories(data.result);
            })
            .catch(error => console.log(error));

        GetAllProductofCategory(categoryId)
            .then(data => {
                setProducts(data.result)
                data.result.forEach(product => {
                    GetImageProduct(product.image)
                        .then(url => {
                            setProducts(prevProducts => prevProducts.map(pro =>
                                pro.product_id === product.product_id
                                    ? { ...pro, imageUrl: url }
                                    : pro
                            )
                            );
                        });
                })
            })
            .catch(error => console.log(error));


        GetAllReviewofCategory(categoryId)
            .then(data => {
                setReviews(data.result);
            })
            .catch(error => console.log(error));

        return (() => { setIsUpdated(false) })

    }, [isUpdated, categoryId, id])

    return (
        <div className="container text-center mt-2">
            <main className="row d-flex justify-content-evenly mt-4">
                <div className="col-xl-2 col-lg-2 col-md-2">
                    <ListGroup variant="flush">
                        {categories.map((category, id) => (
                            <Link to={`${category.category_id}`} key={id} style={{ textDecoration: "none" }}>
                                <ListGroup.Item action className="border-bottom py-2 text-start" style={{ color: "#000" }}>
                                    <div onClick={() => setCategoryId(category.category_id)}>
                                        {category.category_name}
                                    </div>
                                </ListGroup.Item>
                            </Link>
                        ))}
                    </ListGroup>
                </div>
                <div className="col-xl-10 col-lg-10 col-md-10">
                    <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5">
                        <Products products={products} reviews={reviews} categoryId={categoryId} />
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Home;

