import React, { useContext, useEffect, useState, useCallback } from "react";
import { Container, Row, Col, Button, Alert, Spinner } from "react-bootstrap";
import APIs, { authApi, endpoints } from '../configs/APIs';
import { toast } from 'react-toastify';
import store from '../store';
const Cart = () => {
    // const user = useContext(MyUserContext);
    const [booking, setBooking] = useState(null);
    const [total, setTotal] = useState(0);
    // const cartDispatch = useContext(CartDispatchContext);
    // const cart = useContext(CartContext);
    const [loading, setLoading] = useState(true);
    const {token, cart, user} = store((state) => state.data);
    const setCart = store((state) => state.setCart);

    const loadBooking = async () => {
        try {
            // let token = localStorage.getItem('access-token');
            let res = await authApi(token).get(endpoints['booking']);
            setBooking(res.data.results);
            let s = res.data.results.reduce((acc, item) => acc + parseInt(item.total), 0);
            setTotal(s);
            setCart(res.data.results.length)
            console.log({cart})
            // cartDispatch({
            //     'type': "cart",
            //     'payload': res.data.results.length
            // });
        } catch (ex) {
            console.error(ex);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadBooking();
    }, [cart]);

    const deleteBooking = async (id) => {
        try {
            // let token = localStorage.getItem('access-token');
            await authApi(token).delete(endpoints['deleteBooking'](id));
            // cartDispatch({
            //     'type': "delete"
            // });
            loadBooking();
        } catch (ex) {
            console.error(ex);
        }
    };

    const pay = async () => {
        try {
            await APIs.post(endpoints["pay"], {
                "user_id": user.id,
                "total": total
            });
            // cartDispatch({
            //     'type': "pay",
            // });
        } catch (ex) {
            console.error(ex);
        }
    };

    const confirmDelete = (id) => {
        if (window.confirm('Bạn chắc chắn muốn xóa?')) {
            deleteBooking(id);
        }
    };

    const confirmPay = () => {
        if (window.confirm('Bạn có chắc chắn muốn thanh toán?')) {
            pay();
        }
    };

    return (
        <Container>
            <Row className="my-4">
                <Col>
                    {loading ? (
                        <Spinner animation="border" />
                    ) : booking === null || booking.length === 0 ? (
                        <Alert variant="info">Bạn chưa đặt tour nào</Alert>
                    ) : (
                        <>
                            {booking.map(b => (
                                <Row key={b.id} className="border p-3 my-2">
                                    <Col md={6}>
                                        <h5>{b.tour_name}</h5>
                                        <p>Số lượng: {b.quantity}</p>
                                        <p>Loại vé: {b.type}</p>
                                    </Col>
                                    <Col md={3}>
                                        <p>Tổng tiền: {b.total}</p>
                                    </Col>
                                    <Col md={3} className="d-flex justify-content-end align-items-start">
                                        <Button variant="danger" onClick={() => confirmDelete(b.id)}>
                                            Hủy vé
                                        </Button>
                                    </Col>
                                </Row>
                            ))}
                            <Row className="mt-3">
                                <Col md={6}>
                                    <h4>Tổng cộng: {total}</h4>
                                </Col>
                                <Col md={6} className="d-flex justify-content-end">
                                    <Button variant="success" onClick={confirmPay}>
                                        Thanh toán
                                    </Button>
                                </Col>
                            </Row>
                        </>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default Cart;
