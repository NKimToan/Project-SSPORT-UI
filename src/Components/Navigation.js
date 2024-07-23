import { NavLink, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import UserMenu from "./UserMenu";
import logo from "../Images/logosport.png";
import { CustomerLogOut } from "../Services/LogoutServices/CustomerLogout";
import { AdminLogOut } from "../Services/LogoutServices/AdminLogout";
import { getToken } from "../Services/TokenServices/TokenService";
import GetMyCustomer from "../Services/CustomerServices/GetMyCustomer";
import GetMyAdmin from "../Services/AdminServices/GetMyAdmin";
import { jwtDecode } from "jwt-decode";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

function Navigation({ userLogin, setUserLogin }) {

    const navigate = useNavigate();
    const role = userLogin ? userLogin.result.role : {};
    const accessToken = getToken();
    const decoded = accessToken ? jwtDecode(accessToken) : "";

    useEffect(() => {
        const accessToken = getToken();

        if (decoded.scope === "ROLE_ADMIN") {
            const getMyUser = async (accessToken) => {
                const data = await GetMyAdmin(accessToken);
                setUserLogin(data);
            }
            if (accessToken) {
                getMyUser(accessToken);
            }
        } else {
            const getMyUser = async (accessToken) => {
                const data = await GetMyCustomer(accessToken);
                setUserLogin(data);
            }
            if (accessToken) {
                getMyUser(accessToken);
            }
        }

    }, [setUserLogin, accessToken, decoded.scope]);

    const handleLogout = () => {
        if (decoded.scope === "ROLE_ADMIN") {
            AdminLogOut();
        } else {
            CustomerLogOut();
        }
        setUserLogin(null);
        navigate("/login");
    }

    return (
        <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light p-0" style={{ backgroundColor: '#E8F0FE' }}>
                <NavLink className="navbar-brand p-0" to="/">
                    <img
                        src={logo}
                        alt=""
                        className="logo"
                        style={{ width: '8rem', height: '4rem' }} />
                </NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item active">
                            <NavLink className="nav-link" to="/" style={{ fontSize: '1.2rem' }}>Home</NavLink>
                        </li>
                        {role === "ADMIN" &&
                            <li className="nav-item dropdown">
                                <NavLink
                                    className="nav-link dropdown-toggle"
                                    to="/"
                                    id="navbarDropdown"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                    style={{ fontSize: '1.2rem' }}>
                                    Manage
                                </NavLink>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <NavLink className="dropdown-item" to="/manage_customer">Account</NavLink>
                                    <div className="dropdown-divider m-0"></div>
                                    <NavLink className="dropdown-item" to="/manage_category">Category</NavLink>
                                    <div className="dropdown-divider m-0"></div>
                                    <NavLink className="dropdown-item" to="/manage_product">Product</NavLink>
                                    <div className="dropdown-divider m-0"></div>
                                    <NavLink className="dropdown-item" to="/manage-promotion">Promotion</NavLink>
                                    <div className="dropdown-divider m-0"></div>
                                    <NavLink className="dropdown-item" to="/manage-invoice">Invoice</NavLink>
                                </div>
                            </li>
                        }
                    </ul>
                    <form className="form-inline my-2 my-lg-0 d-flex">
                        <input className="form-control mr-sm-2 me-2" type="search" placeholder="Tìm kiếm" aria-label="Search" />
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit" style={{ fontSize: '1.2rem' }}>Search</button>
                    </form>
                    {userLogin ?
                        (
                            <>
                                <NavLink to="/cart" className="nav-item nav-cart btn btn-accent">
                                    <FontAwesomeIcon icon={faShoppingCart} style={{ fontSize: '1.5rem' }} />
                                </NavLink>
                                <UserMenu userLogin={userLogin} handleLogout={handleLogout} style={{ fontSize: '1.2rem' }} />
                            </>
                        )
                        :
                        (
                            <div className="nav-item dropdown">
                                <div
                                    className="dropdown-toggle navbar-brand p-2"
                                    id="navbarDropdown"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                ><FontAwesomeIcon icon={faUser} style={{ fontSize: '1.5rem' }} />
                                </div>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <NavLink className="navbar-brand p-2 dropdown-item" to="/login" style={{ fontSize: '1.2rem' }}>Đăng nhập</NavLink>
                                    <div className="dropdown-divider m-0"></div>
                                    <NavLink className="navbar-brand p-2 dropdown-item" to="/admin/login" style={{ fontSize: '1.2rem' }}>Quản trị viên</NavLink>
                                </div>
                            </div>
                        )
                    }
                </div>
            </nav>
        </div>
    )
}

export default Navigation;