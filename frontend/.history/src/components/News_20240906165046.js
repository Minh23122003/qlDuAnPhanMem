import React from 'react';
import { Container, Row, Col, Card, Button, Pagination } from 'react-bootstrap';

const NewsPage = () => {
  return (
    <div style={{ backgroundColor: '#f5e9e9', minHeight: '100vh', paddingTop: '20px' }}>
      
      {/* Content Section with Multiple Cards */}
      <Container>
        <Row>
          {/* First Card */}
          <Col md={4} className="mb-4">
            <Card className="h-100">
              <Card.Body>
                <Card.Title>Heading</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Subheading</Card.Subtitle>
                <Card.Text>
                  Body text for your whole article or post. We'll put in some lorem ipsum to show how a filled-out page might look:
                  Excepteur efficient emerging, minim veniam anim aute carefully curated Ginza conversation exquisite nostrud nisi intricate Content.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          {/* Second Card */}
          <Col md={4} className="mb-4">
            <Card className="h-100">
              <Card.Body>
                <Card.Title>Heading</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Subheading</Card.Subtitle>
                <Card.Text>
                  Excepteur efficient emerging, minim veniam anim aute carefully curated Ginza conversation exquisite nostrud nisi intricate Content.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          {/* Third Card */}
          <Col md={4} className="mb-4">
            <Card className="h-100">
              <Card.Body>
                <Card.Title>Heading</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Subheading</Card.Subtitle>
                <Card.Text>
                  Excepteur efficient emerging, minim veniam anim aute carefully curated Ginza conversation exquisite nostrud nisi intricate Content.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          {/* Fourth Card */}
          <Col md={4} className="mb-4">
            <Card className="h-100">
              <Card.Body>
                <Card.Title>Heading</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Subheading</Card.Subtitle>
                <Card.Text>
                  Excepteur efficient emerging, minim veniam anim aute carefully curated Ginza conversation exquisite nostrud nisi intricate Content.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          {/* Fifth Card */}
          <Col md={4} className="mb-4">
            <Card className="h-100">
              <Card.Body>
                <Card.Title>Heading</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Subheading</Card.Subtitle>
                <Card.Text>
                  Excepteur efficient emerging, minim veniam anim aute carefully curated Ginza conversation exquisite nostrud nisi intricate Content.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          {/* Sixth Card */}
          <Col md={4} className="mb-4">
            <Card className="h-100">
              <Card.Body>
                <Card.Title>Heading</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Subheading</Card.Subtitle>
                <Card.Text>
                  Excepteur efficient emerging, minim veniam anim aute carefully curated Ginza conversation exquisite nostrud nisi intricate Content.
                </Card.Text>
              </Card.Body>
            </Card>
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
