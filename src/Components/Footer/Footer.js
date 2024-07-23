import { FaFacebookSquare, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
    return <>
        <footer className="footer">
            <div className="container">
                <div className="row d-flex justigy-content-evenly">
                    <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-2">
                        <div className="footer_about">
                            <h1 className="footer_about_logo">S-SPORT</h1>
                            <ul>
                                <li>Address: ABC, Đà Nẵng</li>
                                <li>Phone: 0939383979</li>
                                <li>Email: SSPORT@gmail.com</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 mt-3 mb-2">
                        <h6>Cửa hàng</h6>
                        <div className="footer_widget d-flex ">
                            <ul className="ps-0" style={{ textDecoration: "none", listStyle: "none" }}>
                                <li >
                                    <Link to='' style={{ textDecoration: "none", color: "#000" }} >Liên hệ</Link>
                                </li>
                                <li >
                                    <Link to='' style={{ textDecoration: "none", color: "#000" }} >Thông tin về chúng tôi</Link>
                                </li>
                                <li >
                                    <Link to='' style={{ textDecoration: "none", color: "#000" }} >Sản phẩm kinh doanh</Link>
                                </li>
                            </ul>
                            <ul className="ps-5" style={{ textDecoration: "none", listStyle: "none" }}>
                                <li >
                                    <Link to='' style={{ textDecoration: "none", color: "#000" }} >Thông tin tài khoản</Link>
                                </li>
                                <li >
                                    <Link to='' style={{ textDecoration: "none", color: "#000" }} >Giỏ hàng</Link>
                                </li>
                                <li >
                                    <Link to='' style={{ textDecoration: "none", color: "#000" }} >Danh sách yêu thích</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-12 col-sm-12 col-xs-12 mt-3 mb-2">
                        <div className="footer_widget">
                            <h6>Khuyến mãi & Ưu đãi</h6>
                            <p>Đăng ký ngay tại đây</p>
                            <form action="#">
                                <div className="input_group">
                                    <input type="text" placeholder="Nhập email"></input>
                                    <button type="submit" className="button_submit">Đăng ký</button>
                                </div>
                                <div className="footer_widget_social d-flex align-items-center">
                                    <div className="me-3 rounded-circle">
                                        <FaFacebookSquare />
                                    </div>
                                    <div className="me-3 rounded-circle">
                                        <FaInstagram />
                                    </div>
                                    <div className="rounded-circle">
                                        <FaTwitter />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    </>
}

export default Footer;