import React from 'react';
import { Container, Row, Col, Button, InputGroup, FormControl, Pagination } from 'react-bootstrap';

function TourPage() {
    return (
        <Container fluid>
            <Row className="mb-4 mt-4">
                <Col>
                    <Button variant="light">Tất cả</Button>
                </Col>
                <Col>
                    <Button variant="primary">Miền Nam</Button>
                    <Button variant="light">Miền Trung</Button>
                    <Button variant="light">Miền Bắc</Button>
                </Col>
            </Row>

            <Row className="mb-4">
                <Col>
                    <InputGroup>
                        <FormControl placeholder="Nhập giá trị thấp nhất" />
                        <Button variant="outline-secondary">Tìm kiếm</Button>
                    </InputGroup>
                </Col>
                <Col>
                    <InputGroup>
                        <FormControl placeholder="Nhập giá trị cao nhất" />
                        <Button variant="outline-secondary">Tìm kiếm</Button>
                    </InputGroup>
                </Col>
                <Col>
                    <InputGroup>
                        <FormControl placeholder="Nhập điểm đến" />
                        <Button variant="outline-secondary">Tìm kiếm</Button>
                    </InputGroup>
                </Col>
            </Row>

            <h4>Danh sách Tour du lịch</h4>
            <Row>
                <Col sm={4}>
                    <div className="tour-item bg-light p-3 mb-3">
                        <div
                            className="img-placeholder mb-2"
                            style={{ height: '150px', backgroundColor: '#f8d7da' }}
                        ></div>
                        <p>List item description</p>
                    </div>
                </Col>
                <Col sm={4}>
                    <div className="tour-item bg-light p-3 mb-3">
                        <div
                            className="img-placeholder mb-2"
                            style={{ height: '150px', backgroundColor: '#f8d7da' }}
                        ></div>
                        <p>List item description</p>
                    </div>
                </Col>
                <Col sm={4}>
                    <div className="tour-item bg-light p-3 mb-3">
                        <div
                            className="img-placeholder mb-2"
                            style={{ height: '150px', backgroundColor: '#f8d7da' }}
                        ></div>
                        <p>List item description</p>
                    </div>
                </Col>
            </Row>

            <Pagination className="mt-4">
                <Pagination.Prev />
                <Pagination.Item>{1}</Pagination.Item>
                <Pagination.Item>{2}</Pagination.Item>
                <Pagination.Item>{3}</Pagination.Item>
                <Pagination.Item>...</Pagination.Item>
                <Pagination.Item>{67}</Pagination.Item>
                <Pagination.Item>{68}</Pagination.Item>
                <Pagination.Next />
            </Pagination>
        </Container>
    );
}

export default TourPage;
