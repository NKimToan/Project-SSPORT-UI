import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import CustomersUpdate from "../Components/Customers/CustomersUpdate";
import UpdatePassword from "../Components/Customers/UpdatePassword";

function UserMenu({ userLogin, handleLogout }) {
    const role = userLogin ? userLogin.result.role : {};
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [showUpdateCustomer, setShowUpdateCustomer] = useState(false);

    const handleForgetPassword = (e) => {
        e.preventDefault();
        setShowChangePassword(true);
    }

    const handleUpdateCustomer = (e) => {
        e.preventDefault();
        setShowUpdateCustomer(true);
    }

    let AddModelUpdateClose = () => setShowUpdateCustomer(false);
    let AddModelClose = () => setShowChangePassword(false);

    return (
        <div className="nav-item dropdown">
            <div
                className="dropdown-toggle navbar-brand p-2"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false">
                {userLogin.result.username}
            </div>
            {userLogin &&
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    {role !== "ADMIN" && <>
                        <span className='dropdown-item' onClick={handleUpdateCustomer} style={{ cursor: 'pointer' }}>Thiết lập tài khoản</span>
                        <CustomersUpdate show={showUpdateCustomer} onHide={AddModelUpdateClose} userLogin={userLogin.result} />
                        <div className="dropdown-divider m-0"></div>
                        <span className='dropdown-item' onClick={handleForgetPassword} style={{ cursor: 'pointer' }}>Đổi mật khẩu</span>
                        <UpdatePassword show={showChangePassword} onHide={AddModelClose} userLogin={userLogin.result} />
                        <div className="dropdown-divider m-0"></div>
                    </>}
                    <NavLink className="dropdown-item bg-white text-dark" to="/" onClick={handleLogout}>Đăng xuất</NavLink>
                </div>
            }
        </div>
    )
}

export default UserMenu;