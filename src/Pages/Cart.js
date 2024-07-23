import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import GetAllCart from "../Services/CartServices/GetAllCart.js"
import DeleteCart from "../Services/CartServices/DeleteCart.js"
import { domainName } from "../Domain/DomainName.js"
import { getToken } from "../Services/TokenServices/TokenService.js";
import AddInvoiceModal from "../Components/Invoice/AddInvoiceModal.js";

function Cart({ userLogin }) {

    const [carts, setCarts] = useState([]);
    const [isUpdated, setIsUpdated] = useState(false);
    const [addModalShow, setAddModalShow] = useState(false);
    const userLoginId = userLogin ? userLogin.result.customer_id : "";
    document.title = "Cart";

    useEffect(() => {
        const accessToken = getToken();
        GetAllCart(accessToken)
            .then(data => {
                setCarts(data.result);
            })
            .catch(error => console.log(error));

    }, [isUpdated])

    const handleDelete = (e, cartId) => {
        e.preventDefault();
        const accessToken = getToken();
        DeleteCart(accessToken, cartId)
            .then(result => { setIsUpdated(true) });
    }

    const filteredCart = carts.filter(cart => cart.customer_id.customerId === userLoginId && cart.pay_invoice !== 1);


    const totalPrice = filteredCart.reduce(
        (total, product) => total + product.price * product.quantity,
        0
    );

    const handleCreateInvoice = (e) => {
        e.preventDefault();
        setAddModalShow(true);
    }
    let AddModelClose = () => setAddModalShow(false);


    return (
        <div className="cart-layout container bg-light">
            <div>
                <h1 style={{ color: "primary" }}>Your Cart</h1>
                {filteredCart.length === 0 && (
                    <p>You have not added any product to your cart yet.</p>
                )}
                {filteredCart.length > 0 && (
                    <>
                        <table className="table table-cart" style={{ textAlign: 'center' }}>
                            <thead style={{ verticalAlign: 'middle' }}>
                                <tr>
                                    <th width="25%" className="th-product" >Image</th>
                                    <th width="30%" className="th-product" >Product</th>
                                    <th width="15%" >Unit price</th>
                                    <th width="10%" >Quanity</th>
                                    <th width="15%" >Total</th>
                                    <th width="5%" >Xóa</th>
                                </tr>
                            </thead>
                            <tbody style={{ verticalAlign: 'middle' }}>
                                {filteredCart.map((cart) => {
                                    return (
                                        <tr key={cart.cart_id} >
                                            <td >
                                                <Link to={`/${cart.product_id.category.categoryId}/product/${cart.product_id.productId}`}>
                                                    <img
                                                        src={`${domainName}/images/products/${cart.product_id.image}`}
                                                        width="70em"
                                                        height="70em"
                                                        alt="" /> {" "}
                                                </Link>
                                            </td>
                                            <td >{cart.product_id.productName}</td>
                                            <td >{cart.price}</td>
                                            <td >{cart.quantity}</td>
                                            <td >
                                                <strong><sup>đ</sup>{cart.total_price}</strong>
                                            </td>
                                            <td >
                                                <button className="btn btn-danger btn-sm" onClick={event => handleDelete(event, cart.cart_id)}>Xóa</button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th colSpan="3"></th>
                                    <th className="cart-highlight" >Total</th>
                                    <th className="cart-highlight" ><sup>đ</sup>{totalPrice}</th>
                                    <th></th>
                                </tr>
                            </tfoot>
                        </table>
                        <form className="pay-form">
                            <button className="btn btn-primary" type="submit" onClick={handleCreateInvoice}>Pay Cart</button>
                            <AddInvoiceModal
                                show={addModalShow}
                                onHide={AddModelClose}
                                setIsUpdated={setIsUpdated}
                                carts={filteredCart}
                                userloginid={userLoginId} />
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}

export default Cart;