import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { getToken } from '../../Services/TokenServices/TokenService';
import PostProduct from "../../Services/ProductServices/PostProduct";

const AddProductModal = ({ setIsUpdated, userLogin, ...props }) => {

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const accessToken = getToken();
            const productName = e.target.productName.value;
            const image_file = e.target.image.files[0];
            const quantity = e.target.quantity.value;
            const cost = e.target.cost.value;
            const unit = e.target.unit.value;
            const category_id = e.target.category.value;

            const formData = new FormData();
            formData.append('productName', productName);
            formData.append('image', image_file);
            formData.append('quantity', quantity);
            formData.append('cost', cost);
            formData.append('unit', unit);
            formData.append('category_id', category_id);
            PostProduct(accessToken, formData)
                .then((result) => {
                    if (result !== "This product existed") {
                        e.target.reset();
                        props.onHide(true);
                        setIsUpdated(true);
                    } else {
                        alert("This product already exist")
                        e.target.reset();
                        props.onHide(true);
                        setIsUpdated(true);
                    }

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
                    <h2>Thêm sản phẩm mới</h2>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="form-group">
                            <label></label>
                            <input type="text" className="form-control" name="productName" required placeholder="Nhập tên sản phẩm" maxLength={50} />
                        </div>
                        <div className="form-group">
                            <label></label>
                            <input type="file" className="form-control" name="image" required placeholder="Thêm hình ảnh sản phẩm" />
                        </div>
                        <div className="form-group">
                            <label></label>
                            <input type="number" className="form-control" name="quantity" required placeholder="Nhập số lượng sản phẩm" min={0} />
                        </div>
                        <div className="form-group">
                            <label></label>
                            <input type="number" className="form-control" name="cost" required placeholder="Nhập giá gốc sản phẩm" min={0} />
                        </div>
                        <div className="form-group">
                            <label></label>
                            <select className="form-control" name="unit" required>
                                <option value="">---Chọn đơn vị tính ---</option>
                                <option value="Cái">Cái</option>
                                <option value="Kg">Kg</option>
                                <option value="Lít">Lít</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label></label>
                            <select className="form-control" name="category" required>
                                <option value="">---Chọn danh mục cho sản phẩm---</option>
                                {props.categories.map((category, id) => (
                                    <option key={id} value={category.category_id}>{category.category_name}</option>
                                ))}
                            </select>
                        </div>
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

export default AddProductModal;