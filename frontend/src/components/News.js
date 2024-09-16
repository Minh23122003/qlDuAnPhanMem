import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Pagination } from 'react-bootstrap';
import APIs, { authApi, endpoints } from '../configs/APIs';

const News = () => {
    const [news, setNews] = useState([]);

    const loadNews = async () => {
        try {
            let res = await APIs.get(endpoints['news']); // Gọi API để lấy danh sách tin tức
            setNews(res.data.results); // Lưu dữ liệu vào state
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        loadNews();
    }, []);

    return (
        <div style={{ backgroundColor: '#f5e9e9', minHeight: '100vh', paddingTop: '20px' }}>
            <Container>
                <Row>
                    {news?.map((item, index) => (
                        <Col md={4} className="mb-4" key={index}>
                            <Card className="h-100">
                                {item.images && item.images.length > 0 ? (
                                    <>
                                        <Card.Img
                                            variant="top"
                                            src={item.images[0]}
                                            alt={`Image for ${item.title}`}
                                            width={'100px'}
                                            height={'150px'}
                                        />
                                    </>
                                ) : (
                                    <div>No Image</div>
                                )}
                                <Card.Body>
                                    <Card.Title>{item.title}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">
                                        ID: {item.id}
                                    </Card.Subtitle>
                                    <Card.Text dangerouslySetInnerHTML={{ __html: item.content }} />
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>

                <Row className="mt-auto">
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

export default News;
