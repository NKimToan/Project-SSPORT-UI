import { useState, useEffect } from "react";
import GetAllProduct from "../Services/ProductServices/GetAllProduct"
import DeleteProduct from "../Services/ProductServices/DeleteProduct";
import GetAllCategory from "../Services/CategoryServices/GetAllCategory";
import AddProductModal from "../Components/ProductManage/AddProductModal";
import UpdateProductModal from "../Components/ProductManage/UpdateProductModal";
import { getToken } from "../Services/TokenServices/TokenService";
import GetImageProduct from "../Services/ImageServices/GetImageProduct";

function ProductManage() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isUpdated, setIsUpdated] = useState(false);
    const [addModalShow, setAddModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [editProduct, setEditProduct] = useState(false);
    useEffect(() => {

        document.title = "Quản lý hàng hóa";

        GetAllProduct()
            .then(data => {
                setProducts(data.result);
                data.result.forEach(product => {
                    GetImageProduct(product.image)
                        .then(url => {
                            setProducts(prevProducts => prevProducts.map(pro =>
                                pro.product_id === product.product_id
                                    ? { ...pro, imageUrl: url }
                                    : pro
                            )
                            );
                        });
                })
            })
            .catch(error => console.log(error));

        GetAllCategory()
            .then(data => {
                setCategories(data.result);
            })
            .catch(error => console.log(error));

        return (() => { setIsUpdated(false) })

    }, [isUpdated])

    const handleAdd = (e) => {
        e.preventDefault();
        setAddModalShow(true);
    }

    const handleUpdate = (e, productId) => {
        e.preventDefault();
        setEditProduct(productId);
        setEditModalShow(true);
    }

    const handleDelete = (e, productId) => {
        e.preventDefault();
        if (window.confirm("Do you want to delete this product?")) {
            const accessToken = getToken();
            DeleteProduct(accessToken, productId)
                .then(result => { setIsUpdated(true) });
        }
    }
    let AddModelClose = () => setAddModalShow(false);
    let EditModelClose = () => setEditModalShow(false);

    return <div className="container">
        <button className="btn btn-primary mt-4" onClick={handleAdd}>Add product</button>
        <AddProductModal
            show={addModalShow}
            onHide={AddModelClose}
            setIsUpdated={setIsUpdated}
            categories={categories} />
        <main className="table-responsive-md table-responsive-lg mt-4">
            <table className="table">
                <thead className="table-primary p-5 bg-opacity-50">
                    <tr>
                        <th>Tên sản phẩm</th>
                        <th>Ảnh</th>
                        <th>Giá gốc</th>
                        <th>Giá bán</th>
                        <th>Số lượng đã bán</th>
                        <th>Số lượng còn lại</th>
                        <th>Chỉnh sửa</th>
                        <th>Xóa</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, id) => (
                        <tr key={id}>
                            <td>{product.product_name}</td>
                            <td>
                                <img src={product.image ? `${product.imageUrl}` : ""} alt="" width="100" height="70" className="bg-image-transparent"></img>
                            </td>
                            <td>{product.cost} VND</td>
                            <td>{product.price} VND</td>
                            <td>{product.quantity_sold}</td>
                            <td>{product.quantity}</td>
                            <td>
                                <button className="btn btn-primary btn-sm" onClick={event => handleUpdate(event, product.product_id)}>Update</button>
                                <UpdateProductModal
                                    show={editModalShow}
                                    setIsUpdated={setIsUpdated}
                                    product={editProduct}
                                    onHide={EditModelClose}
                                    products={products}
                                    productId={product.product_id === editProduct}
                                    categories={categories} />
                            </td>
                            <td>
                                <button className="btn btn-danger btn-sm" onClick={event => handleDelete(event, product.product_id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main >

    </div>
}

export default ProductManage;