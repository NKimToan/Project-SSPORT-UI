import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getToken, setToken } from "../../Services/TokenServices/TokenService";
import CustomerLogin from "../../Services/LoginServices/CustomerLogin";

function CustomersLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = getToken();
        if (accessToken) {
            navigate("/");
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let response = await CustomerLogin(username, password);
            const messageError = "Customer doesn't exist";
            if (response && response !== messageError) {
                if (response !== "Username or password incorrect") {
                    setToken(response.result?.token);
                    navigate("/");
                } else {
                    setError("Password Incorect");
                }
            } else if (response && response === messageError) {
                setError(response);
            }
        } catch (err) {
            console.error('Login failed', err);
        }
    }

    return (
        <section className="vh-100">
            <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-12 col-xl-11">
                        <div className="card text-black">
                            <div className="card-body p-md-5">
                                <div className="row justify-content-center">
                                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Đăng nhập</p>
                                        <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>

                                            <div className="d-flex flex-row align-items-center mb-2">
                                                <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                <div data-mdb-input-init className="form-outline flex-fill mb-0">
                                                    <input
                                                        type="text"
                                                        id="form3Example1c"
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
                                                        id="form3Example4c"
                                                        className="form-control"
                                                        name="password"
                                                        placeholder='Nhập password'
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                        required />
                                                    <label className="form-label"></label>
                                                </div>
                                            </div>
                                            {error && <p style={{ color: 'red' }}>{error}</p>}
                                            <div className="d-flex justify-content-center mb-2">
                                                <button type="submit" data-mdb-button-init data-mdb-ripple-init
                                                    className="btn btn-primary btn-lg">Đăng nhập</button>
                                            </div>
                                            <div className="d-flex justify-content-center ">
                                                <div className="me-2">
                                                    <p className="text-center">Bạn chưa có tài khoản?</p>
                                                </div>
                                                <div className="sm-2">
                                                    <NavLink to='/register'>Đăng ký</NavLink>
                                                </div>
                                            </div>

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
export default CustomersLogin;