import { useState, useEffect } from "react";
import GetProduct from "../Services/ProductServices/GetProduct"
import GetAllCart from "../Services/CartServices/GetAllCart";
import PostCart from "../Services/CartServices/PostCart";
import GetAllReview from "../Services/ReviewServices/GetAllReview"
import PostReview from "../Services/ReviewServices/PostReview";
import DeleteReview from "../Services/ReviewServices/DeleteReview";
import UpdateReviewModal from "../Components/Review/UpdateReviewModal";
import { getToken } from "../Services/TokenServices/TokenService";
import { useParams } from "react-router-dom";
import { Card } from 'react-bootstrap';
import { domainName } from "../Domain/DomainName";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import GetImageProduct from "../Services/ImageServices/GetImageProduct";
import GetImageReview from "../Services/ImageServices/GetImageReview";

function ProductsHome({ userLogin }) {

    const [product, setProduct] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [number, setNumber] = useState(0);
    const [carts, setCarts] = useState([]);
    const [isUpdated, setIsUpdated] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [editReview, setEditReview] = useState(false);
    const [imageUrl, setImageUrl] = useState("");
    const params = useParams();
    let countReview = 0;
    let rating = 0;
    document.title = `${product.product_name}`;
    const productId = params.id;
    const userLoginId = userLogin ? userLogin.result.customer_id : "";

    useEffect(() => {
        const accessToken = getToken();

        GetProduct(params.id)
            .then(data => {
                setProduct(data.result);
            })
            .catch(error => console.log(error));

        const fetchImage = async () => {
            if (product.image) {
                const url = await GetImageProduct(product.image);
                setImageUrl(url);
            }
        };
        fetchImage();

        GetAllReview()
            .then(data => {
                setReviews(data.result);
                data.result.forEach(review => {
                    GetImageReview(review.image)
                        .then(url => {
                            setReviews(prevReviews => prevReviews.map(rev =>
                                rev.review_id === review.review_id
                                    ? { ...rev, imageUrl: url }
                                    : rev
                            )
                            );
                        });
                })
            })
            .catch(error => console.log(error));

        GetAllCart(accessToken)
            .then(data => {
                setCarts(data.result);
            })
            .catch(error => console.log(error));

        return (() => { setIsUpdated(false) })

    }, [params.id, isUpdated, product.image])

    const filteredCart = carts.filter(cart => cart.customer_id.customerId === userLoginId && cart.product_id.productId.toString() === params.id && cart.pay_invoice === 1);

    const handlePostReview = async (e) => {
        try {
            e.preventDefault();
            const accessToken = getToken();
            const rate = e.target.rate.value;
            const content = e.target.content.value;
            const image_file = e.target.image.files[0];
            const formData = new FormData();
            formData.append('rate', rate);
            formData.append('image', image_file);
            formData.append('content', content);
            formData.append('customer_id', userLoginId);
            formData.append('product_id', params.id);

            PostReview(accessToken, formData)
                .then((result) => {
                    e.target.reset();
                    setIsUpdated(true);
                })
                .catch((error) => {
                    console.error('Add product error:', error);
                })

        } catch (error) {
            console.log(error);
        }
    }

    const handleUpdateReview = (e, reviewId) => {
        e.preventDefault();
        setEditReview(reviewId);
        setEditModalShow(true);
    }

    let EditModelClose = () => setEditModalShow(false);


    const handleDeleteReview = (e, reviewId) => {
        e.preventDefault();
        const accessToken = getToken();
        DeleteReview(accessToken, reviewId)
            .then(result => { setIsUpdated(true) });
    }



    const handlePostCart = (e, number, userLoginId, productId) => {
        e.preventDefault();
        const accessToken = getToken();
        const formData = new FormData();
        formData.append('quantity', number);
        formData.append('customer_id', userLoginId);
        formData.append('product_id', productId);
        if (number > 0) {
            PostCart(accessToken, formData)
                .then((result) => {
                    setNumber(0);
                })
                .catch((error) => {
                    console.error('Add product error:', error);
                })
        }

    }

    const filteredReviews = reviews.filter(review => review.product && review.product.productId.toString() === params.id);
    countReview = filteredReviews.length;

    for (let i = 0; i < filteredReviews.length; ++i) {
        rating += filteredReviews[i].rate;
    }

    function renderStars(rating) {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars.push(<FaStar key={i} style={{ color: "gold" }} />);
            } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
                stars.push(<FaStarHalfAlt key={i} style={{ color: "gold" }} />);
            } else {
                stars.push(<FaRegStar key={i} />);
            }
        }
        return stars;
    }

    return <>
        <div className="container bg-light">
            <main className="row d-flex justify-content-around mt-4">
                <div className="col-xl-4 col-lg-4 col-md-4">
                    <Card.Img
                        variant="top"
                        src={product.image ? `${imageUrl}` : ""}
                        style={{
                            width: '30em',
                            height: '30em',
                        }} />
                </div>
                {/* src={product.image ? `${domainName}/images/products/${product.image}` : ""} */}
                <div className="col-xl-4 col-lg-4 col-md-4">
                    <div className="product-info">
                        <div className="product-title">
                            <h1 style={{ color: "#373737" }}>{product.product_name}</h1>
                        </div>
                        <div className="product-rating d-flex align-items-end" style={{ color: "#767693" }}>
                            <span className="rating-score me-2" style={{ color: "#D0011B" }}><u>{(rating / filteredReviews.length) ? (rating / filteredReviews.length).toFixed(1) : 0}</u></span>
                            <span className="rating-count me-3">{renderStars(rating / filteredReviews.length)}</span>
                            <span>|</span>
                            <span className="rating-count ms-3">{countReview} Đánh Giá</span>
                            <span>|</span>
                            <span className="rating-count ms-3">{product.quantity_sold} Đã bán</span>
                        </div>
                        <div className="product-price d-flex align-items-center justify-content-between mt-3" style={{ backgroundColor: "#f6f6f6", height: "3em", padding: "0 1rem" }}>
                            <span className="original-price" style={{ color: "#9C9191", fontSize: "1.5rem", textDecoration: "line-through", lineHeight: "auto" }}><sup><u>đ</u></sup>{product.cost}đ</span>
                            <span className="discounted-price" style={{ color: "#d0011b", fontSize: "2rem", fontWeight: "normal" }}>
                                <sup style={{ color: "#d0011b", fontSize: "1.5rem", fontWeight: "lighter" }}><u>đ</u></sup>
                                {product.price}
                            </span>
                            <span className="discount-percentage" style={{ background: "#D0011B", color: "#fff", padding: "0.2rem 0.5rem", borderRadius: "0.2rem" }}>{Math.round((1 - (product.price / product.cost)) * 100)}% GIẢM</span>
                        </div>
                        {userLogin ?
                            <>
                                <div className="quantity-controls d-flex mt-4 align-items-center">
                                    <button
                                        onClick={() => number > 0 ? setNumber(number - 1) : 0}
                                        className="decrement btn btn-outline-secondary">-</button>
                                    <input type="text" className="form-control text-center" value={number} min={0} readOnly style={{ width: "3em" }} />
                                    <button
                                        onClick={() => setNumber(number + 1)}
                                        className="increase btn btn-outline-secondary">+</button>
                                    <div className="ms-2">{product.quantity} sản phẩm có sẵn</div>
                                </div>
                                <div className="product-promotion mt-10">
                                    <button className="btn btn-primary mt-4" onClick={event => handlePostCart(event, number, userLoginId, productId)}>Add to cart</button>
                                </div>
                            </>
                            :
                            <>
                            </>
                        }
                    </div>
                </div>
            </main>
        </div>
        <div className="container" style={{ background: "#F5F5F5" }}>
            <main className="row d-flex justify-content-around mt-5">
                <div className="col-xl-10 col-lg-10 col-md-10 bg-light" >
                    <h2 style={{ padding: '20px 0', borderBottom: '1px solid #e0e0e0' }}>ĐÁNH GIÁ SẢN PHẨM</h2>
                    {filteredCart.length > 0 && (
                        <form onSubmit={handlePostReview} className="mb-4">
                            <h3>Viết đánh giá của bạn</h3>
                            <div className="form-group">
                                <label htmlFor="rating">Đánh giá:</label>
                                <select
                                    id="rating"
                                    className="form-control"
                                    name="rate"
                                >
                                    <option value="0">----Rating---</option>
                                    <option value="1">1 sao</option>
                                    <option value="2">2 sao</option>
                                    <option value="3">3 sao</option>
                                    <option value="4">4 sao</option>
                                    <option value="5">5 sao</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="content">Nội dung đánh giá:</label>
                                <textarea
                                    id="content"
                                    className="form-control"
                                    name="content"
                                    placeholder="Nhập nội dung đánh giá tối đa 500 chữ"
                                    rows="3"
                                ></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="image">Hình ảnh:</label>
                                <input type="file" className="form-control" name="image" required placeholder="Thêm hình ảnh sản phẩm" />
                            </div>
                            <button type="submit" className="btn btn-primary mt-2">Gửi đánh giá</button>
                        </form>
                    )}

                    {filteredReviews.map((review, id) => (
                        <div key={id} style={{ borderBottom: '1px solid #e0e0e0', padding: '20px 0' }}>
                            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                                <img src={'default-avatar.png'} alt="User Avatar" style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }} />
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: 'bold' }}>{review.customer.username}</div>
                                    <span className="rating-count me-3">{renderStars(review.rate)}</span>
                                    <div style={{ color: '#888', fontSize: '14px', marginTop: '5px' }}>
                                        {review.date_updated ? review.date_updated : review.date_created}
                                    </div>
                                    <div style={{ marginTop: '10px' }}>{review.content}</div>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' }}>
                                        {review.image && (
                                            <img src={`${review.imageUrl}`} alt="Review" style={{ width: '80px', height: '80px', objectFit: 'cover' }} />
                                        )}
                                    </div>
                                </div>
                                {userLogin ?
                                    (review.customer.customerId === userLogin.result.customer_id ?
                                        <>
                                            <button className="btn btn-primary btn-sm mt-2" onClick={event => handleUpdateReview(event, review.review_id)} >Chỉnh sửa</button>
                                            <button className="btn btn-danger btn-sm mt-2 ms-2" onClick={event => handleDeleteReview(event, review.review_id)} >Xóa</button>
                                        </>
                                        :
                                        <div></div>
                                    )
                                    :
                                    <></>
                                }
                            </div>
                            <UpdateReviewModal
                                show={editModalShow}
                                setIsUpdated={setIsUpdated}
                                review={editReview}
                                onHide={EditModelClose}
                                reviews={review}
                                reviewId={review.review_id === editReview}
                                product={product}
                                userloginid={userLoginId}
                            />
                        </div>

                    ))}
                    <div>Tổng số đánh giá: {countReview}</div>
                    <div>Đánh giá trung bình: {(rating / filteredReviews.length) ? (rating / filteredReviews.length).toFixed(1) : 0}</div>
                </div>
                <div className="col-xl-2 col-lg-2 col-md-2 mt-10 bg-light">
                </div>
            </main>
        </div>
    </>
}

export default ProductsHome;