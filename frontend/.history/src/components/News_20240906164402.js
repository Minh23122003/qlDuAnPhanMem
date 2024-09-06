import React from 'react';
import { Container, Row, Col, Button, Pagination, Dropdown, Form } from 'react-bootstrap';

const NewsPage = () => {
  return (
    <div style={{ backgroundColor: '#f5e9e9', minHeight: '100vh' }}>
      {/* Header Section */}
      <Container fluid className="bg-light py-3">
        <Row className="d-flex justify-content-between align-items-center">
          <Col md={2}>
            <h4>Trang chủ</h4>
          </Col>
          <Col md={8} className="d-flex align-items-center justify-content-center">
            <Dropdown>
              <Dropdown.Toggle variant="light" id="dropdown-basic">
                Miền Nam
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#/mien-bac">Miền Bắc</Dropdown.Item>
                <Dropdown.Item href="#/mien-trung">Miền Trung</Dropdown.Item>
                <Dropdown.Item href="#/mien-nam">Miền Nam</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Form.Control type="text" placeholder="Search..." className="mx-3" />
          </Col>
          <Col md={2} className="text-end">
            <h4>Tin Tức</h4>
          </Col>
        </Row>
      </Container>

      {/* Tabs Section */}
      <Container fluid className="py-4">
        <Row className="text-center">
          <Col><Button variant="light">Tất cả</Button></Col>
          <Col><Button variant="light">Tin tức</Button></Col>
          <Col><Button variant="light">Cẩm nang</Button></Col>
        </Row>
      </Container>

      {/* Content Section */}
      <Container>
        <Row>
          <Col className="content-box p-4 bg-white rounded">
            <Row>
              <Col md={8}>
                <h4>Heading</h4>
                <h6 className="text-muted">Subheading</h6>
                <p>Body text for your whole article or post. We'll put in some lorem ipsum to show how a filled-out page might look:</p>
                <p>
                  Excepteur efficient emerging, minim veniam anim aute carefully curated Ginza conversation exquisite 
                  perfect nostrud nisi intricate Content. Qui international first-class nulla ut. Punctual adipiscing, 
                  essential lovely queen tempor eiusmod iure.
                </p>
              </Col>
              <Col md={4}>
                <div className="img-placeholder bg-light d-flex align-items-center justify-content-center" style={{ height: '200px' }}>
                  <span>Image</span>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>

        {/* Pagination Section */}
        <Row className="mt-4">
          <Pagination className="justify-content-center">
            <Pagination.Prev>Previous</Pagination.Prev>
            <Pagination.Item active>{1}</Pagination.Item>
            <Pagination.Item>{2}</Pagination.Item>
            <Pagination.Item>{3}</Pagination.Item>
            <Pagination.Ellipsis />
            <Pagination.Item>{67}</Pagination.Item>
            <Pagination.Item>{68}</Pagination.Item>
            <Pagination.Next>Next</Pagination.Next>
          </Pagination>
        </Row>
      </Container>
    </div>
  );
};

export default NewsPage;
