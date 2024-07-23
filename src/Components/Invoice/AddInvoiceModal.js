import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import PostInvoice from "../../Services/InvoiceServices/PostInvoice"
import { getToken } from '../../Services/TokenServices/TokenService';


const AddProductModal = ({ setIsUpdated, userloginid, ...props }) => {
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const accessToken = getToken();
            const formData = new FormData();
            formData.append("customer_id", userloginid);
            PostInvoice(accessToken, formData)
                .then((result) => {
                    e.target.reset();
                    props.onHide(true);
                    setIsUpdated(true);
                })
                .catch((error) => {
                    console.error('Add product error:', error);
                })
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
                    <h2>Hóa đơn thanh toán</h2>
                </Modal.Header>
                <Modal.Body>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Sản phẩm</th>
                                <th>Đơn giá</th>
                                <th>Số lượng</th>
                                <th>Thành tiền</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.carts.map((cart, index) => (
                                <tr key={cart.cart_id}>
                                    <td>{index + 1}</td>
                                    <td>{cart.product_id.product_name}</td>
                                    <td>{cart.price} đ</td>
                                    <td>{cart.quantity}</td>
                                    <td>{cart.total_price} đ</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan="4" className="text-right"><strong>Tổng cộng:</strong></td>
                                <td><strong>{props.carts.reduce((total, cart) => total + cart.total_price, 0)} đ</strong></td>
                            </tr>
                        </tfoot>
                    </table>
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
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

export default AddProductModal;