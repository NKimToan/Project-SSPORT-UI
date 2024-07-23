import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../Services/TokenServices/TokenService"
import UpdateCustomer from "../../Services/CustomerServices/UpdateCustomer";

function UpdatePassword({ userLogin, ...props }) {
    const navigate = useNavigate();
    const handleChangePassword = (e) => {
        e.preventDefault();
        const password1 = e.target.password1.value;
        const password2 = e.target.password2.value;
        const accessToken = getToken();
        const formData = new FormData();
        formData.append("username", userLogin.username);
        formData.append("password", password1);
        formData.append("firstname", userLogin.firstname);
        formData.append("lastname", userLogin.lastname);
        formData.append("dob", userLogin.dob);
        formData.append("address", userLogin.address);
        formData.append("gender", userLogin.gender);
        formData.append("admin_id", userLogin.admin.admin_id);
        formData.append("phone_number", userLogin.phone_number);

        if (password1 === password2) {
            UpdateCustomer(userLogin.customer_id, accessToken, formData)
                .then(res => {
                    console.log("Change Password succesfull");
                    navigate('/');
                })
                .catch(error => {
                    console.log("Error changing password");
                    console.log(error);
                })
        } else {
            console.log("Passwords do not match");
        }


    }
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header>
                <h2>Thay đổi mật khẩu</h2>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleChangePassword}>
                    <div className="form-group">
                        <label></label>
                        <input type="text" className="form-control" name="username" required defaultValue={userLogin ? userLogin.username : ""} readOnly />
                    </div>
                    <div className="form-group d-none">
                        <label></label>
                        <input type="text" className="form-control" name="firstname" required defaultValue={userLogin ? userLogin.firstname : ""} readOnly />
                    </div>
                    <div className="form-group d-none">
                        <label></label>
                        <input type="text" className="form-control" name="lastname" required defaultValue={userLogin ? userLogin.lastname : ""} readOnly />
                    </div>
                    <div className="form-group d-none">
                        <label></label>
                        <input type="date" className="form-control" name="dob" required defaultValue={userLogin ? userLogin.dob : ""} readOnly />
                    </div>
                    <div className="form-group d-none">
                        <label></label>
                        <input type="text" className="form-control" name="address" required defaultValue={userLogin ? userLogin.address : ""} readOnly />
                    </div>
                    <div className="form-group d-none">
                        <label></label>
                        <input type="text" className="form-control" name="phone_number" required defaultValue={userLogin ? userLogin.phone_number : ""} readOnly />
                    </div>
                    <div className="form-group d-none">
                        <label></label>
                        <input type="text" className="form-control" name="gender" required defaultValue={userLogin ? userLogin.gender : ""} readOnly />
                    </div>
                    <div className="form-group">
                        <label></label>
                        <input type="password" className="form-control" name="password1" required placeholder="Nhập mật khẩu mới" />
                    </div>
                    <div className="form-group">
                        <label></label>
                        <input type="password" className="form-control" name="password2" required placeholder="Nhập lại mật khẩu" />
                    </div>
                    <p></p>
                    <Button variant="primary" type="submit" onClick={props.onHide}>
                        Cập nhật
                    </Button>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" type="submit" onClick={props.onHide}>
                    Đóng
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default UpdatePassword;