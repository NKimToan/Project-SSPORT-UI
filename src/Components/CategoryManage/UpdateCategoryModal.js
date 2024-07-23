import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import PutCategory from "../../Services/CategoryServices/PutCategory";
import { getToken } from '../../Services/TokenServices/TokenService';

const UpdateCategoryModal = ({ setIsUpdated, categories, categoryId, ...props }) => {
    const handleSubmit = async (e) => {
        try {

            e.preventDefault();
            const accessToken = getToken();
            const category_name = e.target.name.value;
            const image_file = e.target.image.files[0];
            const promotion = [...e.target.promotion].filter(p => p.checked).map(p => p.value);
            const formData = new FormData();
            formData.append('categoryName', category_name);
            formData.append('image', image_file);
            formData.append('promotion', promotion);

            PutCategory(accessToken, formData, props.category)
                .then((result) => {
                    console.log("Chạy vào result: ", result)
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
            {categoryId ?
                <Modal
                    {...props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header>
                        <h2>Cập nhật danh mục sản phẩm</h2>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                            {categories.map((category, id) => (
                                category.category_id === props.category ?
                                    <div key={category.category_id}>
                                        <div className="form-group">
                                            <label></label>
                                            <input type="text" className="form-control" name="name" required placeholder="Nhập tên danh mục" defaultValue={category.category_name} maxLength={50} />
                                        </div>
                                        <div className="form-group">
                                            <label></label>
                                            <input type="file" className="form-control" name="image" required placeholder='Cập nhật hình ảnh' />
                                            <p>File đang được chọn: {category.image}</p>
                                        </div>
                                        <div className="form-group">
                                            <h5><b>Chọn các chương trình khuyến mãi</b></h5>
                                            {props.promotions.map((pro, id) => {
                                                const isChecked = category.promotion.some(p => p.promotion_name === pro.promotion_name);
                                                return (
                                                    <div key={id} className="d-flex align-items-center mt-1">
                                                        <input
                                                            type="checkbox"
                                                            name="promotion"
                                                            required={isChecked}
                                                            defaultChecked={isChecked}
                                                            defaultValue={pro.promotion_id}
                                                            style={{ width: "1.5em", height: "1.5em" }}
                                                            className="ms-2 mb-0" />
                                                        <label name="promotion" className="form-label ms-2 mb-0">
                                                            {pro.promotion_name}
                                                        </label>
                                                    </div>
                                                );
                                            })}
                                        </div>

                                    </div>
                                    :
                                    <div key={category.category_id}></div>
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

export default UpdateCategoryModal;
