import { useState, useEffect } from "react";
import GetAllInvoice from "../Services/InvoiceServices/GetAllInvoice";
import DeleteInvoice from "../Services/InvoiceServices/DeleteInvoice";
import { getToken } from "../Services/TokenServices/TokenService";

function InvoiceManage() {
    const [invoices, setInvoices] = useState([]);
    const [isUpdated, setIsUpdated] = useState(false);
    useEffect(() => {

        document.title = "Quản lý hóa đơn";
        const accessToken = getToken();
        GetAllInvoice(accessToken)
            .then(data => {
                setInvoices(data.result);
            })
            .catch(error => console.log(error));
        return (() => { setIsUpdated(false) })

    }, [isUpdated])



    const handleDelete = (e, invoiceId) => {
        e.preventDefault();
        if (window.confirm("Do you want to delete this invoice?")) {
            const accessToken = getToken();
            DeleteInvoice(accessToken, invoiceId)
                .then(result => { setIsUpdated(true) });
        }
    }

    return <div className="container">
        <main className="table-responsive-md table-responsive-lg mt-4">
            <table className="table">
                <thead className="table-primary p-5 bg-opacity-50">
                    <tr>
                        <th>Mã hóa đơn</th>
                        <th>Ngày tạo</th>
                        <th>Người mua</th>
                        <th>Số lượng</th>
                        <th>Tổng tiền</th>
                        <th>Xóa</th>
                    </tr>
                </thead>
                <tbody>
                    {invoices.map((invoice, id) => (
                        <tr key={id}>
                            <td>{invoice.invoice_id}</td>
                            <td>{invoice.date_created}</td>
                            <td>{invoice.customer_id.username}</td>
                            <td>{invoice.quantity}</td>
                            <td>{invoice.final_price}</td>
                            <td>
                                <button className="btn btn-danger btn-sm" onClick={event => handleDelete(event, invoice.invoice_id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main >

    </div>
}

export default InvoiceManage;