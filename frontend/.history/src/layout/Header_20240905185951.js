import { useContext, useEffect, useState } from 'react';
import Apis, { endpoints } from '../configs/Apis';
import MySpinner from './MySpinner';
import { Container, Row, Col, Button, FormControl, InputGroup } from 'react-bootstrap';
 
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import UserContext from '../contexts/UserContext';
import Cookies from 'js-cookie';
import { useReducer } from 'react';  

const StyledNavLink = styled(Nav.Link)`
    color: #ffffff !important;
    font-size: 1.1em;
    margin-right: 15px;

    &:hover {
        color: #cccccc !important;
    }
`;

const Header = () => {
    // const [customer, setCustomer] = useState(null);
    // const loadCus = async () => {
    //     let res = await Apis.get(endpoints['customer'])
    //     setCustomer(res.data);
    // }

    // useEffect(() => {
    //     loadCus();
    // }, [])

    // if (customer === null)
    //     return <MySpinner />;
    let currentUser = null;
    if (Cookies.get('user')) currentUser = JSON.parse(Cookies.get('user'));

    const [user, dispatch] = useReducer(useReducer, currentUser);
    // const [user, dispatch] = useContext(UserContext)
    const handleLogout = () => {
        dispatch({ type: 'logout' });
        Cookies.remove('token');
        Cookies.remove('user');
    };

    return (
        // <StyledNavbar expand="lg">
        //     <Container>
        //         <StyledNavbarBrand href="/home">Trang chủ</StyledNavbarBrand>
        //         <Navbar.Toggle aria-controls="basic-navbar-nav" />
        //         <Navbar.Collapse id="basic-navbar-nav">
        //             <Nav className="me-auto">
        //                 <StyledNavLink href="/Relativeparkcard"> Thêm thẻ giữ xe</StyledNavLink>
        //                 <StyledNavLink href="/MerchandiseCabinet">Xem tủ đồ</StyledNavLink>
        //                 <StyledNavLink href="/Service">Dịch vụ</StyledNavLink>
        //                 <StyledNavLink href="/Feedback">Feedback</StyledNavLink>
        //                 <StyledNavLink href="/Survey">Khảo sát</StyledNavLink>
        //                 <StyledNavLink href="ReceiptList">Hóa đơn</StyledNavLink>
        //                 {/* <StyledNavLink href='/login'>Đăng nhập</StyledNavLink> */}
        //                 <StyledNavLink onClick={handleLogout}>Đăng xuất</StyledNavLink>
        //             </Nav>
        //         </Navbar.Collapse>
        //     </Container>
        // </StyledNavbar>
        <header className="p-3 mb-4" style={{ backgroundColor: '#f7f7f9' }}>
            <Container fluid>
                <Row className="align-items-center">
                    {/* Navigation Title */}
                    <Col xs={2}>
                        <h4 className="mb-0">Trang chủ</h4>
                    </Col>

                    {/* Filter Selection (Miền Nam selected) */}
                    <Col xs={4}>
                        <div className="d-flex align-items-center">
                            <Button variant="outline-secondary" className="me-2">
                                Miền Nam
                            </Button>
                            <Button variant="light">X</Button> {/* Close button */}
                        </div>
                    </Col>

                    {/* Search Box */}
                    <Col xs={6}>
                        <InputGroup>
                            <FormControl placeholder="Search..." aria-label="Search tours" />
                            <Button variant="outline-secondary">
                                <i className="bi bi-search"></i>
                            </Button>
                        </InputGroup>
                    </Col>
                </Row>
            </Container>
        </header>
    );
};

export default Header;
