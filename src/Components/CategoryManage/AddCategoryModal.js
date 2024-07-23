import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import PostCategory from "../../Services/CategoryServices/PostCategory";
import { getToken } from '../../Services/TokenServices/TokenService';


const AddCategoryModal = ({ setIsUpdated, userLogin, ...props }) => {

    const handleSubmit = async (e) => {
        try {

            e.preventDefault();
            const accessToken = getToken();
            const category_name = e.target.name.value;
            const image_file = e.target.image.files[0];
            const formData = new FormData();
            formData.append('categoryName', category_name);
            formData.append('image', image_file);

            PostCategory(formData, accessToken)
                .then((result) => {
                    if (result !== "This category existed") {
                        e.target.reset();
                        props.onHide(true);
                        setIsUpdated(true);
                    } else {
                        alert("This category already exists")
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
                    <h2>Thêm danh mục sản phẩm</h2>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="form-group">
                            <label></label>
                            <input type="text" className="form-control" name="name" required placeholder="Nhập tên sản phẩm" maxLength={50} />
                        </div>
                        <div className="form-group">
                            <label></label>
                            <input type="file" className="form-control" name="image" required placeholder="Thêm hình ảnh sản phẩm" />
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

export default AddCategoryModal;