import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { getToken } from '../../Services/TokenServices/TokenService';
import PutPromotion from "../../Services/PromotionServices/PutPromotion";


const UpdatePromotionModal = ({ setIsUpdated, promotions, promotionId, ...props }) => {

    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const accessToken = getToken();
            const promotionName = e.target.promotionName.value;
            const date_created = e.target.date_created.value;
            const date_end = e.target.date_end.value;
            const discount = e.target.discount.value;

            if (date_created > date_end) {
                setError("Promotion period is not valid");
            } else {
                PutPromotion(accessToken, props.promotion, promotionName, date_created, date_end, discount)
                    .then((result) => {
                        e.target.reset();
                        setError("");
                        props.onHide(true);
                        setIsUpdated(true);
                    })
                    .catch((error) => {
                        console.error('Update category error:', error);
                    })
            }
        } catch (error) {
            console.log("Updated error: ", error);
        }
    }

    return (
        <div className="container">
            {promotionId ?
                <Modal
                    {...props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header>
                        <h2>Cập nhật chương trình khuyến mãi</h2>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={handleSubmit}>
                            {promotions.map((promotion, id) => (
                                promotion.promotion_id === props.promotion ?
                                    <div key={promotion.promotion_id}>
                                        <div className="form-group">
                                            <label></label>
                                            <input type="text" className="form-control" name="promotionName" required placeholder="Nhập tên chương trình khuyến mãi" defaultValue={promotion.promotion_name} maxLength={50} />
                                        </div>
                                        <div className="form-group">
                                            <label></label>
                                            <input type="date" className="form-control" name="date_created" required placeholder="Ngày bắt đầu" defaultValue={promotion.date_created} />
                                        </div>
                                        <div className="form-group">
                                            <label></label>
                                            <input type="date" className="form-control" name="date_end" required placeholder="Ngày kết thúc" defaultValue={promotion.date_End} />
                                        </div>
                                        <div className="form-group">
                                            <label></label>
                                            <input type="number" className="form-control" step="0.01" name="discount" required placeholder="Giá chiết khấu" defaultValue={promotion.discount} min={0} max={1} />
                                        </div>
                                    </div>
                                    :
                                    <div key={promotion.promotion_id}></div>
                            ))}
                            <p></p>
                            {error && <p style={{ color: 'red' }}>{error}</p>}
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

export default UpdatePromotionModal;
