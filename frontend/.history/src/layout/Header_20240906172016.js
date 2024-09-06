import React from 'react';
import { Container, Row, Col, Button, InputGroup, FormControl, Nav } from 'react-bootstrap';
import './Header.css';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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
    return (
        <header className="p-3 mb-4">
            <Container fluid>
                <Row className="align-items-center justify-content-between">
                    {/* Left Section: Trang chủ */}
                    <Col xs={2}>
                        <Nav>
                            <StyledNavLink to="/" className="mb-0">
                                Trang chủ
                            </StyledNavLink>
                        </Nav>
                    </Col>

                    <Col xs={6}>
                        <InputGroup>
                            <FormControl placeholder="Tìm kiếm..." aria-label="Search" />
                            <Button variant="outline-secondary">
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
                                <StyledNavLink to="/login" className="mb-0">
                                    Đăng nhập
                                </StyledNavLink>
                                <StyledNavLink to="/logout" className="mb-0">
                                    Đăng xuất
                                </StyledNavLink>
                            </Nav>
                        </div>
                    </Col>
                </Row>
            </Container>
        </header>
    );
};

export default Header;
