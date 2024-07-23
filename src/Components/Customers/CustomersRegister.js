import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import CustomerRegister from "../../Services/CustomerServices/CustomerRegister";

function CustomersRegister() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [password1, setPassword1] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [dob, setDob] = useState("");
    const [address, setAddress] = useState("");
    const [gender, setGender] = useState("");
    const [phone_number, setPhone_number] = useState("");
    const [token, setToken] = useState("");
    const [error, setError] = useState("");

    document.title = "Đăng ký tài khoản";
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (password !== password1) {
                alert("Password don't match");
                navigate("/register");
            }
            else {
                const admin_id = 1;
                const formData = new FormData();
                formData.append("username", username);
                formData.append("password", password);
                formData.append("firstname", firstname);
                formData.append("lastname", lastname);
                formData.append("dob", dob);
                formData.append("address", address);
                formData.append("gender", gender);
                formData.append("admin_id", admin_id);
                formData.append("phone_number", phone_number);
                let response = await CustomerRegister(formData);
                if (response && response !== "Customer existed") {
                    setToken(response.result?.token);
                    navigate("/login");
                } else {
                    alert(response);
                    navigate("/login");
                }
            }
        } catch (err) {
            console.error('Login failed', err);
            setError("Username/Password not corect");
        }

    }
    return (
        <section className="mt-4">
            <div className="container ">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-12 col-xl-11">
                        <div className="card text-black">
                            <div className="card-body p-md-5">
                                <div className="row justify-content-center">
                                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Đăng ký</p>
                                        <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>

                                            <div className="d-flex flex-row align-items-center mb-2">
                                                <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                <div data-mdb-input-init className="form-outline flex-fill mb-0">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="username"
                                                        placeholder='Nhập Username'
                                                        value={username}
                                                        onChange={(e) => setUsername(e.target.value)}
                                                        maxLength={50}
                                                        required />
                                                    <label className="form-label"></label>
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-2">
                                                <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                <div data-mdb-input-init className="form-outline flex-fill mb-0">
                                                    <input
                                                        type="password"
                                                        className="form-control"
                                                        name="password"
                                                        placeholder='Nhập password'
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                        required />
                                                    <label className="form-label"></label>
                                                </div>
                                            </div>
                                            <div className="d-flex flex-row align-items-center mb-2">
                                                <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                <div data-mdb-input-init className="form-outline flex-fill mb-0">
                                                    <input
                                                        type="password"
                                                        className="form-control"
                                                        name="password"
                                                        placeholder='Nhập lại password'
                                                        value={password1}
                                                        onChange={(e) => setPassword1(e.target.value)}
                                                        required
                                                    />
                                                    <label className="form-label"></label>
                                                </div>
                                            </div>
                                            <div className="d-flex flex-row align-items-center mb-2">
                                                <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                <div data-mdb-input-init className="form-outline flex-fill mb-0">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="first_name"
                                                        placeholder="Firstname"
                                                        value={firstname}
                                                        onChange={(e) => setFirstname(e.target.value)}
                                                        maxLength={20}
                                                        required
                                                    />
                                                    <label className="form-label"></label>
                                                </div>
                                            </div>
                                            <div className="d-flex flex-row align-items-center mb-2">
                                                <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                <div data-mdb-input-init className="form-outline flex-fill mb-0">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="last_name"
                                                        placeholder="Lastname"
                                                        value={lastname}
                                                        onChange={(e) => setLastname(e.target.value)}
                                                        maxLength={30}
                                                        required
                                                    />
                                                    <label className="form-label"></label>
                                                </div>
                                            </div>
                                            <div className="d-flex flex-row align-items-center mb-2">
                                                <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                <div data-mdb-input-init className="form-outline flex-fill mb-0">
                                                    <input
                                                        type="date"
                                                        className="form-control"
                                                        name="dob"
                                                        placeholder="Date of birth"
                                                        value={dob}
                                                        onChange={(e) => setDob(e.target.value)}
                                                        required
                                                    />
                                                    <label className="form-label"></label>
                                                </div>
                                            </div>
                                            <div className="d-flex flex-row align-items-center mb-2">
                                                <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                <div data-mdb-input-init className="form-outline flex-fill mb-0">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="phone_number"
                                                        placeholder="Phonenumber"
                                                        value={phone_number}
                                                        onChange={(e) => setPhone_number(e.target.value)}
                                                        maxLength={10}
                                                        required
                                                    />
                                                    <label className="form-label"></label>
                                                </div>
                                            </div>
                                            <div className="d-flex flex-row align-items-center mb-2">
                                                <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                <div data-mdb-input-init className="form-outline flex-fill mb-0">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="address"
                                                        placeholder="Address"
                                                        value={address}
                                                        onChange={(e) => setAddress(e.target.value)}
                                                        maxLength={100}
                                                        required
                                                    />
                                                    <label className="form-label"></label>
                                                </div>
                                            </div>
                                            <div className="d-flex mb-2">
                                                <div className="d-flex flex-row align-items-center mb-2">
                                                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                    <div data-mdb-input-init className="d-flex align-items-center">
                                                        <input
                                                            type="radio"
                                                            name="gender"
                                                            value="Nam"
                                                            onChange={(e) => setGender(e.target.value)}
                                                            style={{ width: "1.5em", height: "1.5em" }}
                                                        />
                                                        <label className="form-label ms-2 mb-0">Nam</label>
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-row align-items-center mb-2">
                                                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                    <div data-mdb-input-init className="d-flex align-items-center" >
                                                        <input
                                                            type="radio"
                                                            name="gender"
                                                            value="Nữ"
                                                            onChange={(e) => setGender(e.target.value)}
                                                            style={{ width: "1.5em", height: "1.5em" }}
                                                        />
                                                        <label className="form-label ms-2 mb-0">Nữ</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4 me-2">
                                                <button type="submit" data-mdb-button-init data-mdb-ripple-init
                                                    className="btn btn-primary btn-lg">Đăng ký</button>
                                            </div>
                                            <p className="text-center h6 fw-bold mb-5 mx-1 mx-md-4 mt-4">Bạn đã có tài khoản?
                                                <Link to="/login" className="ms-2">Đăng nhập</Link>
                                            </p>
                                        </form>

                                    </div>
                                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                                            className="img-fluid" alt="" />

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </section >
    )
}
export default CustomersRegister;