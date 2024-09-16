import React, { useContext, useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Alert, Spinner } from 'react-bootstrap';
import APIs, { authApi, endpoints } from '../configs/APIs';
import store from '../store';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import moment from 'moment';

const TourDetail = () => {
    const [tour, setTour] = useState();
    const [loading, setLoading] = useState(false);
    //   const user = useContext(MyUserContext);
    const [quantity, setQuantity] = useState(0);
    //   const cartDispatch = useContext(CartDispatchContext);
    const [type, setType] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const { tourId, token } = store((state) => state.data);

    const loadTour = async () => {
        let res = await APIs.get(endpoints['tour-details'](tourId));
        setTour(res.data);
    };

    useEffect(() => {
        loadTour();
        console.log({ tour });
    }, []);

    const addBooking = async () => {
        if (parseInt(quantity) > tour?.remain_ticket) {
            toast.error('Số lượng vé đặt vượt quá số lượng vé còn lại. ', {
                position: 'top-right',
                autoClose: 3000,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
            setSuccess('');
        } else {
            setLoading(true);
            try {
                // let token = await AsyncStorage.getItem('access-token'); // Replace with actual token management
                let res = await authApi(token).post(endpoints['addBooking'](tour?.id), {
                    quantity: quantity,
                    price_id: type,
                });

                if (res.data.status === 406) {
                    setError(res.data.content);
                    setSuccess('');
                } else {
                    //   cartDispatch({
                    //     'type': "add",
                    //   });
                    toast.success('Đặt vé thành công', {
                        position: 'top-right',
                        autoClose: 3000,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                        theme: 'light',
                    });
                    setError('');
                }
            } catch (ex) {
                console.error(ex);
                toast.error('Đã xảy ra lỗi.', {
                    position: 'top-right',
                    autoClose: 3000,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                });
                setSuccess('');
            }
            setLoading(false);
        }
    };

    return (
        <Container className="my-5">
            <Row>
                <Col>
                    <h2>{tour?.name}</h2>
                    <p>
                        <strong>Ngày bắt đầu:</strong>{' '}
                        {moment(tour?.start_date).format('DD-MM-YYYY')}
                    </p>
                    <p>
                        <strong>Ngày kết thúc:</strong>{' '}
                        {moment(tour?.end_date).format('DD-MM-YYYY')}
                    </p>
                    <h4>Giá vé:</h4>
                    <ul>
                        {tour?.prices?.map((p, index) => (
                            <li key={index}>
                                {p.type}: {p.price.toLocaleString()} đồng
                            </li>
                        ))}
                    </ul>
                    <p>
                        <strong>Số vé còn lại:</strong> {tour?.remain_ticket}
                    </p>

                    <Form.Group className="mb-3">
                        <Form.Label>Chọn loại vé</Form.Label>
                        <Form.Control
                            as="select"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                        >
                            <option value="">Chọn loại vé</option>
                            {tour?.prices?.map((p) => (
                                <option key={p.id} value={p.id}>
                                    {p.type}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Nhập số vé</Form.Label>
                        <Form.Control
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            placeholder="Nhập số vé"
                        />
                    </Form.Group>

                    <Button variant="primary" onClick={addBooking} disabled={loading}>
                        Đặt vé
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default TourDetail;
