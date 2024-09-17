import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Image, Spinner } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/vi';
import { Rating } from 'react-simple-star-rating';
import APIs, { authApi, endpoints } from '../configs/APIs';
import store from '../store';
// import styled from 'styled-components';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const TourDetails = () => {
    // const { tourId } = useParams();
    const [tour, setTour] = useState(null);
    const [comment, setComment] = useState(null);
    // const user = useContext(MyUserContext);
    const [content, setContent] = useState('');
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [stars, setStars] = useState(0);
    const navigate = useNavigate();
    const [change, setChange] = useState('');
    const { tourId, token, user } = store((state) => state.data);

    const loadTour = async () => {
        try {
            let res = await APIs.get(endpoints['tour-details'](tourId));
            setTour(res.data);
        } catch (ex) {
            console.error(ex);
        }
    };

    const loadComment = async () => {
        if (page > 0) {
            let url = `${endpoints['commentTour'](tourId)}?page=${page}`;
            try {
                setLoading(true);
                let res = await APIs.get(url);
                if (page === 1) setComment(res.data.results);
                else if (page > 1) setComment((current) => [...current, ...res.data.results]);
                if (res.data.next === null) setPage(-99);
            } catch (ex) {
                console.error(ex);
            } finally {
                setLoading(false);
            }
        }
    };

    const loadRating = async () => {
        if (user !== null) {
            try {
                // let token = await AsyncStorage.getItem('access-token');
                let res = await authApi(token).get(endpoints['rating'](tourId));
                setStars(res.data.stars);
            } catch (ex) {
                console.error(ex);
            }
        }
    };

    useEffect(() => {
        loadTour();
    }, [tourId]);

    useEffect(() => {
        loadComment();
    }, [page]);

    useEffect(() => {
        loadRating();
    }, []);

    const addComment = async () => {
        if (user === null) {
            alert('Bạn chưa đăng nhập. Vui lòng đăng nhập để bình luận.');
            navigate('/login');
        } else {
            try {
                // let token = await AsyncStorage.getItem('access-token');
                await authApi(token).post(endpoints['addCommentTour'](tourId), { content });
                setPage(1);
                setContent('');
            } catch (ex) {
                console.error(ex);
            }
        }
    };

    const patchComment = async (id) => {
        try {
            await APIs.put(endpoints['patchCommentTour'], { content: change, id });
            setPage(1);
            setChange('');
        } catch (ex) {
            console.error(ex);
        }
    };

    const deleteComment = async (id) => {
        try {
            await APIs.delete(endpoints['deleteCommentTour'](id));
            setPage(1);
        } catch (ex) {
            console.error(ex);
        }
    };

    const confirmDeleteComment = async (id) => {
        if (window.confirm('Bạn chắc chắn muốn xóa?')) {
            deleteComment(id);
        }
    };

    const addRating = async (number) => {
        if (user === null) {
            alert('Bạn chưa đăng nhập. Vui lòng đăng nhập để đánh giá.');
            navigate('/login');
        } else {
            try {
                // let token = await AsyncStorage.getItem('access-token');
                await authApi(token).post(endpoints['addRating'](tourId), { stars: number });
            } catch (ex) {
                console.error(ex);
            }
        }
    };

    return (
        <Container>
            {tour === null ? (
                <Spinner animation="border" />
            ) : (
                <>
                    <Card>
                        <Card.Header>{tour.name}</Card.Header>
                        <Card.Body>
                            <Card.Text dangerouslySetInnerHTML={{ __html: tour.description }} />
                            <p>Ngày bắt đầu: {moment(tour.start_date).format('DD-MM-YYYY')}</p>
                            <p>Ngày kết thúc: {moment(tour.end_date).format('DD-MM-YYYY')}</p>
                            <p>Số vé còn lại: {tour.remain_ticket}</p>
                            <p>Giá vé:</p>
                            {tour.prices.map((p) => (
                                <p key={p.type}>
                                    {p.type}: {p.price} đồng
                                </p>
                            ))}
                            <p>Điểm đến:</p>
                            {tour.destination.map((d) => (
                                <p key={d.name}>
                                    {d.name} ({d.location})
                                </p>
                            ))}
                            <Rating
                                onClick={(number) => {
                                    setStars(number);
                                    addRating(number);
                                }}
                                ratingValue={stars}
                            />
                            <Button onClick={() => navigate('/booking', { state: { tour } })}>
                                Đặt vé
                            </Button>
                        </Card.Body>
                        {tour.images.map((t) => (
                            <Card key={t.id}>
                                <Image src={t.image} alt={t.name} />
                                <Card.Footer>
                                    <small>{t.name}</small>
                                </Card.Footer>
                            </Card>
                        ))}
                    </Card>

                    <h3>Bình luận</h3>
                    <Form.Group>
                        <Form.Control
                            as="textarea"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Nội dung bình luận"
                        />
                        <Button onClick={addComment}>Bình luận</Button>
                    </Form.Group>
                    <div>
                        {comment === null ? (
                            <Spinner animation="border" />
                        ) : (
                            comment.map((c) => (
                                <Card key={c.id}>
                                    <Card.Body>
                                        <Image src={c.user.avatar} roundedCircle />
                                        <p>
                                            {c.user.first_name} {c.user.last_name}
                                        </p>
                                        <p>{c.content}</p>
                                        <p>{moment(c.updated_date).fromNow()}</p>
                                        {user !== null && c.user.id === user.id && (
                                            <>
                                                <Form.Control
                                                    as="textarea"
                                                    value={change}
                                                    onChange={(e) => setChange(e.target.value)}
                                                    placeholder="Nội dung chỉnh sửa"
                                                />
                                                <Button onClick={() => patchComment(c.id)}>
                                                    Chỉnh sửa
                                                </Button>
                                                <Button
                                                    variant="danger"
                                                    onClick={() => confirmDeleteComment(c.id)}
                                                >
                                                    Xóa
                                                </Button>
                                            </>
                                        )}
                                    </Card.Body>
                                </Card>
                            ))
                        )}
                    </div>
                </>
            )}
        </Container>
    );
};

export default TourDetails;
