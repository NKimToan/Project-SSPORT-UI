import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { getToken } from '../../Services/TokenServices/TokenService';
import PutProduct from "../../Services/ProductServices/PutProduct";

const UpdateProductModal = ({ setIsUpdated, products, productId, ...props }) => {

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

            PutProduct(accessToken, props.product, formData)
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
            {productId ?
                <Modal
                    {...props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header>
                        <h2>Cập nhật sản phẩm</h2>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                            {products.map((product, id) => (
                                product.product_id === props.product ?
                                    <div key={product.product_id}>
                                        <div className="form-group">
                                            <label></label>
                                            <input type="text" className="form-control" name="productName" required placeholder="Nhập tên sản phẩm" defaultValue={product.product_name} maxLength={50} />
                                        </div>
                                        <div className="form-group">
                                            <label></label>
                                            <input type="file" className="form-control" name="image" required placeholder='Cập nhật hình ảnh' />
                                            <p>File đang được chọn: {product.image}</p>
                                        </div>
                                        <div className="form-group">
                                            <label></label>
                                            <input type="number" className="form-control" name="quantity" required placeholder="Nhập số lượng sản phẩm" defaultValue={product.quantity} min={0} />
                                        </div>
                                        <div className="form-group">
                                            <label></label>
                                            <input type="number" className="form-control" name="cost" required placeholder="Nhập giá sản phẩm" defaultValue={product.cost} min={0} />
                                        </div>
                                        <div className="form-group">
                                            <label></label>
                                            <select className="form-control" name="unit" required>
                                                <option value={product.unit}>{product.unit}</option>
                                                <option value="Cái">Cái</option>
                                                <option value="Kg">Kg</option>
                                                <option value="Lít">Lít</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label></label>
                                            <select className="form-control" name="category" required>
                                                <option value={product.category_id.categoryId}>{product.category_id.categoryName}</option>
                                                {props.categories.map((category, id) => (
                                                    category.category_name !== product.category_id.categoryName ?
                                                        <option key={id} value={category.category_id}>{category.category_name}</option> : ""
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    :
                                    <div key={product.product_id}></div>
                            ))}
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

export default UpdateProductModal;
