import React from 'react';
import { Container, Row, Col, Button, InputGroup, FormControl, Nav } from 'react-bootstrap';
import './Header.css';
import styled from 'styled-components';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const StyledNavLink = styled(Link)`
    // Use Link instead of Nav.Link
    color: #ffffff !important;
    font-size: 1.1em;
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
                    <Col xs={2}>
                    <Nav className="me-auto">
                            {/* Use Link component for navigation */}
                            <StyledNavLink to="/" className="mb-0">
                                Trang chủ
                            </StyledNavLink>
                        </Nav>
                    </Col>

                    <Col xs={8}>
                        <InputGroup>
                            <FormControl placeholder="Tìm kiếm..." aria-label="Search" />
                            <Button variant="outline-secondary">
                                <i className="bi bi-search">Tìm kiếm</i>
                            </Button>
                        </InputGroup>
                    </Col>

                    <Col xs={2}>
                        <Nav className="me-auto">
                            {/* Use Link component for navigation */}
                            <StyledNavLink to="/news" className="mb-0">
                                Tin tức
                            </StyledNavLink>
                        </Nav>
                    </Col>
                </Row>
            </Container>
        </header>
    );
};

export default Header;
