import React from 'react';
import { Container, Row, Col, Button, InputGroup, FormControl, Dropdown, Nav } from 'react-bootstrap';
import './Header.css';
import styled from 'styled-components';
const StyledNavLink = styled(Nav.Link)`
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
                        <h4 className="mb-0">Trang chủ</h4>
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
                        <StyledNavLink className="mb-0">Tin tức</StyledNavLink>
                    </Col>

                </Row>
            </Container>
        </header>
    );
};

export default Header;
