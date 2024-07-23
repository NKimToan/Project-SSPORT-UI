import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import PutReview from "../../Services/ReviewServices/PutReview";
import { getToken } from '../../Services/TokenServices/TokenService';

const UpdateReviewModal = ({ setIsUpdated, reviews, reviewId, ...props }) => {
    const handleSubmit = async (e) => {
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
            formData.append('customer_id', props.userloginid);
            formData.append('product_id', props.product.product_id);

            PutReview(accessToken, props.review, formData)
                .then((result) => {
                    e.target.reset();
                    props.onHide(true);
                    setIsUpdated(true);
                })
                .catch((error) => {
                    console.error('Update category error:', error);
                })
        } catch (error) {
            console.log("Updated error: ", error);
        }
    }

    return (
        <div className="container">
            {reviewId ?
                <Modal
                    {...props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header>
                        <h2>Cập nhật đánh giá</h2>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                            <div key={reviews.review_id}>
                                <div className="form-group">
                                    <label></label>
                                    <select className="form-control" name="rate" required>
                                        <option value={reviews.rate}>{reviews.rate} sao</option>
                                        <option value="1">1 sao</option>
                                        <option value="2">2 sao</option>
                                        <option value="3">3 sao</option>
                                        <option value="4">4 sao</option>
                                        <option value="5">5 sao</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label></label>
                                    <textarea type="text" rows="3" className="form-control" name="content" required placeholder="Nhập đánh giá " defaultValue={reviews.content} />
                                </div>
                                <div className="form-group">
                                    <label></label>
                                    <input type="file" className="form-control" name="image" required placeholder='Cập nhật hình ảnh' />
                                    <p>File đang được chọn: {reviews.image}</p>
                                </div>
                            </div>
                            <p></p>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={props.onHide}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
                :
                <div></div>
            }
        </div >
    );
};

export default UpdateReviewModal;
