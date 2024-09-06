import React from 'react';
import { Container, Row, Col, Button, InputGroup, FormControl, Dropdown } from 'react-bootstrap';
import 'Header.css'; // Custom CSS file

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
              {/* Region Dropdown */}
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

              <FormControl
                placeholder="Tìm kiếm..."
                aria-label="Search"
              />
              <Button variant="outline-secondary">
                <i className="bi bi-search"></i>
              </Button>
            </InputGroup>
          </Col>

          <Col xs={1}>
            <Button variant="light">X</Button>
          </Col>
        </Row>

        <Row className="mt-3">
          <Col>
            <Button variant="light" className="mr-2">Tất cả</Button>
            <Button variant="light" className="mr-2">Miền Nam</Button>
            <Button variant="light" className="mr-2">Miền Trung</Button>
            <Button variant="light" className="mr-2">Miền Bắc</Button>
          </Col>
        </Row>

        <Row className="mt-3">
          <Col>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Nhập giá trị thấp nhất"
                aria-label="Min Price"
              />
              <Button variant="outline-secondary">
                <i className="bi bi-filter"></i>
              </Button>
            </InputGroup>
          </Col>
          <Col>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Nhập giá trị cao nhất"
                aria-label="Max Price"
              />
              <Button variant="outline-secondary">
                <i className="bi bi-filter"></i>
              </Button>
            </InputGroup>
          </Col>
          <Col>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Nhập điểm đến"
                aria-label="Destination"
              />
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
