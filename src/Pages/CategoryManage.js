import { useState, useEffect } from "react";
import GetAllCategory from "../Services/CategoryServices/GetAllCategory";
import AddCategoryModal from "../Components/CategoryManage/AddCategoryModal";
import UpdateCategoryModal from "../Components/CategoryManage/UpdateCategoryModal";
import DeleteCategory from "../Services/CategoryServices/DeleteCategory"
import { getToken } from "../Services/TokenServices/TokenService";
import GetAllPromotion from "../Services/PromotionServices/GetAllPromotion"
import GetImageCategory from "../Services/ImageServices/GetImageCategory";
function CategoryManage() {
    const [categories, setCategories] = useState([]);
    const [promotions, setPromotions] = useState([]);
    const [isUpdated, setIsUpdated] = useState(false);
    const [addModalShow, setAddModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [editCategory, setEditCategory] = useState(false);
    useEffect(() => {

        document.title = "Quản lý danh mục sản phẩm";
        GetAllCategory()
            .then(data => {
                setCategories(data.result);
                data.result.forEach(category => {
                    GetImageCategory(category.image)
                        .then(url => {
                            setCategories(prevCategories => prevCategories.map(cate =>
                                cate.category_id === category.category_id
                                    ? { ...cate, imageUrl: url }
                                    : cate
                            )
                            );
                        });
                })
            })
            .catch(error => console.log(error));

        GetAllPromotion()
            .then(data => {
                setPromotions(data.result);
            })
            .catch(error => console.log(error));


        return (() => { setIsUpdated(false) })

    }, [isUpdated])

    const handleAdd = (e) => {
        e.preventDefault();
        setAddModalShow(true);
    }

    const handleUpdate = (e, categoryId) => {
        e.preventDefault();
        setEditCategory(categoryId);
        setEditModalShow(true);
    }

    const handleDelete = (e, categoryId) => {
        e.preventDefault();
        if (window.confirm("Do you want to delete this category?")) {
            const accessToken = getToken();
            DeleteCategory(accessToken, categoryId)
                .then(result => { setIsUpdated(true) });
        }
    }
    let AddModelClose = () => setAddModalShow(false);
    let EditModelClose = () => setEditModalShow(false);

    return <div className="container">
        <button className="btn btn-primary mt-4" onClick={handleAdd}>Add category</button>
        <AddCategoryModal
            show={addModalShow}
            onHide={AddModelClose}
            setIsUpdated={setIsUpdated} />
        <main className="table-responsive-md table-responsive-lg mt-4 text-center my-4">
            <table className="table">
                <thead className="p-5 table-primary bg-opacity-50">
                    <tr>
                        <th>Tên danh mục</th>
                        <th>Ảnh</th>
                        <th>Chỉnh sửa</th>
                        <th>Xóa</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category, id) => (
                        <tr key={id}>
                            <td>{category.category_name}</td>
                            <td>
                                <img src={category.image ? `${category.imageUrl}` : ""}
                                    alt=""
                                    width="100"
                                    height="70"
                                    className="transparent-bg bg-opacity-100 bg-white"
                                ></img>
                            </td>
                            <td>
                                <button className="btn btn-primary btn-sm" onClick={event => handleUpdate(event, category.category_id)}>Update</button>
                                <UpdateCategoryModal
                                    show={editModalShow}
                                    setIsUpdated={setIsUpdated}
                                    category={editCategory}
                                    onHide={EditModelClose}
                                    categories={categories}
                                    categoryId={category.category_id === editCategory}
                                    promotions={promotions} />
                            </td>
                            <td>
                                <button className="btn btn-danger btn-sm" onClick={event => handleDelete(event, category.category_id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main >
    </div>
}

export default CategoryManage;
