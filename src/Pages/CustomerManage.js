import { useState, useEffect } from "react";
import { getToken } from "../Services/TokenServices/TokenService";
import GetAllCustomer from "../Services/CustomerServices/GetAllCustomer";
import DeleteCustomer from "../Services/CustomerServices/DeleteCustomer";

function CategoryManage() {
    const [customers, setCustomers] = useState([]);
    const [isUpdated, setIsUpdated] = useState(false);
    useEffect(() => {
        const accessToken = getToken();
        document.title = "Quản lý tài khoản khách hàng";
        GetAllCustomer(accessToken)
            .then(data => {
                setCustomers(data.result);
            })
            .catch(error => console.log(error));


        return (() => { setIsUpdated(false) })

    }, [isUpdated])

    const handleDelete = (e, customerId) => {
        e.preventDefault();
        if (window.confirm("Do you want to delete this customer?")) {
            const accessToken = getToken();
            DeleteCustomer(accessToken, customerId)
                .then(result => { setIsUpdated(true) });
        }
    }

    return <div className="container">
        <main className="table-responsive-md table-responsive-lg mt-4 text-center my-4">
            <table className="table">
                <thead className="p-5 table-primary bg-opacity-50">
                    <tr>
                        <th>Tên đăng nhập</th>
                        <th>Họ</th>
                        <th>Tên</th>
                        <th>Ngày sinh</th>
                        <th>Số điện thoại</th>
                        <th>Địa chỉ</th>
                        <th>Giới tính</th>
                        <th>Xóa</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customer, id) => (
                        <tr key={id}>
                            <td>{customer.username}</td>
                            <td>{customer.lastname}</td>
                            <td>{customer.firstname}</td>
                            <td>{customer.dob}</td>
                            <td>{customer.phone_number}</td>
                            <td>{customer.address}</td>
                            <td>{customer.gender}</td>
                            <td>
                                <button className="btn btn-danger btn-sm" onClick={event => handleDelete(event, customer.customer_id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main >
    </div>
}

export default CategoryManage;
