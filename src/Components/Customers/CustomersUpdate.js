import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../Services/TokenServices/TokenService"
import UpdateCustomer from "../../Services/CustomerServices/UpdateCustomer";

function UpdatePassword({ userLogin, ...props }) {
    const navigate = useNavigate();
    const handleChangePassword = (e) => {
        e.preventDefault();
        const firstname = e.target.firstname.value;
        const lastname = e.target.lastname.value;
        const dob = e.target.dob.value;
        const address = e.target.address.value;
        const phone_number = e.target.phone_number.value;
        const gender = e.target.gender.value;
        const accessToken = getToken();
        const formData = new FormData();
        formData.append("username", userLogin.username);
        formData.append("password", userLogin.password);
        formData.append("firstname", firstname);
        formData.append("lastname", lastname);
        formData.append("dob", dob);
        formData.append("address", address);
        formData.append("gender", gender);
        formData.append("admin_id", userLogin.admin.admin_id);
        formData.append("phone_number", phone_number);

        UpdateCustomer(userLogin.customer_id, accessToken, formData)
            .then(res => {
                console.log("Update customer succesfull");
                navigate('/');
            })
            .catch(error => {
                console.log("Error update customer");
                console.log(error);
            })


    }
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header>
                <h2>Thiết lập tài khoản</h2>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleChangePassword}>
                    <div className="form-group">
                        <label></label>
                        <input type="text" className="form-control" name="username" required defaultValue={userLogin ? userLogin.username : ""} readOnly />
                    </div>
                    <div className="form-group d-none">
                        <label></label>
                        <input type="password" className="form-control" name="password" required defaultValue={userLogin ? userLogin.password : ""} readOnly />
                    </div>
                    <div className="form-group">
                        <label></label>
                        <input type="text" className="form-control" name="firstname" required defaultValue={userLogin ? userLogin.firstname : ""} />
                    </div>
                    <div className="form-group">
                        <label></label>
                        <input type="text" className="form-control" name="lastname" required defaultValue={userLogin ? userLogin.lastname : ""} />
                    </div>
                    <div className="form-group">
                        <label></label>
                        <input type="date" className="form-control" name="dob" required defaultValue={userLogin ? userLogin.dob : ""} />
                    </div>
                    <div className="form-group">
                        <label></label>
                        <input type="text" className="form-control" name="address" required defaultValue={userLogin ? userLogin.address : ""} />
                    </div>
                    <div className="form-group">
                        <label></label>
                        <input type="text" className="form-control" name="phone_number" required defaultValue={userLogin ? userLogin.phone_number : ""} />
                    </div>
                    <div className="form-group">
                        <input type="radio" value="Nam" name="gender" required defaultChecked={userLogin.gender === "Nam"} />
                        <label className="form-label me-2 mb-0 mt-1">Nam</label>
                        <input type="radio" value="Nữ" name="gender" required defaultChecked={userLogin.gender === "Nữ"} />
                        <label className="form-label mt-1">Nữ</label>
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