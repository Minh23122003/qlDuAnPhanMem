import React from 'react';
import { Container, Row, Col, Button, InputGroup, FormControl, Nav } from 'react-bootstrap';
import './Header.css';
import styled from 'styled-components';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const StyledNavLink = styled(Link)`
    color: black !important; /* Ensure the white color */
    font-size: 1.25rem; /* Updated for better readability, more suitable for headers */
    font-weight: 600; /* Use bold for better contrast */
    text-decoration: none;
    margin-right: 15px;

    &:hover {
        color: #cccccc !important; /* Ensure color change on hover */
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
