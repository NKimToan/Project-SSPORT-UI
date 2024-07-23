import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { getToken } from '../../Services/TokenServices/TokenService';
import PostPromotion from "../../Services/PromotionServices/PostPromotion";

const AddPromotionModal = ({ setIsUpdated, userLogin, ...props }) => {

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
                alert("The end date must be greater than the start date.")
            } else {
                PostPromotion(accessToken, promotionName, date_created, date_end, discount)
                    .then((result) => {
                        console.log("Chạy vào result");
                        e.target.reset();
                        setError("");
                        props.onHide(true);
                        setIsUpdated(true);
                    })
                    .catch((error) => {
                        console.error('Add product error:', error);
                    })
            }
        } catch (error) {
            console.log("Error checking login status: ", error);
        }
    }
    return (
        <div className="container">
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header>
                    <h2>Thêm chương trình khuyến mãi</h2>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label></label>
                            <input type="text" className="form-control" name="promotionName" required placeholder="Nhập tên chương trình khuyến mãi" maxLength={50} />
                        </div>
                        <div className="form-group">
                            <label></label>
                            <input type="date" className="form-control" name="date_created" required placeholder="Ngày bắt đầu" />
                        </div>
                        <div className="form-group">
                            <label></label>
                            <input type="date" className="form-control" name="date_end" required placeholder="Ngày kết thúc" />
                        </div>
                        <div className="form-group">
                            <label></label>
                            <input type="number" className="form-control" step="0.01" name="discount" required placeholder="Giá chiết khấu" min={0} max={1} />
                        </div>
                        <p></p>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        <p></p>
                        <Button variant="primary" type="submit" onClick={props.onHide}>
                            Tạo
                        </Button>
                    </form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="danger" type="submit" onClick={props.onHide}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
        </div >
    );
};

export default AddPromotionModal;