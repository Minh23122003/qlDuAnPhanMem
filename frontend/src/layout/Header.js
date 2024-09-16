import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, InputGroup, FormControl, Nav } from 'react-bootstrap';
import './Header.css';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import store from '../store';
import { toast } from 'react-toastify';

const StyledNavLink = styled(Link)`
    color: black !important;
    font-size: 1.25rem;
    font-weight: 600;
    text-decoration: none;
    margin-right: 15px;

    &:hover {
        color: #cccccc !important;
    }
`;

const Header = () => {
    // const [user, setUser] = useState(null);
    const setLocation = store((state) => state.setLocation);
    const keyword = store((state) => state.data.keyword);
    const user = store((state) => state.data.user);
    const setUser = store((state) => state.setUser);

    const handleChange = (event) => {
        setLocation(event.target.value);
    };
    useEffect(() => {}, [user]);

    const handleLogout = () => {
        // Cookies.remove('user');
        toast.success('Đăng xuất thành công', {
            position: 'top-right',
            autoClose: 3000,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: 'light',
        });
        setUser(null);
    };
    const handleSearch = () => {};
    return (
        <header className="p-3 mb-4">
            <Container fluid>
                <Row className="align-items-center justify-content-between">
                    <Col xs={2}>
                        <Nav>
                            <StyledNavLink to="/" className="mb-0">
                                Trang chủ
                            </StyledNavLink>
                        </Nav>
                    </Col>

                    <Col xs={6}>
                        <InputGroup>
                            <FormControl
                                placeholder="Tìm kiếm..."
                                aria-label="Search"
                                value={keyword} // Bind state value to input field
                                onChange={handleChange} // Attach onChange handler
                            />
                            <Button
                                variant="outline-secondary"
                                onClick={handleSearch} // Optional: Handle search on button click
                            >
                                <i className="bi bi-search">Tìm kiếm</i>
                            </Button>
                        </InputGroup>
                    </Col>

                    <Col xs={4}>
                        <div className="d-flex justify-content-end">
                            <Nav>
                                <StyledNavLink to="/news" className="mb-0">
                                    Tin tức
                                </StyledNavLink>
                                {!user ? (
                                    <>
                                        <StyledNavLink to="/login" className="mb-0">
                                            Đăng nhập
                                        </StyledNavLink>
                                        <StyledNavLink to="/signup" className="mb-0">
                                            Đăng ký
                                        </StyledNavLink>
                                    </>
                                ) : (
                                    <>
                                        <StyledNavLink to="/profile" className="mb-0">
                                            Tôi
                                        </StyledNavLink>
                                        <StyledNavLink to="/cart" className="mb-0">
                                            Giỏ hàng
                                        </StyledNavLink>
                                        <StyledNavLink
                                            to="/logout"
                                            className="mb-0"
                                            onClick={handleLogout}
                                        >
                                            Đăng xuất
                                        </StyledNavLink>
                                    </>
                                )}
                            </Nav>
                        </div>
                    </Col>
                </Row>
            </Container>
        </header>
    );
};

export default Header;
