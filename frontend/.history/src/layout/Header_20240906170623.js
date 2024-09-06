import React from 'react';
import { Container, Row, Col, Button, InputGroup, FormControl, Dropdown } from 'react-bootstrap';
import './Header.css';
import { Link } from 'react-router-dom';

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
                        <Link sr className="mb-0">Tin tức</Link>
                    </Col>

                </Row>
            </Container>
        </header>
    );
};

export default Header;
