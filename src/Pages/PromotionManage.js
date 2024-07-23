import { useState, useEffect } from "react";
import AddPromotionModal from "../Components/PromotionManage/AddPromotionModal";
import UpdatePromotionModal from "../Components//PromotionManage/UpdatePromotionModal";
import DeletePromotion from "../Services/PromotionServices/DeletePromotion";
import { getToken } from "../Services/TokenServices/TokenService";
import GetAllPromotion from "../Services/PromotionServices/GetAllPromotion"

function PromotionManage() {
    const [promotions, setPromotions] = useState([]);
    const [isUpdated, setIsUpdated] = useState(false);
    const [addModalShow, setAddModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [editPromotion, setEditPromotion] = useState(false);
    useEffect(() => {
        document.title = "Quản lý chương trình khuyến mãi";
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

    const handleUpdate = (e, promotionId) => {
        e.preventDefault();
        setEditPromotion(promotionId);
        setEditModalShow(true);
    }

    const handleDelete = (e, promotionId) => {
        e.preventDefault();
        if (window.confirm("Do you want to delete this promotion?")) {
            const accessToken = getToken();
            DeletePromotion(accessToken, promotionId)
                .then(result => { setIsUpdated(true) });
        }
    }
    let AddModelClose = () => setAddModalShow(false);
    let EditModelClose = () => setEditModalShow(false);

    return <div className="container">
        <button className="btn btn-primary mt-4" onClick={handleAdd}>Add promotion</button>
        <AddPromotionModal
            show={addModalShow}
            onHide={AddModelClose}
            setIsUpdated={setIsUpdated} />
        <main className="table-responsive-md table-responsive-lg mt-4 text-center my-4">
            <table className="table">
                <thead className="p-5 table-primary bg-opacity-50">
                    <tr>
                        <th>Tên chương trình khuyến mãi</th>
                        <th>Ngày bắt đầu</th>
                        <th>Ngày kết thúc</th>
                        <th>Chiết khấu</th>
                        <th>Chỉnh sửa</th>
                        <th>Xóa</th>
                    </tr>
                </thead>
                <tbody>
                    {promotions.map((promotion, id) => (
                        <tr key={id}>
                            <td>{promotion.promotion_name}</td>
                            <td>{promotion.date_created}</td>
                            <td>{promotion.date_end}</td>
                            <td>{promotion.discount}</td>
                            <td>
                                <button className="btn btn-primary btn-sm" onClick={event => handleUpdate(event, promotion.promotion_id)}>Update</button>
                                <UpdatePromotionModal
                                    show={editModalShow}
                                    setIsUpdated={setIsUpdated}
                                    promotion={editPromotion}
                                    onHide={EditModelClose}
                                    promotions={promotions}
                                    promotionId={promotion.promotion_id === editPromotion} />
                            </td>
                            <td>
                                <button className="btn btn-danger btn-sm" onClick={event => handleDelete(event, promotion.promotion_id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main >
    </div>
}

export default PromotionManage;
