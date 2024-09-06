import React from 'react';
import { Container, Row, Col, Button, InputGroup, FormControl, Dropdown } from 'react-bootstrap';
import './Header.css';

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
                            <Dropdown>
                                <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
                                    Miền Nam
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item>Tất cả</Dropdown.Item>
                                    <Dropdown.Item>Miền Nam</Dropdown.Item>
                                    <Dropdown.Item>Miền Trung</Dropdown.Item>
                                    <Dropdown.Item>Miền Bắc</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>

                            <FormControl placeholder="Tìm kiếm..." aria-label="Search" />
                            <Button variant="outline-secondary">
                                <i className="bi bi-search"></i>
                            </Button>
                        </InputGroup>
                    </Col>
                    <Col xs={1}>
                        <Button variant="light">X</Button>
                    </Col>
                </Row>
            </Container>
        </header>
    );
};

export default Header;
